

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


describe('MaintenanceWindowEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.MaintenanceWindow()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('maintenance_window hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).MaintenanceWindow().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).MaintenanceWindow()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MaintenanceWindow().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().MaintenanceWindow().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MaintenanceWindow().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MaintenanceWindow().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MaintenanceWindow().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'maintenance_window.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"affects_all_monitors":{"a":true,"h":"Affects All Monitors","n":"affects_all_monitors","r":false,"t":"`$BOOLEAN`","key$":"affects_all_monitors","index$":0},"affects_statuspage_components":{"a":true,"h":"Affects Statuspage Components","n":"affects_statuspage_components","r":false,"t":"`$BOOLEAN`","key$":"affects_statuspage_components","index$":1},"all_affected_monitors":{"a":true,"h":"All Affected Monitors","n":"all_affected_monitors","r":true,"ro":true,"t":"`$STRING`","key$":"all_affected_monitors","index$":2},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":3},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":4},"duration":{"a":true,"h":"Duration","n":"duration","r":true,"ro":true,"sh":"Returns the total duration of the maintenance window in seconds.","t":"`$INTEGER`","key$":"duration","index$":5},"end":{"a":true,"fo":"date-time","h":"End","n":"end","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"end","index$":6},"environment":{"a":true,"h":"Environment","n":"environment","r":false,"sh":"Environment key.","t":"`$STRING`","key$":"environment","index$":7},"groups":{"a":true,"h":"Groups","n":"groups","r":false,"t":"`$ARRAY`","key$":"groups","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":9},"key":{"a":true,"h":"Key","n":"key","r":true,"ro":true,"t":"`$STRING`","key$":"key","index$":10},"monitors":{"a":true,"h":"Monitors","n":"monitors","r":false,"t":"`$ARRAY`","key$":"monitors","index$":11},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":12},"start":{"a":true,"fo":"date-time","h":"Start","n":"start","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"start","index$":13},"state":{"a":true,"h":"State","n":"state","r":true,"ro":true,"sh":"Returns whether the window is currently past|ongoing|upcoming.","t":"`$STRING`","key$":"state","index$":14},"statuspages":{"a":true,"h":"Statuspages","n":"statuspages","r":false,"sh":"Status page keys.","t":"`$ARRAY`","key$":"statuspages","index$":15},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":true,"ro":true,"t":"`$STRING`","key$":"updated","index$":16}},"id":{"field":"id","name":"id"},"name":"maintenance_window","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["affects_all_monitors","affects_statuspage_components","description","end","environment","groups","monitors","name","start","statuspages"],"co":{"id":"POST /api/maintenance_windows","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/maintenance_windows","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"maintenance_windows"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/maintenance_windows","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/maintenance_windows","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"maintenance_windows"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/maintenance_windows/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/maintenance_windows/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"maintenance_windows"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["affects_all_monitors","affects_statuspage_components","description","end","environment","groups","monitors","name","start","statuspages"],"co":{"id":"PATCH /api/maintenance_windows/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/maintenance_windows/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"maintenance_windows"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/maintenance_windows/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/maintenance_windows/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"api"},{"lit":"maintenance_windows"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["affects_all_monitors","affects_statuspage_components","description","end","environment","groups","monitors","name","start","statuspages"],"co":{"id":"PUT /api/maintenance_windows/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/maintenance_windows/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"maintenance_windows"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"maintenance_window","name__orig":"maintenance_window","Name":"MaintenanceWindow","name_":"maintenance_window","name-":"maintenance-window","NAME":"MAINTENANCE_WINDOW","index$":6}, {"active":true,"entity":"maintenance_window","key$":"BasicMaintenanceWindowFlow","kind":"basic","name":"BasicMaintenanceWindowFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"maintenance_window_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"maintenance_window_ref01"}}]},{"a":true,"d":{},"i":{"ref":"maintenance_window_ref01","srcdatavar":"maintenance_window_ref01_data","suffix":"_up0","textfield":"description"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-maintenance_window_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"maintenance_window_ref01","srcdatavar":"maintenance_window_ref01_data","suffix":"_dt0"},"m":{"id":"maintenance_window01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-maintenance_window_ref01"}}]},{"a":true,"d":{},"i":{"ref":"maintenance_window_ref01","suffix":"_rm0"},"m":{"id":"maintenance_window01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"maintenance_window_ref01"}}]}]}, 'MaintenanceWindow', {"POST /api/maintenance_windows":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":128,"key$":"name"},"description":{"type":"string","nullable":true,"key$":"description"},"start":{"type":"string","format":"date-time","key$":"start"},"end":{"type":"string","format":"date-time","key$":"end"},"affects_all_monitors":{"type":"boolean","key$":"affects_all_monitors"},"affects_statuspage_components":{"type":"boolean","key$":"affects_statuspage_components"},"environment":{"type":"string","description":"Environment key.","nullable":true,"key$":"environment"},"statuspages":{"type":"array","items":{"type":"string"},"description":"Status page keys.","key$":"statuspages"},"monitors":{"type":"array","items":{},"key$":"monitors"},"groups":{"type":"array","items":{},"key$":"groups"}},"required":["end","name","start"],"x-ref":"#/components/schemas/MaintenanceWindowRequest","index$":1}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/maintenance_windows":{"protocol":"http","parameters":[{"name":"page","required":false,"in":"query","description":"A page number within the paginated result set.","schema":{"type":"integer"},"index$":0},{"name":"pageSize","required":false,"in":"query","description":"Number of results to return per page.","schema":{"type":"integer"},"index$":1},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":2}]},"GET /api/maintenance_windows/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PATCH /api/maintenance_windows/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":128,"key$":"name"},"description":{"type":"string","nullable":true,"key$":"description"},"start":{"type":"string","format":"date-time","key$":"start"},"end":{"type":"string","format":"date-time","key$":"end"},"affects_all_monitors":{"type":"boolean","key$":"affects_all_monitors"},"affects_statuspage_components":{"type":"boolean","key$":"affects_statuspage_components"},"environment":{"type":"string","description":"Environment key.","nullable":true,"key$":"environment"},"statuspages":{"type":"array","items":{"type":"string"},"description":"Status page keys.","key$":"statuspages"},"monitors":{"type":"array","items":{},"key$":"monitors"},"groups":{"type":"array","items":{},"key$":"groups"}},"x-ref":"#/components/schemas/PatchedMaintenanceWindowRequest","index$":1}}}},"parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"DELETE /api/maintenance_windows/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PUT /api/maintenance_windows/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"maxLength":128,"key$":"name"},"description":{"type":"string","nullable":true,"key$":"description"},"start":{"type":"string","format":"date-time","key$":"start"},"end":{"type":"string","format":"date-time","key$":"end"},"affects_all_monitors":{"type":"boolean","key$":"affects_all_monitors"},"affects_statuspage_components":{"type":"boolean","key$":"affects_statuspage_components"},"environment":{"type":"string","description":"Environment key.","nullable":true,"key$":"environment"},"statuspages":{"type":"array","items":{"type":"string"},"description":"Status page keys.","key$":"statuspages"},"monitors":{"type":"array","items":{},"key$":"monitors"},"groups":{"type":"array","items":{},"key$":"groups"}},"required":["end","name","start"],"x-ref":"#/components/schemas/MaintenanceWindowRequest","index$":1}}},"required":true},"parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const maintenance_window_ref01_ent = client.MaintenanceWindow()
    let maintenance_window_ref01_data = setup.data.new.maintenance_window['maintenance_window_ref01']

    maintenance_window_ref01_data = (await maintenance_window_ref01_ent.create(maintenance_window_ref01_data)).data()
    assert(null != maintenance_window_ref01_data.id)


    // LIST
    const maintenance_window_ref01_match: any = {}

    const maintenance_window_ref01_list = (await maintenance_window_ref01_ent.list(maintenance_window_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(maintenance_window_ref01_list, { id: maintenance_window_ref01_data.id })))


    // UPDATE
    const maintenance_window_ref01_data_up0: any = {}
    maintenance_window_ref01_data_up0.id = maintenance_window_ref01_data.id

    const maintenance_window_ref01_markdef_up0 = { name: 'description', value: 'Mark01-maintenance_window_ref01_' + setup.now }
    ;(maintenance_window_ref01_data_up0 as any)[maintenance_window_ref01_markdef_up0.name] = maintenance_window_ref01_markdef_up0.value

    const maintenance_window_ref01_resdata_up0 = (await maintenance_window_ref01_ent.update(maintenance_window_ref01_data_up0)).data()
    assert(maintenance_window_ref01_resdata_up0.id === maintenance_window_ref01_data_up0.id)

    assert((maintenance_window_ref01_resdata_up0 as any)[maintenance_window_ref01_markdef_up0.name] === maintenance_window_ref01_markdef_up0.value)


    // LOAD
    const maintenance_window_ref01_match_dt0: any = {}
    maintenance_window_ref01_match_dt0.id = maintenance_window_ref01_data.id
    const maintenance_window_ref01_data_dt0 = (await maintenance_window_ref01_ent.load(maintenance_window_ref01_match_dt0)).data()
    assert(maintenance_window_ref01_data_dt0.id === maintenance_window_ref01_data.id)


    // REMOVE
    const maintenance_window_ref01_match_rm0: any = { id: maintenance_window_ref01_data.id }
    await maintenance_window_ref01_ent.remove(maintenance_window_ref01_match_rm0)
  

    // LIST
    const maintenance_window_ref01_match_rt0: any = {}

    const maintenance_window_ref01_list_rt0 = (await maintenance_window_ref01_ent.list(maintenance_window_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(maintenance_window_ref01_list_rt0, { id: maintenance_window_ref01_data.id })))


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
      '../../../../.sdk/test/entity/maintenance_window/MaintenanceWindowTestData.json')

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
    ['maintenance_window01','maintenance_window02','maintenance_window03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_MAINTENANCE_WINDOW_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_MAINTENANCE_WINDOW_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_MAINTENANCE_WINDOW_ENTID']
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
  
