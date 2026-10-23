

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


describe('ApiKeyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.ApiKey()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('api_key hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).ApiKey().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).ApiKey()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.ApiKey().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().ApiKey().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.ApiKey().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.ApiKey().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ApiKey().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_key.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"immutable":{"a":true,"h":"Immutable","n":"immutable","r":true,"ro":true,"t":"`$STRING`","key$":"immutable","index$":2},"key":{"a":true,"h":"Key","n":"key","r":true,"ro":true,"t":"`$STRING`","key$":"key","index$":3},"kind":{"a":true,"h":"Kind","n":"kind","r":false,"sh":"* `telemetry` - Telemetry * `sdk` - SDK Integration * `custom` - Custom","t":"`$STRING`","key$":"kind","index$":4},"last_used":{"a":true,"h":"Last Used","n":"last_used","r":true,"ro":true,"t":"`$STRING`","key$":"last_used","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":6},"scopes":{"a":true,"h":"Scopes","n":"scopes","r":false,"t":"`$ANY`","key$":"scopes","index$":7},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":true,"ro":true,"t":"`$STRING`","key$":"updated","index$":8}},"id":{"field":"id","name":"id"},"name":"api_key","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["kind","name","scopes"],"co":{"id":"POST /api/keys","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/keys","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"keys"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/keys","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/keys","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"keys"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/keys/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/keys/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"keys"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/keys/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/keys/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"api"},{"lit":"keys"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["kind","name","scopes"],"co":{"id":"PUT /api/keys/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/keys/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"keys"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"api_key","name__orig":"api_key","Name":"ApiKey","name_":"api_key","name-":"api-key","NAME":"API_KEY","index$":1}, {"active":true,"entity":"api_key","key$":"BasicApiKeyFlow","kind":"basic","name":"BasicApiKeyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_key_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_key_ref01"}}]},{"a":true,"d":{},"i":{"ref":"api_key_ref01","srcdatavar":"api_key_ref01_data","suffix":"_up0","textfield":"kind"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_key_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"api_key_ref01","srcdatavar":"api_key_ref01_data","suffix":"_dt0"},"m":{"id":"api_key01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-api_key_ref01"}}]},{"a":true,"d":{},"i":{"ref":"api_key_ref01","suffix":"_rm0"},"m":{"id":"api_key01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"api_key_ref01"}}]}]}, 'ApiKey', {"POST /api/keys":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":255,"key$":"name"},"kind":{"enum":["telemetry","sdk","custom"],"type":"string","description":"* `telemetry` - Telemetry\n* `sdk` - SDK Integration\n* `custom` - Custom","x-ref":"#/components/schemas/KindEnum","key$":"kind"},"scopes":{"nullable":true,"key$":"scopes"}},"required":["name"],"x-ref":"#/components/schemas/ApiKeyRequest","index$":1}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/keys":{"protocol":"http","parameters":[{"name":"page","required":false,"in":"query","description":"A page number within the paginated result set.","schema":{"type":"integer"},"index$":0},{"name":"pageSize","required":false,"in":"query","description":"Number of results to return per page.","schema":{"type":"integer"},"index$":1},{"name":"search","required":false,"in":"query","description":"A search term.","schema":{"type":"string"},"index$":2},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":3}]},"GET /api/keys/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"DELETE /api/keys/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PUT /api/keys/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":255,"key$":"name"},"kind":{"enum":["telemetry","sdk","custom"],"type":"string","description":"* `telemetry` - Telemetry\n* `sdk` - SDK Integration\n* `custom` - Custom","x-ref":"#/components/schemas/KindEnum","key$":"kind"},"scopes":{"nullable":true,"key$":"scopes"}},"required":["name"],"x-ref":"#/components/schemas/ApiKeyRequest","index$":1}}},"required":true},"parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_key_ref01_ent = client.ApiKey()
    let api_key_ref01_data = setup.data.new.api_key['api_key_ref01']

    api_key_ref01_data = (await api_key_ref01_ent.create(api_key_ref01_data)).data()
    assert(null != api_key_ref01_data.id)


    // LIST
    const api_key_ref01_match: any = {}

    const api_key_ref01_list = (await api_key_ref01_ent.list(api_key_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(api_key_ref01_list, { id: api_key_ref01_data.id })))


    // UPDATE
    const api_key_ref01_data_up0: any = {}
    api_key_ref01_data_up0.id = api_key_ref01_data.id

    const api_key_ref01_markdef_up0 = { name: 'kind', value: 'Mark01-api_key_ref01_' + setup.now }
    ;(api_key_ref01_data_up0 as any)[api_key_ref01_markdef_up0.name] = api_key_ref01_markdef_up0.value

    const api_key_ref01_resdata_up0 = (await api_key_ref01_ent.update(api_key_ref01_data_up0)).data()
    assert(api_key_ref01_resdata_up0.id === api_key_ref01_data_up0.id)

    assert((api_key_ref01_resdata_up0 as any)[api_key_ref01_markdef_up0.name] === api_key_ref01_markdef_up0.value)


    // LOAD
    const api_key_ref01_match_dt0: any = {}
    api_key_ref01_match_dt0.id = api_key_ref01_data.id
    const api_key_ref01_data_dt0 = (await api_key_ref01_ent.load(api_key_ref01_match_dt0)).data()
    assert(api_key_ref01_data_dt0.id === api_key_ref01_data.id)


    // REMOVE
    const api_key_ref01_match_rm0: any = { id: api_key_ref01_data.id }
    await api_key_ref01_ent.remove(api_key_ref01_match_rm0)
  

    // LIST
    const api_key_ref01_match_rt0: any = {}

    const api_key_ref01_list_rt0 = (await api_key_ref01_ent.list(api_key_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(api_key_ref01_list_rt0, { id: api_key_ref01_data.id })))


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
      '../../../../.sdk/test/entity/api_key/ApiKeyTestData.json')

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
    ['api_key01','api_key02','api_key03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_API_KEY_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_API_KEY_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_API_KEY_ENTID']
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
  
