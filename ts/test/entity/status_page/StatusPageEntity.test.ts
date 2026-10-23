

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


describe('StatusPageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.StatusPage()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('status_page hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).StatusPage().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).StatusPage()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.StatusPage().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().StatusPage().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.StatusPage().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.StatusPage().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.StatusPage().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'status_page.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access":{"a":true,"h":"Access","n":"access","r":false,"sh":"* `public` - public * `password` - password","t":"`$STRING`","key$":"access","index$":0},"allow_search_index":{"a":true,"h":"Allow Search Index","n":"allow_search_index","r":false,"t":"`$BOOLEAN`","key$":"allow_search_index","index$":1},"auth_secret":{"a":true,"h":"Auth Secret","n":"auth_secret","r":true,"ro":true,"t":"`$STRING`","key$":"auth_secret","index$":2},"badge_url_dark":{"a":true,"h":"Badge Url Dark","n":"badge_url_dark","r":true,"ro":true,"t":"`$STRING`","key$":"badge_url_dark","index$":3},"badge_url_light":{"a":true,"h":"Badge Url Light","n":"badge_url_light","r":true,"ro":true,"t":"`$STRING`","key$":"badge_url_light","index$":4},"components":{"a":true,"h":"Components","n":"components","r":true,"ro":true,"t":"`$STRING`","key$":"components","index$":5},"components_count":{"a":true,"h":"Components Count","n":"components_count","r":true,"ro":true,"t":"`$STRING`","key$":"components_count","index$":6},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":7},"custom_domain":{"a":true,"h":"Custom Domain","n":"custom_domain","r":false,"t":"`$STRING`","key$":"custom_domain","index$":8},"default_time_period":{"a":true,"h":"Default Time Period","n":"default_time_period","r":false,"sh":"* `24h` - 24h * `7d` - 7d * `30d` - 30d * `90d` - 90d","t":"`$STRING`","key$":"default_time_period","index$":9},"enable_dark_mode":{"a":true,"h":"Enable Dark Mode","n":"enable_dark_mode","r":false,"t":"`$BOOLEAN`","key$":"enable_dark_mode","index$":10},"enable_performance_metrics":{"a":true,"h":"Enable Performance Metrics","n":"enable_performance_metrics","r":false,"t":"`$BOOLEAN`","key$":"enable_performance_metrics","index$":11},"environment":{"a":true,"h":"Environment","n":"environment","r":false,"sh":"Environment key.","t":"`$STRING`","key$":"environment","index$":12},"hosted_subdomain":{"a":true,"h":"Hosted Subdomain","n":"hosted_subdomain","r":true,"t":"`$STRING`","key$":"hosted_subdomain","index$":13},"ip_allowlist":{"a":true,"h":"Ip Allowlist","n":"ip_allowlist","r":false,"t":"`$STRING`","key$":"ip_allowlist","index$":14},"key":{"a":true,"h":"Key","n":"key","r":true,"ro":true,"t":"`$STRING`","key$":"key","index$":15},"logo_url":{"a":true,"fo":"uri","h":"Logo Url","n":"logo_url","r":false,"t":"`$STRING`","key$":"logo_url","index$":16},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":true,"ro":true,"t":"`$STRING`","key$":"metadata","index$":17},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":18},"password":{"a":true,"h":"Password","n":"password","r":false,"t":"`$STRING`","wo":true,"key$":"password","index$":19},"status":{"a":true,"h":"Status","n":"status","r":true,"ro":true,"t":"`$STRING`","key$":"status","index$":20},"support_url":{"a":true,"fo":"uri","h":"Support Url","n":"support_url","r":false,"t":"`$STRING`","key$":"support_url","index$":21},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":true,"ro":true,"t":"`$STRING`","key$":"updated","index$":22},"website_url":{"a":true,"fo":"uri","h":"Website Url","n":"website_url","r":false,"t":"`$STRING`","key$":"website_url","index$":23}},"name":"status_page","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["access","allow_search_index","custom_domain","default_time_period","enable_dark_mode","enable_performance_metrics","environment","hosted_subdomain","ip_allowlist","logo_url","name","password","support_url","website_url"],"co":{"id":"POST /api/statuspages","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/statuspages","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/statuspages","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/statuspages","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspages"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/statuspages/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/statuspages/{key}","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspages"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/statuspages/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/statuspages/{key}","q":{"exist":["key"]},"r":{},"s":[{"lit":"api"},{"lit":"statuspages"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["access","allow_search_index","custom_domain","default_time_period","enable_dark_mode","enable_performance_metrics","environment","hosted_subdomain","ip_allowlist","logo_url","name","password","support_url","website_url"],"co":{"id":"PUT /api/statuspages/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/statuspages/{key}","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"statuspages"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"status_page","name__orig":"status_page","Name":"StatusPage","name_":"status_page","name-":"status-page","NAME":"STATUS_PAGE","index$":13}, {"active":true,"entity":"status_page","key$":"BasicStatusPageFlow","kind":"basic","name":"BasicStatusPageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"status_page_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"status_page_ref01"}}]},{"a":true,"d":{},"i":{"ref":"status_page_ref01","srcdatavar":"status_page_ref01_data","suffix":"_up0","textfield":"access"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-status_page_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"status_page_ref01","srcdatavar":"status_page_ref01_data","suffix":"_dt0"},"m":{"id":"status_page01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-status_page_ref01"}}]},{"a":true,"d":{},"i":{"ref":"status_page_ref01","suffix":"_rm0"},"m":{"id":"status_page01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"status_page_ref01"}}]}]}, 'StatusPage', {"POST /api/statuspages":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"},"logo_url":{"type":"string","format":"uri","nullable":true,"minLength":1,"key$":"logo_url"},"website_url":{"type":"string","format":"uri","nullable":true,"minLength":1,"maxLength":2000,"key$":"website_url"},"support_url":{"type":"string","format":"uri","nullable":true,"minLength":1,"maxLength":2000,"key$":"support_url"},"allow_search_index":{"type":"boolean","key$":"allow_search_index"},"enable_performance_metrics":{"type":"boolean","key$":"enable_performance_metrics"},"default_time_period":{"enum":["24h","7d","30d","90d"],"type":"string","description":"* `24h` - 24h\n* `7d` - 7d\n* `30d` - 30d\n* `90d` - 90d","x-ref":"#/components/schemas/DefaultTimePeriodEnum","key$":"default_time_period"},"enable_dark_mode":{"type":"boolean","key$":"enable_dark_mode"},"hosted_subdomain":{"type":"string","minLength":1,"maxLength":63,"key$":"hosted_subdomain"},"custom_domain":{"type":"string","nullable":true,"minLength":1,"maxLength":255,"key$":"custom_domain"},"access":{"enum":["public","password"],"type":"string","description":"* `public` - public\n* `password` - password","x-ref":"#/components/schemas/AccessEnum","key$":"access"},"password":{"type":"string","writeOnly":true,"nullable":true,"key$":"password"},"ip_allowlist":{"type":"string","nullable":true,"key$":"ip_allowlist"},"environment":{"type":"string","description":"Environment key.","nullable":true,"key$":"environment"}},"required":["hosted_subdomain","name"],"x-ref":"#/components/schemas/StatusPageRequest","index$":1}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/statuspages":{"protocol":"http","parameters":[{"name":"page","required":false,"in":"query","description":"A page number within the paginated result set.","schema":{"type":"integer"},"index$":0},{"name":"pageSize","required":false,"in":"query","description":"Number of results to return per page.","schema":{"type":"integer"},"index$":1},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":2}]},"GET /api/statuspages/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"DELETE /api/statuspages/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PUT /api/statuspages/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"},"logo_url":{"type":"string","format":"uri","nullable":true,"minLength":1,"key$":"logo_url"},"website_url":{"type":"string","format":"uri","nullable":true,"minLength":1,"maxLength":2000,"key$":"website_url"},"support_url":{"type":"string","format":"uri","nullable":true,"minLength":1,"maxLength":2000,"key$":"support_url"},"allow_search_index":{"type":"boolean","key$":"allow_search_index"},"enable_performance_metrics":{"type":"boolean","key$":"enable_performance_metrics"},"default_time_period":{"enum":["24h","7d","30d","90d"],"type":"string","description":"* `24h` - 24h\n* `7d` - 7d\n* `30d` - 30d\n* `90d` - 90d","x-ref":"#/components/schemas/DefaultTimePeriodEnum","key$":"default_time_period"},"enable_dark_mode":{"type":"boolean","key$":"enable_dark_mode"},"hosted_subdomain":{"type":"string","minLength":1,"maxLength":63,"key$":"hosted_subdomain"},"custom_domain":{"type":"string","nullable":true,"minLength":1,"maxLength":255,"key$":"custom_domain"},"access":{"enum":["public","password"],"type":"string","description":"* `public` - public\n* `password` - password","x-ref":"#/components/schemas/AccessEnum","key$":"access"},"password":{"type":"string","writeOnly":true,"nullable":true,"key$":"password"},"ip_allowlist":{"type":"string","nullable":true,"key$":"ip_allowlist"},"environment":{"type":"string","description":"Environment key.","nullable":true,"key$":"environment"}},"required":["hosted_subdomain","name"],"x-ref":"#/components/schemas/StatusPageRequest","index$":1}}},"required":true},"parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const status_page_ref01_ent = client.StatusPage()
    let status_page_ref01_data = setup.data.new.status_page['status_page_ref01']

    status_page_ref01_data = (await status_page_ref01_ent.create(status_page_ref01_data)).data()
    assert(null != status_page_ref01_data)


    // LIST
    const status_page_ref01_match: any = {}

    const status_page_ref01_list = (await status_page_ref01_ent.list(status_page_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const status_page_ref01_data_up0: any = {}

    const status_page_ref01_markdef_up0 = { name: 'access', value: 'Mark01-status_page_ref01_' + setup.now }
    ;(status_page_ref01_data_up0 as any)[status_page_ref01_markdef_up0.name] = status_page_ref01_markdef_up0.value

    const status_page_ref01_resdata_up0 = (await status_page_ref01_ent.update(status_page_ref01_data_up0)).data()
    assert(null != status_page_ref01_resdata_up0)

    assert((status_page_ref01_resdata_up0 as any)[status_page_ref01_markdef_up0.name] === status_page_ref01_markdef_up0.value)




    // LIST
    const status_page_ref01_match_rt0: any = {}

    const status_page_ref01_list_rt0 = (await status_page_ref01_ent.list(status_page_ref01_match_rt0)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/status_page/StatusPageTestData.json')

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
    ['status_page01','status_page02','status_page03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_STATUS_PAGE_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_STATUS_PAGE_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_STATUS_PAGE_ENTID']
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
  
