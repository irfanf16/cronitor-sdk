

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


describe('TelemetryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.Telemetry()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Telemetry().load({"api_key":1,"monitor_key":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'telemetry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id","parts":["api_key","monitor_key"],"sep":"/"},"name":"telemetry","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /p/{apiKey}/{monitorKey}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"api_key","or":"apiKey","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"monitor_key","or":"monitorKey","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"env","or":"env","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"host","or":"host","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"message","or":"message","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"metric","or":"metric","r":false,"t":"`$ARRAY`","index$":3},{"a":true,"k":"query","n":"series","or":"series","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"status_code","or":"status_code","r":false,"t":"`$INTEGER`","index$":6}]},"k":"http","m":"POST","o":"/p/{apiKey}/{monitorKey}","q":{"exist":["api_key","monitor_key"]},"r":{"param":{"apiKey":"api_key","monitorKey":"monitor_key"}},"s":[{"lit":"p"},{"var":"api_key"},{"var":"monitor_key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /p/{apiKey}/{monitorKey}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"api_key","or":"apiKey","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"monitor_key","or":"monitorKey","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"env","or":"env","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"host","or":"host","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"message","or":"message","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"metric","or":"metric","r":false,"t":"`$ARRAY`","index$":3},{"a":true,"k":"query","n":"series","or":"series","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"status_code","or":"status_code","r":false,"t":"`$INTEGER`","index$":6}]},"k":"http","m":"GET","o":"/p/{apiKey}/{monitorKey}","q":{"exist":["api_key","monitor_key"]},"r":{"param":{"apiKey":"api_key","monitorKey":"monitor_key"}},"s":[{"lit":"p"},{"var":"api_key"},{"var":"monitor_key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"telemetry","name__orig":"telemetry","Name":"Telemetry","name_":"telemetry","name-":"telemetry","NAME":"TELEMETRY","index$":15}, {"active":true,"entity":"telemetry","key$":"BasicTelemetryFlow","kind":"basic","name":"BasicTelemetryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"telemetry_ref01"},"m":{"api_key":"api_key01","monitor_key":"monitor_key01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"telemetry_ref01","srcdatavar":"telemetry_ref01_data","suffix":"_dt0"},"m":{"api_key":"api_key01","id":"telemetry01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-telemetry_ref01"}}]}]}, 'Telemetry', {"POST /p/{apiKey}/{monitorKey}":{"protocol":"http","parameters":[{"name":"apiKey","in":"path","required":true,"schema":{"type":"string"},"description":"An API key with the monitor:telemetry scope. Telemetry keys are not secret.","index$":0},{"name":"monitorKey","in":"path","required":true,"schema":{"type":"string"},"description":"The monitor key. An unknown key creates a monitor.","index$":1},{"name":"state","in":"query","schema":{"type":"string","enum":["run","complete","fail","tick","ok"]},"description":"Omit to record a tick. ok resets the monitor to passing.","index$":2},{"name":"message","in":"query","schema":{"type":"string","maxLength":2000},"index$":3},{"name":"series","in":"query","schema":{"type":"string"},"description":"Matches a run event with its complete or fail event.","index$":4},{"name":"metric","in":"query","style":"form","explode":true,"schema":{"type":"array","items":{"type":"string","example":"count:100"}},"description":"A metric in name:value form. Repeat for multiple metrics.","index$":5},{"name":"env","in":"query","schema":{"type":"string"},"index$":6},{"name":"host","in":"query","schema":{"type":"string"},"index$":7},{"name":"status_code","in":"query","schema":{"type":"integer"},"description":"The exit code returned by the job.","index$":8}]},"GET /p/{apiKey}/{monitorKey}":{"protocol":"http","parameters":[{"name":"apiKey","in":"path","required":true,"schema":{"type":"string"},"description":"An API key with the monitor:telemetry scope. Telemetry keys are not secret.","index$":0},{"name":"monitorKey","in":"path","required":true,"schema":{"type":"string"},"description":"The monitor key. An unknown key creates a monitor.","index$":1},{"name":"state","in":"query","schema":{"type":"string","enum":["run","complete","fail","tick","ok"]},"description":"Omit to record a tick. ok resets the monitor to passing.","index$":2},{"name":"message","in":"query","schema":{"type":"string","maxLength":2000},"index$":3},{"name":"series","in":"query","schema":{"type":"string"},"description":"Matches a run event with its complete or fail event.","index$":4},{"name":"metric","in":"query","style":"form","explode":true,"schema":{"type":"array","items":{"type":"string","example":"count:100"}},"description":"A metric in name:value form. Repeat for multiple metrics.","index$":5},{"name":"env","in":"query","schema":{"type":"string"},"index$":6},{"name":"host","in":"query","schema":{"type":"string"},"index$":7},{"name":"status_code","in":"query","schema":{"type":"integer"},"description":"The exit code returned by the job.","index$":8}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const telemetry_ref01_ent = client.Telemetry()
    let telemetry_ref01_data = setup.data.new.telemetry['telemetry_ref01']
    telemetry_ref01_data['api_key'] = setup.idmap['api_key01']
    telemetry_ref01_data['monitor_key'] = setup.idmap['monitor_key01']

    telemetry_ref01_data = (await telemetry_ref01_ent.create(telemetry_ref01_data)).data()
    assert(null != telemetry_ref01_data.id)


    // LOAD
    const telemetry_ref01_match_dt0: any = {}
    telemetry_ref01_match_dt0.id = telemetry_ref01_data.id
    telemetry_ref01_match_dt0['api_key'] = setup.idmap['api_key'] ?? setup.idmap['api_key01']
    const telemetry_ref01_data_dt0 = (await telemetry_ref01_ent.load(telemetry_ref01_match_dt0)).data()
    assert(telemetry_ref01_data_dt0.id === telemetry_ref01_data.id)


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
      '../../../../.sdk/test/entity/telemetry/TelemetryTestData.json')

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
    ['telemetry01','telemetry02','telemetry03','api_key01','monitor_key01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_TELEMETRY_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_TELEMETRY_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_TELEMETRY_ENTID']
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
  
