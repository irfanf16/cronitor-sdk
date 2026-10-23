

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


describe('MetricEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.Metric()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'metric.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"metric","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/metrics","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/metrics","q":{},"r":{},"s":[{"lit":"api"},{"lit":"metrics"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"metric","name__orig":"metric","Name":"Metric","name_":"metric","name-":"metric","NAME":"METRIC","index$":7}, {"active":true,"entity":"metric","key$":"BasicMetricFlow","kind":"basic","name":"BasicMetricFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"metric_ref01","srcdatavar":"metric_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-metric_ref01"}}]}]}, 'Metric', {"GET /api/metrics":{"protocol":"http","parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let metric_ref01_data = Object.values(setup.data.existing.metric)[0] as any

    // LOAD
    const metric_ref01_ent = client.Metric()
    const metric_ref01_match_dt0: any = {}
    const metric_ref01_data_dt0 = (await metric_ref01_ent.load(metric_ref01_match_dt0)).data()
    assert(null != metric_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/metric/MetricTestData.json')

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
    ['metric01','metric02','metric03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_METRIC_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_METRIC_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_METRIC_ENTID']
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
  
