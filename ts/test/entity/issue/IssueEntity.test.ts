

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


describe('IssueEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CRONITOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CRONITOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CronitorSDK.test()
    const ent = testsdk.Issue()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('issue hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CronitorSDK.test(offline).Issue().stream('list')) { }
    }, /offline/)

    for await (const _item of CronitorSDK.test(offline).Issue()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CronitorSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Issue().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CronitorSDK.test().Issue().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CronitorSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Issue().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Issue().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CronitorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Issue().list({"env":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CRONITOR_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'issue.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"affected_components":{"a":true,"h":"Affected Components","n":"affected_components","r":false,"sh":"Status page component keys.","t":"`$ARRAY`","key$":"affected_components","index$":0},"alerts":{"a":true,"h":"Alerts","n":"alerts","r":true,"ro":true,"sh":"Present with withAlertDetails=true.","t":"`$ARRAY`","key$":"alerts","index$":1},"assigned_to":{"a":true,"fo":"email","h":"Assigned To","n":"assigned_to","r":false,"sh":"Email address of the assigned team member.","t":"`$STRING`","key$":"assigned_to","index$":2},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":true,"ro":true,"t":"`$STRING`","key$":"created","index$":3},"created_by":{"a":true,"h":"Created By","n":"created_by","r":true,"ro":true,"t":"`$ANY`","key$":"created_by","index$":4},"duration":{"a":true,"h":"Duration","n":"duration","r":true,"ro":true,"sh":"Seconds of downtime.","t":"`$INTEGER`","key$":"duration","index$":5},"ended":{"a":true,"fo":"date-time","h":"Ended","n":"ended","r":true,"ro":true,"t":"`$STRING`","key$":"ended","index$":6},"environment":{"a":true,"h":"Environment","n":"environment","r":false,"sh":"Environment key.","t":"`$STRING`","key$":"environment","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":8},"key":{"a":true,"h":"Key","n":"key","r":true,"ro":true,"t":"`$STRING`","key$":"key","index$":9},"monitors":{"a":true,"h":"Monitors","n":"monitors","r":true,"ro":true,"sh":"Null unless withMonitorDetails=true, which includes monitor details.","t":"`$ARRAY`","key$":"monitors","index$":10},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":11},"severity":{"a":true,"h":"Severity","n":"severity","r":false,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"severity","index$":12},"started":{"a":true,"fo":"date-time","h":"Started","n":"started","r":false,"t":"`$STRING`","key$":"started","index$":13},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"* `unresolved` - unresolved * `investigating` - investigating * `identified` - identified * `monitoring` - monitoring * `resolved` - resolved * `update` - update","t":"`$STRING`","key$":"state","index$":14},"statuspages":{"a":true,"h":"Statuspages","n":"statuspages","r":false,"sh":"Status page keys.","t":"`$ARRAY`","key$":"statuspages","index$":15},"updated":{"a":true,"fo":"date-time","h":"Updated","n":"updated","r":true,"ro":true,"t":"`$STRING`","key$":"updated","index$":16},"updates":{"a":true,"h":"Updates","n":"updates","r":false,"t":"`$ARRAY`","key$":"updates","index$":17}},"id":{"field":"id","name":"id"},"name":"issue","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["affected_components","assigned_to","environment","name","severity","started","state","statuspages","updates"],"co":{"id":"POST /api/issues","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"with_alert_detail","or":"withAlertDetails","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"with_component_detail","or":"withComponentDetails","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"with_environment_detail","or":"withEnvironmentDetails","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"with_monitor_detail","or":"withMonitorDetails","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"with_status_page_detail","or":"withStatusPageDetails","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"POST","o":"/api/issues","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"issues"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["action","assign_to","issues","state"],"co":{"id":"POST /api/issues/bulk","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/issues/bulk","q":{"$action":"bulk"},"r":{},"s":[{"lit":"api"},{"lit":"issues"},{"lit":"bulk"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/issues","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"check","or":"check","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"k":"query","n":"component","or":"component","r":false,"t":"`$ARRAY`","index$":1},{"a":true,"k":"query","n":"env","or":"env","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"group","or":"group","r":false,"t":"`$ARRAY`","index$":3},{"a":true,"k":"query","n":"heartbeat","or":"heartbeat","r":false,"t":"`$ARRAY`","index$":4},{"a":true,"k":"query","n":"job","or":"job","r":false,"t":"`$ARRAY`","index$":5},{"a":true,"k":"query","n":"order_by","or":"orderBy","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"severity","or":"severity","r":false,"t":"`$ARRAY`","index$":10},{"a":true,"k":"query","n":"site","or":"site","r":false,"t":"`$ARRAY`","index$":11},{"a":true,"k":"query","n":"state","or":"state","r":false,"t":"`$ARRAY`","index$":12},{"a":true,"k":"query","n":"statuspage","or":"statuspage","r":false,"t":"`$STRING`","index$":13},{"a":true,"k":"query","n":"tag","or":"tag","r":false,"t":"`$ARRAY`","index$":14},{"a":true,"k":"query","n":"time","or":"time","r":false,"t":"`$STRING`","index$":15},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ARRAY`","index$":16},{"a":true,"k":"query","n":"with_alert_detail","or":"withAlertDetails","r":false,"t":"`$BOOLEAN`","index$":17},{"a":true,"k":"query","n":"with_component_detail","or":"withComponentDetails","r":false,"t":"`$BOOLEAN`","index$":18},{"a":true,"k":"query","n":"with_environment_detail","or":"withEnvironmentDetails","r":false,"t":"`$BOOLEAN`","index$":19},{"a":true,"k":"query","n":"with_monitor_detail","or":"withMonitorDetails","r":false,"t":"`$BOOLEAN`","index$":20},{"a":true,"k":"query","n":"with_status_page_detail","or":"withStatusPageDetails","r":false,"t":"`$BOOLEAN`","index$":21},{"a":true,"k":"query","n":"with_summary","or":"withSummary","r":false,"t":"`$BOOLEAN`","index$":22}]},"k":"http","m":"GET","o":"/api/issues","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"issues"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/issues/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"with_alert_detail","or":"withAlertDetails","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"with_component_detail","or":"withComponentDetails","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"with_environment_detail","or":"withEnvironmentDetails","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"with_monitor_detail","or":"withMonitorDetails","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"with_status_page_detail","or":"withStatusPageDetails","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"GET","o":"/api/issues/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"issues"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/issues/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/issues/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"s":[{"lit":"api"},{"lit":"issues"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["affected_components","assigned_to","environment","name","severity","started","state","statuspages","updates"],"co":{"id":"PUT /api/issues/{key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"cronitor_version","or":"Cronitor-Version","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"key","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"with_alert_detail","or":"withAlertDetails","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"with_component_detail","or":"withComponentDetails","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"with_environment_detail","or":"withEnvironmentDetails","r":false,"t":"`$BOOLEAN`","index$":2},{"a":true,"k":"query","n":"with_monitor_detail","or":"withMonitorDetails","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"with_status_page_detail","or":"withStatusPageDetails","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"PUT","o":"/api/issues/{key}","q":{"exist":["id"]},"r":{"param":{"key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"issues"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"issue","name__orig":"issue","Name":"Issue","name_":"issue","name-":"issue","NAME":"ISSUE","index$":5}, {"active":true,"entity":"issue","key$":"BasicIssueFlow","kind":"basic","name":"BasicIssueFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"issue_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"issue_ref01"}}]},{"a":true,"d":{},"i":{"ref":"issue_ref01","srcdatavar":"issue_ref01_data","suffix":"_up0","textfield":"assigned_to"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-issue_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"issue_ref01","srcdatavar":"issue_ref01_data","suffix":"_dt0"},"m":{"id":"issue01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-issue_ref01"}}]},{"a":true,"d":{},"i":{"ref":"issue_ref01","suffix":"_rm0"},"m":{"id":"issue01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"issue_ref01"}}]}]}, 'Issue', {"POST /api/issues":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"key$":"name"},"severity":{"nullable":true,"oneOf":[{"enum":["missing_data","operational","maintenance","degraded_performance","minor_outage","outage"],"type":"string","description":"* `missing_data` - missing_data\n* `operational` - operational\n* `maintenance` - maintenance\n* `degraded_performance` - degraded_performance\n* `minor_outage` - minor_outage\n* `outage` - outage","x-ref":"#/components/schemas/SeverityEnum"},{"enum":[null],"x-ref":"#/components/schemas/NullEnum"}],"key$":"severity"},"state":{"enum":["unresolved","investigating","identified","monitoring","resolved","update"],"type":"string","description":"* `unresolved` - unresolved\n* `investigating` - investigating\n* `identified` - identified\n* `monitoring` - monitoring\n* `resolved` - resolved\n* `update` - update","x-ref":"#/components/schemas/StateEnum","key$":"state"},"updates":{"type":"array","items":{"type":"object","properties":{"key":{"type":"string","minLength":1},"timestamp":{"type":"string","format":"date-time"},"message":{"type":"string","maxLength":2048},"state":{"enum":[],"type":"string","description":"* `unresolved` - unresolved\n* `investigating` - investigating\n* `identified` - identified\n* `monitoring` - monitoring\n* `resolved` - resolved\n* `update` - update","x-ref":"#/components/schemas/StateEnum"},"created_by":{"type":"string","format":"email","nullable":true}},"x-ref":"#/components/schemas/IncidentUpdateRequest"},"key$":"updates"},"started":{"type":"string","format":"date-time","key$":"started"},"statuspages":{"type":"array","items":{"type":"string"},"description":"Status page keys.","key$":"statuspages"},"affected_components":{"type":"array","items":{"type":"string"},"description":"Status page component keys.","key$":"affected_components"},"environment":{"type":"string","description":"Environment key.","key$":"environment"},"assigned_to":{"type":"string","format":"email","nullable":true,"description":"Email address of the assigned team member.","key$":"assigned_to"}},"required":["name"],"x-ref":"#/components/schemas/IssueRequest","index$":1}}},"required":true},"parameters":[{"in":"query","name":"withAlertDetails","schema":{"type":"boolean"},"description":"Include alerts.","index$":0},{"in":"query","name":"withComponentDetails","schema":{"type":"boolean"},"description":"Expand affected_components.","index$":1},{"in":"query","name":"withEnvironmentDetails","schema":{"type":"boolean"},"description":"Expand environment.","index$":2},{"in":"query","name":"withMonitorDetails","schema":{"type":"boolean"},"description":"Include monitor details.","index$":3},{"in":"query","name":"withStatusPageDetails","schema":{"type":"boolean"},"description":"Expand statuspages.","index$":4},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":5}]},"POST /api/issues/bulk":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"action":{"enum":["assign_to","change_state","delete"],"type":"string","description":"* `assign_to` - assign_to\n* `change_state` - change_state\n* `delete` - delete","x-ref":"#/components/schemas/ActionEnum"},"issues":{"type":"array","items":{"type":"string"},"description":"Issue keys."},"state":{"enum":["unresolved","investigating","identified","monitoring","resolved","update"],"type":"string","description":"* `unresolved` - unresolved\n* `investigating` - investigating\n* `identified` - identified\n* `monitoring` - monitoring\n* `resolved` - resolved\n* `update` - update","x-ref":"#/components/schemas/StateEnum"},"assign_to":{"type":"string","format":"email","nullable":true,"description":"Email address of the assigned team member."}},"required":["action","issues"],"x-ref":"#/components/schemas/IssueBulkActionsRequest"}}},"required":true},"parameters":[{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":0}]},"GET /api/issues":{"protocol":"http","parameters":[{"in":"query","name":"check","schema":{"type":"array","items":{"type":"string"}},"description":"Check monitor keys.","index$":0},{"in":"query","name":"component","schema":{"type":"array","items":{"type":"string"}},"description":"Status page component keys.","index$":1},{"in":"query","name":"env","schema":{"type":"string"},"description":"Environment key.","index$":2},{"in":"query","name":"group","schema":{"type":"array","items":{"type":"string"}},"description":"Monitor group keys.","index$":3},{"in":"query","name":"heartbeat","schema":{"type":"array","items":{"type":"string"}},"description":"Heartbeat monitor keys.","index$":4},{"in":"query","name":"job","schema":{"type":"array","items":{"type":"string"}},"description":"Monitor keys.","index$":5},{"in":"query","name":"orderBy","schema":{"type":"string","enum":["-relevance","-started","relevance","started"]},"description":"Sort order.","index$":6},{"name":"page","required":false,"in":"query","description":"A page number within the paginated result set.","schema":{"type":"integer"},"index$":7},{"name":"pageSize","required":false,"in":"query","description":"Number of results to return per page.","schema":{"type":"integer"},"index$":8},{"in":"query","name":"search","schema":{"type":"string"},"description":"Search issue names and monitor names, keys, and codes.","index$":9},{"in":"query","name":"severity","schema":{"type":"array","items":{"type":"string","nullable":true,"enum":["degraded_performance","maintenance","minor_outage","missing_data","operational","outage"]}},"description":"* `missing_data` - missing_data\n* `operational` - operational\n* `maintenance` - maintenance\n* `degraded_performance` - degraded_performance\n* `minor_outage` - minor_outage\n* `outage` - outage","explode":true,"style":"form","index$":10},{"in":"query","name":"site","schema":{"type":"array","items":{"type":"string"}},"description":"Site monitor keys.","index$":11},{"in":"query","name":"state","schema":{"type":"array","items":{"type":"string","enum":["identified","investigating","monitoring","resolved","unresolved","unresolved","update"]}},"description":"* `unresolved` - unresolved\n* `investigating` - investigating\n* `identified` - identified\n* `monitoring` - monitoring\n* `resolved` - resolved\n* `update` - update\n* `unresolved` - unresolved","explode":true,"style":"form","index$":12},{"in":"query","name":"statuspage","schema":{"type":"string"},"index$":13},{"in":"query","name":"tag","schema":{"type":"array","items":{"type":"string"}},"description":"Monitor tags.","index$":14},{"in":"query","name":"time","schema":{"type":"string"},"description":"Time range, for example 24h, 7d, or 30d.","index$":15},{"in":"query","name":"type","schema":{"type":"array","items":{"type":"string"}},"description":"Monitor types.","index$":16},{"in":"query","name":"withAlertDetails","schema":{"type":"boolean"},"description":"Include alerts.","index$":17},{"in":"query","name":"withComponentDetails","schema":{"type":"boolean"},"description":"Expand affected_components.","index$":18},{"in":"query","name":"withEnvironmentDetails","schema":{"type":"boolean"},"description":"Expand environment.","index$":19},{"in":"query","name":"withMonitorDetails","schema":{"type":"boolean"},"description":"Include monitor details.","index$":20},{"in":"query","name":"withStatusPageDetails","schema":{"type":"boolean"},"description":"Expand statuspages.","index$":21},{"in":"query","name":"withSummary","schema":{"type":"boolean"},"description":"Return a shorter summary of each issue.","index$":22},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":23}]},"GET /api/issues/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"in":"query","name":"withAlertDetails","schema":{"type":"boolean"},"description":"Include alerts.","index$":1},{"in":"query","name":"withComponentDetails","schema":{"type":"boolean"},"description":"Expand affected_components.","index$":2},{"in":"query","name":"withEnvironmentDetails","schema":{"type":"boolean"},"description":"Expand environment.","index$":3},{"in":"query","name":"withMonitorDetails","schema":{"type":"boolean"},"description":"Include monitor details.","index$":4},{"in":"query","name":"withStatusPageDetails","schema":{"type":"boolean"},"description":"Expand statuspages.","index$":5},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":6}]},"DELETE /api/issues/{key}":{"protocol":"http","parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":1}]},"PUT /api/issues/{key}":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","minLength":1,"key$":"name"},"severity":{"nullable":true,"oneOf":[{"enum":["missing_data","operational","maintenance","degraded_performance","minor_outage","outage"],"type":"string","description":"* `missing_data` - missing_data\n* `operational` - operational\n* `maintenance` - maintenance\n* `degraded_performance` - degraded_performance\n* `minor_outage` - minor_outage\n* `outage` - outage","x-ref":"#/components/schemas/SeverityEnum"},{"enum":[null],"x-ref":"#/components/schemas/NullEnum"}],"key$":"severity"},"state":{"enum":["unresolved","investigating","identified","monitoring","resolved","update"],"type":"string","description":"* `unresolved` - unresolved\n* `investigating` - investigating\n* `identified` - identified\n* `monitoring` - monitoring\n* `resolved` - resolved\n* `update` - update","x-ref":"#/components/schemas/StateEnum","key$":"state"},"updates":{"type":"array","items":{"type":"object","properties":{"key":{"type":"string","minLength":1},"timestamp":{"type":"string","format":"date-time"},"message":{"type":"string","maxLength":2048},"state":{"enum":[],"type":"string","description":"* `unresolved` - unresolved\n* `investigating` - investigating\n* `identified` - identified\n* `monitoring` - monitoring\n* `resolved` - resolved\n* `update` - update","x-ref":"#/components/schemas/StateEnum"},"created_by":{"type":"string","format":"email","nullable":true}},"x-ref":"#/components/schemas/IncidentUpdateRequest"},"key$":"updates"},"started":{"type":"string","format":"date-time","key$":"started"},"statuspages":{"type":"array","items":{"type":"string"},"description":"Status page keys.","key$":"statuspages"},"affected_components":{"type":"array","items":{"type":"string"},"description":"Status page component keys.","key$":"affected_components"},"environment":{"type":"string","description":"Environment key.","key$":"environment"},"assigned_to":{"type":"string","format":"email","nullable":true,"description":"Email address of the assigned team member.","key$":"assigned_to"}},"required":["name"],"x-ref":"#/components/schemas/IssueRequest","index$":1}}},"required":true},"parameters":[{"in":"path","name":"key","schema":{"type":"string","pattern":"^[A-Za-z0-9]{16}$"},"required":true,"index$":0},{"in":"query","name":"withAlertDetails","schema":{"type":"boolean"},"description":"Include alerts.","index$":1},{"in":"query","name":"withComponentDetails","schema":{"type":"boolean"},"description":"Expand affected_components.","index$":2},{"in":"query","name":"withEnvironmentDetails","schema":{"type":"boolean"},"description":"Expand environment.","index$":3},{"in":"query","name":"withMonitorDetails","schema":{"type":"boolean"},"description":"Include monitor details.","index$":4},{"in":"query","name":"withStatusPageDetails","schema":{"type":"boolean"},"description":"Expand statuspages.","index$":5},{"name":"Cronitor-Version","in":"header","required":false,"description":"API version. These schemas describe 2025-11-28. Requests without the header get 2020-10-01. https://cronitor.io/docs/api#versioning","schema":{"type":"string","enum":["2025-11-28","2020-10-01"]},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const issue_ref01_ent = client.Issue()
    let issue_ref01_data = setup.data.new.issue['issue_ref01']

    issue_ref01_data = (await issue_ref01_ent.create(issue_ref01_data)).data()
    assert(null != issue_ref01_data.id)


    // LIST
    const issue_ref01_match: any = {}

    const issue_ref01_list = (await issue_ref01_ent.list(issue_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(issue_ref01_list, { id: issue_ref01_data.id })))


    // UPDATE
    const issue_ref01_data_up0: any = {}
    issue_ref01_data_up0.id = issue_ref01_data.id

    const issue_ref01_markdef_up0 = { name: 'assigned_to', value: 'Mark01-issue_ref01_' + setup.now }
    ;(issue_ref01_data_up0 as any)[issue_ref01_markdef_up0.name] = issue_ref01_markdef_up0.value

    const issue_ref01_resdata_up0 = (await issue_ref01_ent.update(issue_ref01_data_up0)).data()
    assert(issue_ref01_resdata_up0.id === issue_ref01_data_up0.id)

    assert((issue_ref01_resdata_up0 as any)[issue_ref01_markdef_up0.name] === issue_ref01_markdef_up0.value)


    // LOAD
    const issue_ref01_match_dt0: any = {}
    issue_ref01_match_dt0.id = issue_ref01_data.id
    const issue_ref01_data_dt0 = (await issue_ref01_ent.load(issue_ref01_match_dt0)).data()
    assert(issue_ref01_data_dt0.id === issue_ref01_data.id)


    // REMOVE
    const issue_ref01_match_rm0: any = { id: issue_ref01_data.id }
    await issue_ref01_ent.remove(issue_ref01_match_rm0)
  

    // LIST
    const issue_ref01_match_rt0: any = {}

    const issue_ref01_list_rt0 = (await issue_ref01_ent.list(issue_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(issue_ref01_list_rt0, { id: issue_ref01_data.id })))


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
      '../../../../.sdk/test/entity/issue/IssueTestData.json')

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
    ['issue01','issue02','issue03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CRONITOR_TEST_ISSUE_ENTID': idmap,
    'CRONITOR_TEST_LIVE': 'FALSE',
    'CRONITOR_TEST_EXPLAIN': 'FALSE',
    'CRONITOR_APIKEY': '',
    'CRONITOR_SECRET': '',
  })

  idmap = env['CRONITOR_TEST_ISSUE_ENTID']

  const live = 'TRUE' === env.CRONITOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CRONITOR_TEST_ISSUE_ENTID']
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
  
