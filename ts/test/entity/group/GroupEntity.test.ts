

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CronitorSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.Group()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Group().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"group","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/groups","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/groups","q":{},"r":{},"s":[{"lit":"api"},{"lit":"groups"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/groups/{key}/pause/{hours}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"group_id","or":"key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"hour","or":"hours","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/groups/{key}/pause/{hours}","q":{"exist":["group_id","hour"]},"r":{"param":{"hours":"hour","key":"group_id"}},"s":[{"lit":"api"},{"lit":"groups"},{"var":"group_id"},{"lit":"pause"},{"var":"hour"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/groups/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/groups/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"api"},{"lit":"groups"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/groups/{key}/pause","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/groups/{key}/pause","q":{"$action":"pause","exist":["key"]},"r":{},"s":[{"lit":"api"},{"lit":"groups"},{"var":"key"},{"lit":"pause"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /api/groups","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/groups","q":{},"r":{},"s":[{"lit":"api"},{"lit":"groups"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/groups/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/groups/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"api"},{"lit":"groups"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/groups/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/groups/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"api"},{"lit":"groups"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"group","name__orig":"group","Name":"Group","name_":"group","name-":"group","NAME":"GROUP","index$":3}, {"active":true,"entity":"group","key$":"BasicGroupFlow","kind":"basic","name":"BasicGroupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"group_ref01"},"m":{"group_id":"group01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"group_ref01","srcdatavar":"group_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-group_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"group_ref01","srcdatavar":"group_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-group_ref01"}}]},{"a":true,"d":{},"i":{"ref":"group_ref01","suffix":"_rm0"},"m":{"id":"group01"},"o":"remove","s":[],"v":[]}]}, 'Group', {"POST /api/groups":{"protocol":"http","parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/groups/{key}/pause/{hours}":{"protocol":"http","parameters":[{"in":"path","name":"hours","schema":{"type":"string","pattern":"^\\d+$"},"required":true,"index$":0},{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9-_.]{2,50}$"},"required":true,"index$":1},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":2}]},"GET /api/groups/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9-_.]{2,50}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"GET /api/groups/{key}/pause":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9-_.]{2,50}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"GET /api/groups":{"protocol":"http","parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"DELETE /api/groups/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9-_.]{2,50}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PUT /api/groups/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9-_.]{2,50}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const group_ref01_ent = client.Group()
    let group_ref01_data = setup.data.new.group['group_ref01']
    group_ref01_data['group_id'] = setup.idmap['group01']

    group_ref01_data = (await group_ref01_ent.create(group_ref01_data)).data()
    assert(null != group_ref01_data.id)


    // UPDATE
    const group_ref01_data_up0: any = {}
    group_ref01_data_up0.id = group_ref01_data.id

    const group_ref01_resdata_up0 = (await group_ref01_ent.update(group_ref01_data_up0)).data()
    assert(group_ref01_resdata_up0.id === group_ref01_data_up0.id)


    // LOAD
    const group_ref01_match_dt0: any = {}
    group_ref01_match_dt0.id = group_ref01_data.id
    const group_ref01_data_dt0 = (await group_ref01_ent.load(group_ref01_match_dt0)).data()
    assert(group_ref01_data_dt0.id === group_ref01_data.id)


    // REMOVE
    const group_ref01_match_rm0: any = { id: group_ref01_data.id }
    await group_ref01_ent.remove(group_ref01_match_rm0)
  

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/group/GroupTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CronitorSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['group01','group02','group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_GROUP_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_GROUP_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_GROUP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CronitorSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.CRONITOR_APIKEY,
        secret: env.CRONITOR_SECRET,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CRONITOR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
