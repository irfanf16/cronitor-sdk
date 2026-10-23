

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


describe('RumErrorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.RumError()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('rum_error hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).RumError().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).RumError()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.RumError().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().RumError().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.RumError().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.RumError().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RumError().list({"env":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rum_error.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"colno":{"a":true,"h":"Colno","n":"colno","r":true,"ro":true,"t":"`$INTEGER`","key$":"colno","index$":0},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":1},"environment":{"a":true,"h":"Environment","n":"environment","r":true,"sh":"Environment key.","t":"`$STRING`","key$":"environment","index$":2},"error_type":{"a":true,"h":"Error Type","n":"error_type","r":true,"ro":true,"t":"`$STRING`","key$":"error_type","index$":3},"filename":{"a":true,"h":"Filename","n":"filename","r":true,"ro":true,"t":"`$STRING`","key$":"filename","index$":4},"first_seen":{"a":true,"fo":"date-time","h":"First Seen","n":"first_seen","r":true,"ro":true,"t":"`$STRING`","key$":"first_seen","index$":5},"ignored":{"a":true,"h":"Ignored","n":"ignored","r":false,"t":"`$BOOLEAN`","key$":"ignored","index$":6},"key":{"a":true,"h":"Key","n":"key","r":true,"ro":true,"t":"`$STRING`","key$":"key","index$":7},"last_seen":{"a":true,"fo":"date-time","h":"Last Seen","n":"last_seen","r":true,"ro":true,"t":"`$STRING`","key$":"last_seen","index$":8},"latest_event":{"a":true,"h":"Latest Event","n":"latest_event","r":true,"ro":true,"t":"`$STRING`","key$":"latest_event","index$":9},"lineno":{"a":true,"h":"Lineno","n":"lineno","r":true,"ro":true,"t":"`$INTEGER`","key$":"lineno","index$":10},"message":{"a":true,"h":"Message","n":"message","r":true,"ro":true,"t":"`$STRING`","key$":"message","index$":11},"occurrences":{"a":true,"h":"Occurrences","n":"occurrences","r":true,"ro":true,"t":"`$INTEGER`","key$":"occurrences","index$":12},"site":{"a":true,"h":"Site","n":"site","r":true,"sh":"RUM site key.","t":"`$STRING`","key$":"site","index$":13},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":true,"ro":true,"t":"`$STRING`","key$":"updated","index$":14}},"name":"rum_error","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/site_errors","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"env","or":"env","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"environment","or":"environment","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"ignored","or":"ignored","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"site","or":"site","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/site_errors","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"site_errors"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/site_errors/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"key","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/site_errors/{key}","q":{"exist":["key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"site_errors"},{"var":"key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"rum_error","name__orig":"rum_error","Name":"RumError","name_":"rum_error","name-":"rum-error","NAME":"RUM_ERROR","index$":10}, {"active":true,"entity":"rum_error","key$":"BasicRumErrorFlow","kind":"basic","name":"BasicRumErrorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"rum_error_ref01"}}]},{"a":false,"d":{},"i":{"ref":"rum_error_ref01","srcdatavar":"rum_error_ref01_data","suffix":"_dt0"},"m":{"id":"rum_error01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-rum_error_ref01"}}],"unreachable":true}]}, 'RumError', {"GET /api/site_errors":{"protocol":"http","parameters":[{"in":"query","name":"env","schema":{"type":"string"},"index$":0},{"in":"query","name":"environment","schema":{"type":"integer"},"index$":1},{"in":"query","name":"ignored","schema":{"type":"boolean"},"index$":2},{"name":"page","required":false,"in":"query","description":"A page number within the paginated result set.","schema":{"type":"integer"},"index$":3},{"name":"pageSize","required":false,"in":"query","description":"Number of results to return per page.","schema":{"type":"integer"},"index$":4},{"in":"query","name":"site","schema":{"type":"string"},"index$":5},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":6}]},"GET /api/site_errors/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9\\.\\-\\:]{3,255}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rum_error_ref01_data = Object.values(setup.data.existing.rum_error)[0] as any

    // LIST
    const rum_error_ref01_ent = client.RumError()
    const rum_error_ref01_match: any = {}

    const rum_error_ref01_list = (await rum_error_ref01_ent.list(rum_error_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/rum_error/RumErrorTestData.json')

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
    ['rum_error01','rum_error02','rum_error03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_RUM_ERROR_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_RUM_ERROR_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_RUM_ERROR_ENTID']
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
  
