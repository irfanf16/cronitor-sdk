

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


describe('MonitorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.Monitor()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('monitor hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).Monitor().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).Monitor()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Monitor().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().Monitor().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Monitor().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Monitor().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Monitor().list({"env":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'monitor.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"assertions":{"a":true,"h":"Assertions","n":"assertions","r":false,"sh":"Assertions such as \"response.code = 200\" or \"metric.queue_depth < 100\".","t":"`$ARRAY`","key$":"assertions","index$":0},"attributes":{"a":true,"h":"Attributes","n":"attributes","r":true,"ro":true,"sh":"Values derived from the monitor configuration.","t":"`$OBJECT`","key$":"attributes","index$":1},"badges":{"a":true,"h":"Badges","n":"badges","r":true,"ro":true,"t":"`$OBJECT`","key$":"badges","index$":2},"consecutive_alert_threshold":{"a":true,"h":"Consecutive Alert Threshold","n":"consecutive_alert_threshold","r":false,"t":"`$INTEGER`","key$":"consecutive_alert_threshold","index$":3},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":4},"defaultName":{"a":true,"h":"Default Name","n":"defaultName","r":false,"t":"`$STRING`","wo":true,"key$":"defaultName","index$":5},"defaultNote":{"a":true,"h":"Default Note","n":"defaultNote","r":false,"t":"`$STRING`","wo":true,"key$":"defaultNote","index$":6},"disabled":{"a":true,"h":"Disabled","n":"disabled","r":true,"ro":true,"t":"`$BOOLEAN`","key$":"disabled","index$":7},"environments":{"a":true,"h":"Environments","n":"environments","r":false,"t":"`$ARRAY`","key$":"environments","index$":8},"failure_tolerance":{"a":true,"h":"Failure Tolerance","n":"failure_tolerance","r":false,"sh":"Failures tolerated before an alert.","t":"`$INTEGER`","key$":"failure_tolerance","index$":9},"grace_seconds":{"a":true,"h":"Grace Seconds","n":"grace_seconds","r":false,"sh":"Seconds to wait after a missed or late event before alerting.","t":"`$INTEGER`","key$":"grace_seconds","index$":10},"group":{"a":true,"h":"Group","n":"group","r":false,"sh":"Group key.","t":"`$STRING`","key$":"group","index$":11},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":12},"initialized":{"a":true,"h":"Initialized","n":"initialized","r":true,"ro":true,"sh":"Whether the monitor has received telemetry.","t":"`$BOOLEAN`","key$":"initialized","index$":13},"key":{"a":true,"h":"Key","n":"key","op":{"create":{"req":false,"type":"`$STRING`"},"list":{"req":false,"type":"`$STRING`"},"load":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Unique monitor key.","t":"`$STRING`","key$":"key","index$":14},"latest_event":{"a":true,"h":"Latest Event","n":"latest_event","r":true,"ro":true,"sh":"Present when the request has withStatus=true (the default).","t":"`$ANY`","key$":"latest_event","index$":15},"latest_events":{"a":true,"h":"Latest Events","n":"latest_events","r":true,"ro":true,"sh":"Latest event of each kind, keyed by event name.","t":"`$OBJECT`","key$":"latest_events","index$":16},"latest_invocations":{"a":true,"h":"Latest Invocations","n":"latest_invocations","r":true,"ro":true,"sh":"Present with withInvocations=true.","t":"`$ARRAY`","key$":"latest_invocations","index$":17},"latest_issue":{"a":true,"h":"Latest Issue","n":"latest_issue","r":true,"ro":true,"t":"`$OBJECT`","key$":"latest_issue","index$":18},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$STRING`","key$":"metadata","index$":19},"metric_names":{"a":true,"h":"Metric Names","n":"metric_names","r":true,"ro":true,"t":"`$ARRAY`","key$":"metric_names","index$":20},"monitor_list":{"a":true,"h":"Monitor List","n":"monitor_list","r":false,"t":"`$ARRAY`","key$":"monitor_list","index$":21},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":22},"next_expected_at":{"a":true,"h":"Next Expected At","n":"next_expected_at","r":true,"ro":true,"sh":"Unix timestamp of the next scheduled run.","t":"`$NUMBER`","key$":"next_expected_at","index$":23},"note":{"a":true,"h":"Note","n":"note","r":false,"t":"`$STRING`","key$":"note","index$":24},"notify":{"a":true,"h":"Notify","n":"notify","r":false,"sh":"Notification list keys or inline destinations such as \"email:ops@example.com\".","t":"`$ANY`","union":{"branches":2,"count":2,"depth":4},"key$":"notify","index$":25},"passing":{"a":true,"h":"Passing","n":"passing","r":true,"ro":true,"sh":"Present when the request has withStatus=true (the default).","t":"`$BOOLEAN`","key$":"passing","index$":26},"paused":{"a":true,"h":"Paused","n":"paused","op":{"create":{"req":false,"type":"`$BOOLEAN`"},"list":{"req":false,"type":"`$BOOLEAN`"},"load":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"paused","index$":27},"paused_until":{"a":true,"fo":"date-time","h":"Paused Until","n":"paused_until","r":true,"t":"`$STRING`","key$":"paused_until","index$":28},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"t":"`$STRING`","key$":"platform","index$":29},"realert_interval":{"a":true,"h":"Realert Interval","n":"realert_interval","r":false,"sh":"How often to repeat an alert, for example \"8 hours\", or seconds.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"realert_interval","index$":30},"request":{"a":true,"h":"Request","n":"request","r":false,"sh":"The request a check monitor makes.","t":"`$OBJECT`","key$":"request","index$":31},"running":{"a":true,"h":"Running","n":"running","r":true,"ro":true,"sh":"Present when the request has withStatus=true (the default).","t":"`$BOOLEAN`","key$":"running","index$":32},"schedule_tolerance":{"a":true,"h":"Schedule Tolerance","n":"schedule_tolerance","r":false,"sh":"Missed runs tolerated before an alert.","t":"`$INTEGER`","key$":"schedule_tolerance","index$":33},"schedules":{"a":true,"h":"Schedules","n":"schedules","r":false,"sh":"Cron expressions, intervals such as \"every 5 minutes\", or RRULEs.","t":"`$ARRAY`","key$":"schedules","index$":34},"site":{"a":true,"h":"Site","n":"site","r":false,"sh":"RUM site key.","t":"`$STRING`","key$":"site","index$":35},"statuspages":{"a":true,"h":"Statuspages","n":"statuspages","r":false,"sh":"Status page keys.","t":"`$ARRAY`","key$":"statuspages","index$":36},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"t":"`$ARRAY`","key$":"tags","index$":37},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":false,"sh":"IANA timezone.","t":"`$STRING`","key$":"timezone","index$":38},"tolerated_failures":{"a":true,"de":true,"h":"Tolerated Failures","n":"tolerated_failures","r":false,"sh":"Use failure_tolerance.","t":"`$INTEGER`","wo":true,"key$":"tolerated_failures","index$":39},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":40}},"id":{"field":"id","name":"id"},"name":"monitor","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["assertions","consecutive_alert_threshold","defaultName","defaultNote","environments","failure_tolerance","grace_seconds","group","key","metadata","name","note","notify","paused","platform","realert_interval","request","schedule_tolerance","schedules","site","statuspages","tags","timezone","tolerated_failures","type"],"co":{"id":"POST /api/monitors","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/monitors","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["key","name"],"co":{"id":"POST /api/monitors/clone","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/monitors/clone","q":{"$action":"clone"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"},{"lit":"clone"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/monitors","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"env","or":"env","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"group","or":"group","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"site","or":"site","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"state","or":"state","r":false,"t":"`$ARRAY`","index$":8},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ARRAY`","index$":9},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ARRAY`","index$":10},{"a":true,"k":"query","n":"with_event","or":"withEvents","r":false,"t":"`$BOOLEAN`","index$":11},{"a":true,"k":"query","n":"with_invocation","or":"withInvocations","r":false,"t":"`$BOOLEAN`","index$":12},{"a":true,"k":"query","n":"with_status","or":"withStatus","r":false,"t":"`$BOOLEAN`","index$":13}]},"k":"http","m":"GET","o":"/api/monitors","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"}],"t":{"req":"`reqdata`","res":"`body.monitors`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/monitors/{code}/pause/{hours}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"hour","or":"hours","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"monitor_id","or":"code","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/monitors/{code}/pause/{hours}","q":{"exist":["hour","monitor_id"]},"r":{"param":{"code":"monitor_id","hours":"hour"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"},{"var":"monitor_id"},{"lit":"pause"},{"var":"hour"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/monitors/{code}/pause","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"code","or":"code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/monitors/{code}/pause","q":{"$action":"pause","exist":["code"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"},{"var":"code"},{"lit":"pause"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/monitors/{code}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"code","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"env","or":"env","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"with_event","or":"withEvents","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"with_invocation","or":"withInvocations","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"with_status","or":"withStatus","r":false,"t":"`$BOOLEAN`","index$":3}]},"k":"http","m":"GET","o":"/api/monitors/{code}","q":{"exist":["id"]},"r":{"param":{"code":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/monitors/{code}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"code","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/monitors/{code}","q":{"exist":["id"]},"r":{"param":{"code":"id"}},"s":[{"lit":"api"},{"lit":"monitors"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["monitors"],"co":{"id":"DELETE /api/monitors","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/monitors","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["monitor_list"],"co":{"id":"PUT /api/monitors","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/monitors","q":{"exist":["monitor_list"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"monitors"}],"t":{"req":"`reqdata.monitor_list`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"monitor","name__orig":"monitor","Name":"Monitor","name_":"monitor","name-":"monitor","NAME":"MONITOR","index$":8}, {"active":true,"entity":"monitor","key$":"BasicMonitorFlow","kind":"basic","name":"BasicMonitorFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"monitor_ref01"},"m":{"monitor_id":"monitor01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"monitor_ref01"}}]},{"a":true,"d":{},"i":{"ref":"monitor_ref01","srcdatavar":"monitor_ref01_data","suffix":"_up0","textfield":"defaultName"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monitor_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"monitor_ref01","srcdatavar":"monitor_ref01_data","suffix":"_dt0"},"m":{"id":"monitor01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monitor_ref01"}}]},{"a":true,"d":{},"i":{"ref":"monitor_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"monitor_ref01"}}]}]}, 'Monitor', {"POST /api/monitors":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","description":"V5 serializer replaces 'schedule' with 'schedules' to support multiple schedule expressions.\nThis is used for monitors with multiple cron expressions or Windows Task Scheduler RRULE triggers.\n\nAlso consolidates public_badge_url and public_detailed_badge_url into a 'badges' object.","properties":{"assertions":{"type":"array","items":{"type":"string"},"nullable":true,"description":"Assertions such as \"response.code = 200\" or \"metric.queue_depth < 100\".","key$":"assertions"},"failure_tolerance":{"type":"integer","nullable":true,"description":"Failures tolerated before an alert. Default 0.","key$":"failure_tolerance"},"grace_seconds":{"type":"integer","nullable":true,"description":"Seconds to wait after a missed or late event before alerting.","key$":"grace_seconds"},"consecutive_alert_threshold":{"type":"integer","maximum":1000,"minimum":1,"key$":"consecutive_alert_threshold"},"group":{"type":"string","nullable":true,"description":"Group key.","key$":"group"},"key":{"type":"string","nullable":true,"description":"Unique monitor key. Required when creating a monitor.","key$":"key"},"metadata":{"type":"string","nullable":true,"key$":"metadata"},"name":{"type":"string","key$":"name"},"note":{"type":"string","nullable":true,"key$":"note"},"notify":{"description":"Notification list keys or inline destinations such as \"email:ops@example.com\". Omit to use the default list.","oneOf":[{"type":"array","items":{"type":"string"}},{"type":"object","properties":{"alerts":{},"events":{}}}],"key$":"notify"},"paused":{"type":"boolean","key$":"paused"},"platform":{"type":"string","nullable":true,"key$":"platform"},"realert_interval":{"nullable":true,"description":"How often to repeat an alert, for example \"8 hours\", or seconds.","oneOf":[{"type":"integer"},{"type":"string"}],"key$":"realert_interval"},"request":{"type":"object","nullable":true,"description":"The request a check monitor makes. Required when type is check.","properties":{"url":{"type":"string","description":"http(s) URL for an HTTP check, or host:port for TCP and UDP."},"method":{"type":"string","enum":["GET","POST","PUT","PATCH","HEAD","TCP","UDP"],"description":"HTTP method, or TCP or UDP."},"body":{"type":"string","nullable":true,"description":"Request body. Null when the check sends none."},"headers":{"type":"object","additionalProperties":{"type":"string"}},"cookies":{"type":"object","additionalProperties":{"type":"string"}},"timeout_seconds":{"type":"integer","minimum":1,"maximum":60,"description":"Seconds before the check times out. Free plans allow up to 30; paid plans allow up to 60."},"regions":{"type":"array","items":{"type":"string"}},"follow_redirects":{"type":"boolean"},"verify_ssl":{"type":"boolean"},"use_ipv6":{"type":"boolean"}},"key$":"request"},"schedules":{"type":"array","items":{"type":"string"},"nullable":true,"description":"Cron expressions, intervals such as \"every 5 minutes\", or RRULEs.","key$":"schedules"},"schedule_tolerance":{"type":"integer","nullable":true,"description":"Missed runs tolerated before an alert. Default 0.","key$":"schedule_tolerance"},"tags":{"type":"array","items":{"type":"string"},"nullable":true,"key$":"tags"},"timezone":{"type":"string","nullable":true,"description":"IANA timezone. Defaults to the account timezone.","key$":"timezone"},"type":{"type":"string","enum":["job","heartbeat","check","site"],"x-ref":"#/components/schemas/TypeEnum","key$":"type"},"environments":{"type":"array","items":{"type":"string","description":"Environment key. Requests also accept {\"key\": \"<environment>\"}."},"key$":"environments"},"statuspages":{"type":"array","items":{"type":"string"},"description":"Status page keys.","key$":"statuspages"},"site":{"type":"string","nullable":true,"description":"RUM site key.","key$":"site"},"defaultName":{"type":"string","writeOnly":true,"minLength":1,"key$":"defaultName"},"defaultNote":{"type":"string","writeOnly":true,"minLength":1,"key$":"defaultNote"},"tolerated_failures":{"type":"integer","writeOnly":true,"deprecated":true,"description":"Use failure_tolerance.","key$":"tolerated_failures"}},"x-ref":"#/components/schemas/MonitorRequest","index$":1}}}},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"POST /api/monitors/clone":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"key":{"type":"string","minLength":1,"description":"Key of the monitor to clone.","key$":"key"},"name":{"type":"string","minLength":1,"description":"Defaults to \"Clone of <name>\".","key$":"name"}},"required":["key"],"x-ref":"#/components/schemas/MonitorCloneRequest","index$":1}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/monitors":{"protocol":"http","parameters":[{"in":"query","name":"env","schema":{"type":"string"},"description":"Environment key. Defaults to the account default environment.","index$":0},{"in":"query","name":"format","schema":{"type":"string","enum":["yaml"]},"description":"yaml returns monitor configuration as YAML.","index$":1},{"in":"query","name":"group","schema":{"type":"string"},"description":"Group key.","index$":2},{"in":"query","name":"page","schema":{"type":"integer"},"description":"Page number, starting at 1.","index$":3},{"in":"query","name":"pageSize","schema":{"type":"integer"},"description":"Monitors per page, up to 1000.","index$":4},{"in":"query","name":"search","schema":{"type":"string"},"description":"Search monitor names and keys.","index$":5},{"in":"query","name":"site","schema":{"type":"string"},"description":"RUM site key.","index$":6},{"in":"query","name":"sort","schema":{"type":"string","enum":["-created","-name","created","name"]},"description":"Sort order.","index$":7},{"in":"query","name":"state","schema":{"type":"array","items":{"type":"string","enum":["failing","passing","paused","running"]}},"description":"Monitor states.","index$":8},{"in":"query","name":"tag","schema":{"type":"array","items":{"type":"string"}},"description":"Tags. A monitor must have every tag.","index$":9},{"in":"query","name":"type","schema":{"type":"array","items":{"type":"string","enum":["check","heartbeat","job","site"]}},"description":"Monitor types to include.","index$":10},{"in":"query","name":"withEvents","schema":{"type":"boolean"},"description":"Include latest_events.","index$":11},{"in":"query","name":"withInvocations","schema":{"type":"boolean"},"description":"Include latest_invocations.","index$":12},{"in":"query","name":"withStatus","schema":{"type":"boolean"},"description":"Include passing, running, and latest_event. Default true.","index$":13},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":14}]},"GET /api/monitors/{code}/pause/{hours}":{"protocol":"http","parameters":[{"in":"path","name":"code","schema":{"type":"string","pattern":"^[A-Za-z0-9]{3,12}|[\\w|\\W]+$"},"required":true,"index$":0},{"in":"path","name":"hours","schema":{"type":"string","pattern":"^\\d+$"},"required":true,"index$":1},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":2}]},"GET /api/monitors/{code}/pause":{"protocol":"http","parameters":[{"in":"path","name":"code","schema":{"type":"string","pattern":"^[A-Za-z0-9]{3,12}|[\\w|\\W]+$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"GET /api/monitors/{code}":{"protocol":"http","parameters":[{"in":"path","name":"code","schema":{"type":"string","pattern":"^[A-Za-z0-9]{3,12}|[\\w|\\W]+$"},"required":true,"index$":0},{"in":"query","name":"env","schema":{"type":"string"},"description":"Environment key. Defaults to the account default environment.","index$":1},{"in":"query","name":"withEvents","schema":{"type":"boolean"},"description":"Include latest_events.","index$":2},{"in":"query","name":"withInvocations","schema":{"type":"boolean"},"description":"Include latest_invocations.","index$":3},{"in":"query","name":"withStatus","schema":{"type":"boolean"},"description":"Include passing, running, and latest_event. Default true.","index$":4},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":5}]},"DELETE /api/monitors/{code}":{"protocol":"http","parameters":[{"in":"path","name":"code","schema":{"type":"string","pattern":"^[A-Za-z0-9]{3,12}|[\\w|\\W]+$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"DELETE /api/monitors":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"monitors":{"type":"array","items":{"type":"string","minLength":1},"minItems":1,"key$":"monitors"}},"required":["monitors"],"x-ref":"#/components/schemas/MonitorKeysRequest","index$":1}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"PUT /api/monitors":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"V5 serializer replaces 'schedule' with 'schedules' to support multiple schedule expressions.\nThis is used for monitors with multiple cron expressions or Windows Task Scheduler RRULE triggers.\n\nAlso consolidates public_badge_url and public_detailed_badge_url into a 'badges' object.","properties":{"assertions":{"type":"array","items":{"type":"string"},"nullable":true,"description":"Assertions such as \"response.code = 200\" or \"metric.queue_depth < 100\".","key$":"assertions"},"failure_tolerance":{"type":"integer","nullable":true,"description":"Failures tolerated before an alert. Default 0.","key$":"failure_tolerance"},"grace_seconds":{"type":"integer","nullable":true,"description":"Seconds to wait after a missed or late event before alerting.","key$":"grace_seconds"},"consecutive_alert_threshold":{"type":"integer","maximum":1000,"minimum":1,"key$":"consecutive_alert_threshold"},"group":{"type":"string","nullable":true,"description":"Group key.","key$":"group"},"key":{"type":"string","nullable":true,"description":"Unique monitor key. Required when creating a monitor.","key$":"key"},"metadata":{"type":"string","nullable":true,"key$":"metadata"},"name":{"type":"string","key$":"name"},"note":{"type":"string","nullable":true,"key$":"note"},"notify":{"description":"Notification list keys or inline destinations such as \"email:ops@example.com\". Omit to use the default list.","oneOf":[{"type":"array","items":{}},{"type":"object","properties":{}}],"key$":"notify"},"paused":{"type":"boolean","key$":"paused"},"platform":{"type":"string","nullable":true,"key$":"platform"},"realert_interval":{"nullable":true,"description":"How often to repeat an alert, for example \"8 hours\", or seconds.","oneOf":[{"type":"integer"},{"type":"string"}],"key$":"realert_interval"},"request":{"type":"object","nullable":true,"description":"The request a check monitor makes. Required when type is check.","properties":{"url":{"type":"string","description":"http(s) URL for an HTTP check, or host:port for TCP and UDP."},"method":{"type":"string","enum":[],"description":"HTTP method, or TCP or UDP."},"body":{"type":"string","nullable":true,"description":"Request body. Null when the check sends none."},"headers":{"type":"object","additionalProperties":{}},"cookies":{"type":"object","additionalProperties":{}},"timeout_seconds":{"type":"integer","minimum":1,"maximum":60,"description":"Seconds before the check times out. Free plans allow up to 30; paid plans allow up to 60."},"regions":{"type":"array","items":{}},"follow_redirects":{"type":"boolean"},"verify_ssl":{"type":"boolean"},"use_ipv6":{"type":"boolean"}},"key$":"request"},"schedules":{"type":"array","items":{"type":"string"},"nullable":true,"description":"Cron expressions, intervals such as \"every 5 minutes\", or RRULEs.","key$":"schedules"},"schedule_tolerance":{"type":"integer","nullable":true,"description":"Missed runs tolerated before an alert. Default 0.","key$":"schedule_tolerance"},"tags":{"type":"array","items":{"type":"string"},"nullable":true,"key$":"tags"},"timezone":{"type":"string","nullable":true,"description":"IANA timezone. Defaults to the account timezone.","key$":"timezone"},"type":{"type":"string","enum":["job","heartbeat","check","site"],"x-ref":"#/components/schemas/TypeEnum","key$":"type"},"environments":{"type":"array","items":{"type":"string","description":"Environment key. Requests also accept {\"key\": \"<environment>\"}."},"key$":"environments"},"statuspages":{"type":"array","items":{"type":"string"},"description":"Status page keys.","key$":"statuspages"},"site":{"type":"string","nullable":true,"description":"RUM site key.","key$":"site"},"defaultName":{"type":"string","writeOnly":true,"minLength":1,"key$":"defaultName"},"defaultNote":{"type":"string","writeOnly":true,"minLength":1,"key$":"defaultNote"},"tolerated_failures":{"type":"integer","writeOnly":true,"deprecated":true,"description":"Use failure_tolerance.","key$":"tolerated_failures"}},"x-ref":"#/components/schemas/MonitorRequest"},"index$":1}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const monitor_ref01_ent = client.Monitor()
    let monitor_ref01_data = setup.data.new.monitor['monitor_ref01']
    monitor_ref01_data['monitor_id'] = setup.idmap['monitor01']

    monitor_ref01_data = (await monitor_ref01_ent.create(monitor_ref01_data)).data()
    assert(null != monitor_ref01_data.id)


    // LIST
    const monitor_ref01_match: any = {}

    const monitor_ref01_list = (await monitor_ref01_ent.list(monitor_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(monitor_ref01_list, { id: monitor_ref01_data.id })))


    // UPDATE
    const monitor_ref01_data_up0: any = {}
    monitor_ref01_data_up0.id = monitor_ref01_data.id

    const monitor_ref01_markdef_up0 = { name: 'defaultName', value: 'Mark01-monitor_ref01_' + setup.now }
    ;(monitor_ref01_data_up0 as any)[monitor_ref01_markdef_up0.name] = monitor_ref01_markdef_up0.value

    const monitor_ref01_resdata_up0 = (await monitor_ref01_ent.update(monitor_ref01_data_up0)).data()
    assert(monitor_ref01_resdata_up0.id === monitor_ref01_data_up0.id)

    assert((monitor_ref01_resdata_up0 as any)[monitor_ref01_markdef_up0.name] === monitor_ref01_markdef_up0.value)


    // LOAD
    const monitor_ref01_match_dt0: any = {}
    monitor_ref01_match_dt0.id = monitor_ref01_data.id
    const monitor_ref01_data_dt0 = (await monitor_ref01_ent.load(monitor_ref01_match_dt0)).data()
    assert(monitor_ref01_data_dt0.id === monitor_ref01_data.id)


    // REMOVE
    const monitor_ref01_match_rm0: any = { id: monitor_ref01_data.id }
    await monitor_ref01_ent.remove(monitor_ref01_match_rm0)
  

    // LIST
    const monitor_ref01_match_rt0: any = {}

    const monitor_ref01_list_rt0 = (await monitor_ref01_ent.list(monitor_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(monitor_ref01_list_rt0, { id: monitor_ref01_data.id })))


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
      '../../../../.sdk/test/entity/monitor/MonitorTestData.json')

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
    ['monitor01','monitor02','monitor03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_MONITOR_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_MONITOR_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_MONITOR_ENTID']
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
  
