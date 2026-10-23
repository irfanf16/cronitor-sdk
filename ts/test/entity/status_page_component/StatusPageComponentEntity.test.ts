

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


describe('StatusPageComponentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.StatusPageComponent()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('status_page_component hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).StatusPageComponent().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).StatusPageComponent()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.StatusPageComponent().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().StatusPageComponent().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.StatusPageComponent().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.StatusPageComponent().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.StatusPageComponent().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'status_page_component.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"autopublish":{"a":true,"h":"Autopublish","n":"autopublish","r":false,"t":"`$BOOLEAN`","key$":"autopublish","index$":0},"children":{"a":true,"h":"Children","n":"children","r":true,"ro":true,"t":"`$STRING`","key$":"children","index$":1},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":3},"group":{"a":true,"h":"Group","n":"group","r":false,"t":"`$STRING`","key$":"group","index$":4},"key":{"a":true,"h":"Key","n":"key","r":true,"ro":true,"t":"`$STRING`","key$":"key","index$":5},"monitor":{"a":true,"h":"Monitor","n":"monitor","r":false,"t":"`$STRING`","key$":"monitor","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":7},"position":{"a":true,"h":"Position","n":"position","r":false,"t":"`$STRING`","key$":"position","index$":8},"status":{"a":true,"h":"Status","n":"status","r":true,"ro":true,"t":"`$STRING`","key$":"status","index$":9},"statuspage":{"a":true,"h":"Statuspage","n":"statuspage","r":false,"t":"`$STRING`","key$":"statuspage","index$":10},"type":{"a":true,"h":"Type","n":"type","r":true,"ro":true,"t":"`$STRING`","key$":"type","index$":11},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":true,"ro":true,"t":"`$STRING`","key$":"updated","index$":12},"uptime_history":{"a":true,"h":"Uptime History","n":"uptime_history","r":true,"ro":true,"t":"`$STRING`","key$":"uptime_history","index$":13}},"name":"status_page_component","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["autopublish","description","group","monitor","name","position","statuspage"],"co":{"id":"POST /api/statuspage_components","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/statuspage_components","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspage_components"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/statuspage_components","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"statuspage","or":"statuspage","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/statuspage_components","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspage_components"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/statuspage_components/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/statuspage_components/{key}","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspage_components"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/statuspage_components/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/statuspage_components/{key}","q":{"exist":["key"]},"r":{},"s":[{"lit":"api"},{"lit":"statuspage_components"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["autopublish","description","group","monitor","name","position","statuspage"],"co":{"id":"PUT /api/statuspage_components/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/statuspage_components/{key}","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspage_components"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"status_page_component","name__orig":"status_page_component","Name":"StatusPageComponent","name_":"status_page_component","name-":"status-page-component","NAME":"STATUS_PAGE_COMPONENT","index$":14}, {"active":true,"entity":"status_page_component","key$":"BasicStatusPageComponentFlow","kind":"basic","name":"BasicStatusPageComponentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"status_page_component_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"status_page_component_ref01"}}]},{"a":true,"d":{},"i":{"ref":"status_page_component_ref01","srcdatavar":"status_page_component_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-status_page_component_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"status_page_component_ref01","srcdatavar":"status_page_component_ref01_data","suffix":"_dt0"},"m":{"id":"status_page_component01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-status_page_component_ref01"}}]},{"a":true,"d":{},"i":{"ref":"status_page_component_ref01","suffix":"_rm0"},"m":{"id":"status_page_component01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"status_page_component_ref01"}}]}]}, 'StatusPageComponent', {"POST /api/statuspage_components":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"position":{"type":"string","minLength":1,"maxLength":64,"key$":"position"},"name":{"type":"string","maxLength":128,"key$":"name"},"description":{"type":"string","nullable":true,"maxLength":2048,"key$":"description"},"monitor":{"type":"string","key$":"monitor"},"group":{"type":"string","key$":"group"},"statuspage":{"type":"string","key$":"statuspage"},"autopublish":{"type":"boolean","key$":"autopublish"}},"x-ref":"#/components/schemas/StatusPageComponentRequest","index$":1}}}},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/statuspage_components":{"protocol":"http","parameters":[{"name":"page","required":false,"in":"query","description":"A page number within the paginated result set.","schema":{"type":"integer"},"index$":0},{"name":"pageSize","required":false,"in":"query","description":"Number of results to return per page.","schema":{"type":"integer"},"index$":1},{"in":"query","name":"statuspage","schema":{"type":"string"},"index$":2},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":3}]},"GET /api/statuspage_components/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"DELETE /api/statuspage_components/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PUT /api/statuspage_components/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"position":{"type":"string","minLength":1,"maxLength":64,"key$":"position"},"name":{"type":"string","maxLength":128,"key$":"name"},"description":{"type":"string","nullable":true,"maxLength":2048,"key$":"description"},"monitor":{"type":"string","key$":"monitor"},"group":{"type":"string","key$":"group"},"statuspage":{"type":"string","key$":"statuspage"},"autopublish":{"type":"boolean","key$":"autopublish"}},"x-ref":"#/components/schemas/StatusPageComponentRequest","index$":1}}}},"parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const status_page_component_ref01_ent = client.StatusPageComponent()
    let status_page_component_ref01_data = setup.data.new.status_page_component['status_page_component_ref01']

    status_page_component_ref01_data = (await status_page_component_ref01_ent.create(status_page_component_ref01_data)).data()
    assert(null != status_page_component_ref01_data)


    // LIST
    const status_page_component_ref01_match: any = {}

    const status_page_component_ref01_list = (await status_page_component_ref01_ent.list(status_page_component_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const status_page_component_ref01_data_up0: any = {}

    const status_page_component_ref01_markdef_up0 = { name: 'description', value: 'Mark01-status_page_component_ref01_' + setup.now }
    ;(status_page_component_ref01_data_up0 as any)[status_page_component_ref01_markdef_up0.name] = status_page_component_ref01_markdef_up0.value

    const status_page_component_ref01_resdata_up0 = (await status_page_component_ref01_ent.update(status_page_component_ref01_data_up0)).data()
    assert(null != status_page_component_ref01_resdata_up0)

    assert((status_page_component_ref01_resdata_up0 as any)[status_page_component_ref01_markdef_up0.name] === status_page_component_ref01_markdef_up0.value)




    // LIST
    const status_page_component_ref01_match_rt0: any = {}

    const status_page_component_ref01_list_rt0 = (await status_page_component_ref01_ent.list(status_page_component_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/status_page_component/StatusPageComponentTestData.json')

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
    ['status_page_component01','status_page_component02','status_page_component03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_STATUS_PAGE_COMPONENT_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_STATUS_PAGE_COMPONENT_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_STATUS_PAGE_COMPONENT_ENTID']
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
  
