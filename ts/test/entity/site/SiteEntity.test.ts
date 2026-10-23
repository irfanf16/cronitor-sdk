

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


describe('SiteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.Site()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('site hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).Site().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).Site()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Site().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().Site().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Site().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Site().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Site().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'site.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"client_key":{"a":true,"h":"Client Key","n":"client_key","r":true,"ro":true,"t":"`$STRING`","key$":"client_key","index$":0},"country_code_denylist":{"a":true,"h":"Country Code Denylist","n":"country_code_denylist","r":false,"t":"`$STRING`","key$":"country_code_denylist","index$":1},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":2},"errors_enabled":{"a":true,"h":"Errors Enabled","n":"errors_enabled","r":false,"t":"`$BOOLEAN`","key$":"errors_enabled","index$":3},"exclude_internal_referrers":{"a":true,"h":"Exclude Internal Referrers","n":"exclude_internal_referrers","r":false,"t":"`$BOOLEAN`","key$":"exclude_internal_referrers","index$":4},"filter_bots":{"a":true,"h":"Filter Bots","n":"filter_bots","r":false,"t":"`$BOOLEAN`","key$":"filter_bots","index$":5},"filter_browser_extensions":{"a":true,"h":"Filter Browser Extensions","n":"filter_browser_extensions","r":false,"t":"`$BOOLEAN`","key$":"filter_browser_extensions","index$":6},"filter_localhost":{"a":true,"h":"Filter Localhost","n":"filter_localhost","r":false,"t":"`$BOOLEAN`","key$":"filter_localhost","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":8},"ingestion_enabled":{"a":true,"h":"Ingestion Enabled","n":"ingestion_enabled","r":true,"ro":true,"t":"`$BOOLEAN`","key$":"ingestion_enabled","index$":9},"ip_denylist":{"a":true,"h":"Ip Denylist","n":"ip_denylist","r":false,"t":"`$STRING`","key$":"ip_denylist","index$":10},"key":{"a":true,"h":"Key","n":"key","r":true,"ro":true,"t":"`$STRING`","key$":"key","index$":11},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":12},"origin_allowlist":{"a":true,"h":"Origin Allowlist","n":"origin_allowlist","r":false,"t":"`$STRING`","key$":"origin_allowlist","index$":13},"path_denylist":{"a":true,"h":"Path Denylist","n":"path_denylist","r":false,"t":"`$STRING`","key$":"path_denylist","index$":14},"public_report_enabled":{"a":true,"h":"Public Report Enabled","n":"public_report_enabled","r":false,"t":"`$BOOLEAN`","key$":"public_report_enabled","index$":15},"public_report_key":{"a":true,"h":"Public Report Key","n":"public_report_key","r":true,"ro":true,"t":"`$STRING`","key$":"public_report_key","index$":16},"sampling":{"a":true,"h":"Sampling","n":"sampling","r":false,"t":"`$INTEGER`","key$":"sampling","index$":17},"snippet":{"a":true,"h":"Snippet","n":"snippet","r":true,"ro":true,"t":"`$STRING`","key$":"snippet","index$":18},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":true,"ro":true,"t":"`$STRING`","key$":"updated","index$":19},"webvitals_enabled":{"a":true,"h":"Webvitals Enabled","n":"webvitals_enabled","r":false,"t":"`$BOOLEAN`","key$":"webvitals_enabled","index$":20}},"id":{"field":"id","name":"id"},"name":"site","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["country_code_denylist","errors_enabled","exclude_internal_referrers","filter_bots","filter_browser_extensions","filter_localhost","ip_denylist","name","origin_allowlist","path_denylist","public_report_enabled","sampling","webvitals_enabled"],"co":{"id":"POST /api/sites","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/sites","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"sites"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /api/sites/query","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/sites/query","q":{"$action":"query"},"r":{},"s":[{"lit":"api"},{"lit":"sites"},{"lit":"query"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/sites","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/sites","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"sites"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/sites/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/sites/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"sites"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/sites/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/sites/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"api"},{"lit":"sites"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["country_code_denylist","errors_enabled","exclude_internal_referrers","filter_bots","filter_browser_extensions","filter_localhost","ip_denylist","name","origin_allowlist","path_denylist","public_report_enabled","sampling","webvitals_enabled"],"co":{"id":"PUT /api/sites/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/sites/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"sites"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"site","name__orig":"site","Name":"Site","name_":"site","name-":"site","NAME":"SITE","index$":12}, {"active":true,"entity":"site","key$":"BasicSiteFlow","kind":"basic","name":"BasicSiteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"site_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"site_ref01"}}]},{"a":true,"d":{},"i":{"ref":"site_ref01","srcdatavar":"site_ref01_data","suffix":"_up0","textfield":"country_code_denylist"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-site_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"site_ref01","srcdatavar":"site_ref01_data","suffix":"_dt0"},"m":{"id":"site01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-site_ref01"}}]},{"a":true,"d":{},"i":{"ref":"site_ref01","suffix":"_rm0"},"m":{"id":"site01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"site_ref01"}}]}]}, 'Site', {"POST /api/sites":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"},"public_report_enabled":{"type":"boolean","key$":"public_report_enabled"},"webvitals_enabled":{"type":"boolean","key$":"webvitals_enabled"},"errors_enabled":{"type":"boolean","key$":"errors_enabled"},"filter_localhost":{"type":"boolean","key$":"filter_localhost"},"filter_bots":{"type":"boolean","key$":"filter_bots"},"filter_browser_extensions":{"type":"boolean","key$":"filter_browser_extensions"},"exclude_internal_referrers":{"type":"boolean","key$":"exclude_internal_referrers"},"origin_allowlist":{"type":"string","nullable":true,"key$":"origin_allowlist"},"ip_denylist":{"type":"string","nullable":true,"key$":"ip_denylist"},"country_code_denylist":{"type":"string","nullable":true,"key$":"country_code_denylist"},"path_denylist":{"type":"string","nullable":true,"key$":"path_denylist"},"sampling":{"type":"integer","maximum":100,"minimum":0,"key$":"sampling"}},"required":["name"],"x-ref":"#/components/schemas/SiteRequest","index$":1}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"POST /api/sites/query":{"protocol":"http","parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/sites":{"protocol":"http","parameters":[{"name":"page","required":false,"in":"query","description":"A page number within the paginated result set.","schema":{"type":"integer"},"index$":0},{"name":"pageSize","required":false,"in":"query","description":"Number of results to return per page.","schema":{"type":"integer"},"index$":1},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":2}]},"GET /api/sites/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"DELETE /api/sites/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PUT /api/sites/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"},"public_report_enabled":{"type":"boolean","key$":"public_report_enabled"},"webvitals_enabled":{"type":"boolean","key$":"webvitals_enabled"},"errors_enabled":{"type":"boolean","key$":"errors_enabled"},"filter_localhost":{"type":"boolean","key$":"filter_localhost"},"filter_bots":{"type":"boolean","key$":"filter_bots"},"filter_browser_extensions":{"type":"boolean","key$":"filter_browser_extensions"},"exclude_internal_referrers":{"type":"boolean","key$":"exclude_internal_referrers"},"origin_allowlist":{"type":"string","nullable":true,"key$":"origin_allowlist"},"ip_denylist":{"type":"string","nullable":true,"key$":"ip_denylist"},"country_code_denylist":{"type":"string","nullable":true,"key$":"country_code_denylist"},"path_denylist":{"type":"string","nullable":true,"key$":"path_denylist"},"sampling":{"type":"integer","maximum":100,"minimum":0,"key$":"sampling"}},"required":["name"],"x-ref":"#/components/schemas/SiteRequest","index$":1}}},"required":true},"parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const site_ref01_ent = client.Site()
    let site_ref01_data = setup.data.new.site['site_ref01']

    site_ref01_data = (await site_ref01_ent.create(site_ref01_data)).data()
    assert(null != site_ref01_data.id)


    // LIST
    const site_ref01_match: any = {}

    const site_ref01_list = (await site_ref01_ent.list(site_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(site_ref01_list, { id: site_ref01_data.id })))


    // UPDATE
    const site_ref01_data_up0: any = {}
    site_ref01_data_up0.id = site_ref01_data.id

    const site_ref01_markdef_up0 = { name: 'country_code_denylist', value: 'Mark01-site_ref01_' + setup.now }
    ;(site_ref01_data_up0 as any)[site_ref01_markdef_up0.name] = site_ref01_markdef_up0.value

    const site_ref01_resdata_up0 = (await site_ref01_ent.update(site_ref01_data_up0)).data()
    assert(site_ref01_resdata_up0.id === site_ref01_data_up0.id)

    assert((site_ref01_resdata_up0 as any)[site_ref01_markdef_up0.name] === site_ref01_markdef_up0.value)


    // LOAD
    const site_ref01_match_dt0: any = {}
    site_ref01_match_dt0.id = site_ref01_data.id
    const site_ref01_data_dt0 = (await site_ref01_ent.load(site_ref01_match_dt0)).data()
    assert(site_ref01_data_dt0.id === site_ref01_data.id)


    // REMOVE
    const site_ref01_match_rm0: any = { id: site_ref01_data.id }
    await site_ref01_ent.remove(site_ref01_match_rm0)
  

    // LIST
    const site_ref01_match_rt0: any = {}

    const site_ref01_list_rt0 = (await site_ref01_ent.list(site_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(site_ref01_list_rt0, { id: site_ref01_data.id })))


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
      '../../../../.sdk/test/entity/site/SiteTestData.json')

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
    ['site01','site02','site03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_SITE_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_SITE_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_SITE_ENTID']
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
  
