# Cronitor TypeScript SDK Reference

Complete API reference for the Cronitor TypeScript SDK.


## CronitorSDK

### Constructor

```ts
new CronitorSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.secret` | `string` | API secret for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CronitorSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CronitorSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CronitorSDK` instance in test mode.


### Instance Methods

#### `Aggregate(data?: object)`

Create a new `Aggregate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AggregateEntity` instance.

#### `ApiKey(data?: object)`

Create a new `ApiKey` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiKeyEntity` instance.

#### `Environment(data?: object)`

Create a new `Environment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EnvironmentEntity` instance.

#### `Group(data?: object)`

Create a new `Group` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupEntity` instance.

#### `Integration(data?: object)`

Create a new `Integration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntegrationEntity` instance.

#### `Issue(data?: object)`

Create a new `Issue` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IssueEntity` instance.

#### `MaintenanceWindow(data?: object)`

Create a new `MaintenanceWindow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MaintenanceWindowEntity` instance.

#### `Metric(data?: object)`

Create a new `Metric` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MetricEntity` instance.

#### `Monitor(data?: object)`

Create a new `Monitor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MonitorEntity` instance.

#### `Notification(data?: object)`

Create a new `Notification` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NotificationEntity` instance.

#### `RumError(data?: object)`

Create a new `RumError` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RumErrorEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `Site(data?: object)`

Create a new `Site` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SiteEntity` instance.

#### `StatusPage(data?: object)`

Create a new `StatusPage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatusPageEntity` instance.

#### `StatusPageComponent(data?: object)`

Create a new `StatusPageComponent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatusPageComponentEntity` instance.

#### `Telemetry(data?: object)`

Create a new `Telemetry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TelemetryEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CronitorSDK.test()`.

**Returns:** `CronitorSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## AggregateEntity

```ts
const aggregate = client.Aggregate()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Aggregate().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AggregateEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApiKeyEntity

```ts
const api_key = client.ApiKey()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `string` | Yes |  |
| `id` | `string` | No |  |
| `immutable` | `string` | Yes |  |
| `key` | `string` | Yes |  |
| `kind` | `string` | No | * `telemetry` - Telemetry * `sdk` - SDK Integration * `custom` - Custom |
| `last_used` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `scopes` | `any` | No |  |
| `updated` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ApiKey().create({
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ApiKey().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ApiKey().load({ id: 'api_key_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ApiKey().remove({ id: 'api_key_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ApiKey().update({
  id: 'api_key_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiKeyEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EnvironmentEntity

```ts
const environment = client.Environment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Environment().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Environment().load({ id: 'environment_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Environment().remove({ id: 'environment_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Environment().update({
  id: 'environment_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EnvironmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupEntity

```ts
const group = client.Group()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `pause` | `/api/groups/{key}/pause` | `client.Group().load({ $action: 'pause', ... })` |

An action returns that action's OWN response, which is not necessarily a
Group record — check the API definition for its shape.

```ts
const result = await client.Group().load({
  $action: 'pause',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Group().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Group().load({ id: 'group_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Group().remove({ id: 'group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Group().update({
  id: 'group_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntegrationEntity

```ts
const integration = client.Integration()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `connect` | `/api/integrations/connect` | `client.Integration().create({ $action: 'connect', ... })` |
| `service` | `/api/integrations/services` | `client.Integration().load({ $action: 'service', ... })` |

An action returns that action's OWN response, which is not necessarily a
Integration record — check the API definition for its shape.

```ts
const result = await client.Integration().create({
  $action: 'connect',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Integration().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Integration().load({ token: 'token' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Integration().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntegrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IssueEntity

```ts
const issue = client.Issue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affected_components` | `any[]` | No | Status page component keys. |
| `alerts` | `any[]` | Yes | Present with withAlertDetails=true. |
| `assigned_to` | `string` | No | Email address of the assigned team member. |
| `created` | `string` | Yes |  |
| `created_by` | `any` | Yes |  |
| `duration` | `number` | Yes | Seconds of downtime. |
| `ended` | `string` | Yes |  |
| `environment` | `string` | No | Environment key. |
| `id` | `string` | No |  |
| `key` | `string` | Yes |  |
| `monitors` | `any[]` | Yes | Null unless withMonitorDetails=true, which includes monitor details. |
| `name` | `string` | Yes |  |
| `severity` | `any` | No |  |
| `started` | `string` | No |  |
| `state` | `string` | No | * `unresolved` - unresolved * `investigating` - investigating * `identified` - identified * `monitoring` - monitoring * `resolved` - resolved * `update` - update |
| `statuspages` | `any[]` | No | Status page keys. |
| `updated` | `string` | Yes |  |
| `updates` | `any[]` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `bulk` | `/api/issues/bulk` | `client.Issue().create({ $action: 'bulk', ... })` |

An action returns that action's OWN response, which is not necessarily a
Issue record — check the API definition for its shape.

```ts
const result = await client.Issue().create({
  $action: 'bulk',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Issue().create({
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Issue().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Issue().load({ id: 'issue_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Issue().remove({ id: 'issue_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Issue().update({
  id: 'issue_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IssueEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MaintenanceWindowEntity

```ts
const maintenance_window = client.MaintenanceWindow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `affects_all_monitors` | `boolean` | No |  |
| `affects_statuspage_components` | `boolean` | No |  |
| `all_affected_monitors` | `string` | Yes |  |
| `created` | `string` | Yes |  |
| `description` | `string` | No |  |
| `duration` | `number` | Yes | Returns the total duration of the maintenance window in seconds. |
| `end` | `string` | Yes |  |
| `environment` | `string` | No | Environment key. |
| `groups` | `any[]` | No |  |
| `id` | `string` | No |  |
| `key` | `string` | Yes |  |
| `monitors` | `any[]` | No |  |
| `name` | `string` | Yes |  |
| `start` | `string` | Yes |  |
| `state` | `string` | Yes | Returns whether the window is currently past|ongoing|upcoming. |
| `statuspages` | `any[]` | No | Status page keys. |
| `updated` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | patch | remove |
| --- | --- | --- | --- | --- | --- | --- |
| `affects_all_monitors` | - | - | - | - | - | - |
| `affects_statuspage_components` | - | - | - | - | - | - |
| `all_affected_monitors` | - | - | - | - | - | - |
| `created` | - | - | - | - | - | - |
| `description` | - | - | - | - | - | - |
| `duration` | - | - | - | - | - | - |
| `end` | - | - | - | - | Yes | - |
| `environment` | - | - | - | - | - | - |
| `groups` | - | - | - | - | - | - |
| `id` | - | - | - | - | - | - |
| `key` | - | - | - | - | - | - |
| `monitors` | - | - | - | - | - | - |
| `name` | - | - | - | - | Yes | - |
| `start` | - | - | - | - | Yes | - |
| `state` | - | - | - | - | - | - |
| `statuspages` | - | - | - | - | - | - |
| `updated` | - | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.MaintenanceWindow().create({
  end: 'example_end',
  name: 'example_name',
  start: 'example_start',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.MaintenanceWindow().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.MaintenanceWindow().load({ id: 'maintenance_window_id' })
```

#### `patch(data: object, ctrl?: object)`

Change part of an existing entity: only the fields given are sent. The data must include the entity `id`. Resolves to the patched entity.

```ts
const result = await client.MaintenanceWindow().patch({
  id: 'maintenance_window_id',
  // Only the fields to change
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.MaintenanceWindow().remove({ id: 'maintenance_window_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.MaintenanceWindow().update({
  id: 'maintenance_window_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MaintenanceWindowEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MetricEntity

```ts
const metric = client.Metric()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Metric().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MetricEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MonitorEntity

```ts
const monitor = client.Monitor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assertions` | `any[]` | No | Assertions such as "response.code = 200" or "metric.queue_depth < 100". |
| `attributes` | `Record<string, any>` | Yes | Values derived from the monitor configuration. |
| `badges` | `Record<string, any>` | Yes |  |
| `consecutive_alert_threshold` | `number` | No |  |
| `created` | `string` | Yes |  |
| `defaultName` | `string` | No |  |
| `defaultNote` | `string` | No |  |
| `disabled` | `boolean` | Yes |  |
| `environments` | `any[]` | No |  |
| `failure_tolerance` | `number` | No | Failures tolerated before an alert. |
| `grace_seconds` | `number` | No | Seconds to wait after a missed or late event before alerting. |
| `group` | `string` | No | Group key. |
| `id` | `string` | No |  |
| `initialized` | `boolean` | Yes | Whether the monitor has received telemetry. |
| `key` | `string` | Yes | Unique monitor key. |
| `latest_event` | `any` | Yes | Present when the request has withStatus=true (the default). |
| `latest_events` | `Record<string, any>` | Yes | Latest event of each kind, keyed by event name. |
| `latest_invocations` | `any[]` | Yes | Present with withInvocations=true. |
| `latest_issue` | `Record<string, any>` | Yes |  |
| `metadata` | `string` | No |  |
| `metric_names` | `any[]` | Yes |  |
| `monitor_list` | `any[]` | No |  |
| `name` | `string` | No |  |
| `next_expected_at` | `number` | Yes | Unix timestamp of the next scheduled run. |
| `note` | `string` | No |  |
| `notify` | `any` | No | Notification list keys or inline destinations such as "email:ops@example.com". |
| `passing` | `boolean` | Yes | Present when the request has withStatus=true (the default). |
| `paused` | `boolean` | Yes |  |
| `paused_until` | `string` | Yes |  |
| `platform` | `string` | No |  |
| `realert_interval` | `any` | No | How often to repeat an alert, for example "8 hours", or seconds. |
| `request` | `Record<string, any>` | No | The request a check monitor makes. |
| `running` | `boolean` | Yes | Present when the request has withStatus=true (the default). |
| `schedule_tolerance` | `number` | No | Missed runs tolerated before an alert. |
| `schedules` | `any[]` | No | Cron expressions, intervals such as "every 5 minutes", or RRULEs. |
| `site` | `string` | No | RUM site key. |
| `statuspages` | `any[]` | No | Status page keys. |
| `tags` | `any[]` | No |  |
| `timezone` | `string` | No | IANA timezone. |
| `tolerated_failures` | `number` | No | Use failure_tolerance. |
| `type` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `assertions` | - | - | - | - | - |
| `attributes` | - | - | - | - | - |
| `badges` | - | - | - | - | - |
| `consecutive_alert_threshold` | - | - | - | - | - |
| `created` | - | - | - | - | - |
| `defaultName` | - | - | - | - | - |
| `defaultNote` | - | - | - | - | - |
| `disabled` | - | - | - | - | - |
| `environments` | - | - | - | - | - |
| `failure_tolerance` | - | - | - | - | - |
| `grace_seconds` | - | - | - | - | - |
| `group` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `initialized` | - | - | - | - | - |
| `key` | Yes | Yes | Yes | - | - |
| `latest_event` | - | - | - | - | - |
| `latest_events` | - | - | - | - | - |
| `latest_invocations` | - | - | - | - | - |
| `latest_issue` | - | - | - | - | - |
| `metadata` | - | - | - | - | - |
| `metric_names` | - | - | - | - | - |
| `monitor_list` | - | - | - | - | - |
| `name` | - | - | - | - | - |
| `next_expected_at` | - | - | - | - | - |
| `note` | - | - | - | - | - |
| `notify` | - | - | - | - | - |
| `passing` | - | - | - | - | - |
| `paused` | Yes | Yes | Yes | - | - |
| `paused_until` | - | - | - | - | - |
| `platform` | - | - | - | - | - |
| `realert_interval` | - | - | - | - | - |
| `request` | - | - | - | - | - |
| `running` | - | - | - | - | - |
| `schedule_tolerance` | - | - | - | - | - |
| `schedules` | - | - | - | - | - |
| `site` | - | - | - | - | - |
| `statuspages` | - | - | - | - | - |
| `tags` | - | - | - | - | - |
| `timezone` | - | - | - | - | - |
| `tolerated_failures` | - | - | - | - | - |
| `type` | - | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `clone` | `/api/monitors/clone` | `client.Monitor().create({ $action: 'clone', ... })` |
| `pause` | `/api/monitors/{code}/pause` | `client.Monitor().load({ $action: 'pause', ... })` |

An action returns that action's OWN response, which is not necessarily a
Monitor record — check the API definition for its shape.

```ts
const result = await client.Monitor().create({
  $action: 'clone',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Monitor().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Monitor().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Monitor().load({ id: 'monitor_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Monitor().remove({ id: 'monitor_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Monitor().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MonitorEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NotificationEntity

```ts
const notification = client.Notification()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Notification().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Notification().load({ id: 'notification_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Notification().remove({ id: 'notification_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Notification().update({
  id: 'notification_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NotificationEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RumErrorEntity

```ts
const rum_error = client.RumError()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `colno` | `number` | Yes |  |
| `created` | `string` | Yes |  |
| `environment` | `string` | Yes | Environment key. |
| `error_type` | `string` | Yes |  |
| `filename` | `string` | Yes |  |
| `first_seen` | `string` | Yes |  |
| `ignored` | `boolean` | No |  |
| `key` | `string` | Yes |  |
| `last_seen` | `string` | Yes |  |
| `latest_event` | `string` | Yes |  |
| `lineno` | `number` | Yes |  |
| `message` | `string` | Yes |  |
| `occurrences` | `number` | Yes |  |
| `site` | `string` | Yes | RUM site key. |
| `updated` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.RumError().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.RumError().load({ key: 'key' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RumErrorEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Search().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SiteEntity

```ts
const site = client.Site()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `client_key` | `string` | Yes |  |
| `country_code_denylist` | `string` | No |  |
| `created` | `string` | Yes |  |
| `errors_enabled` | `boolean` | No |  |
| `exclude_internal_referrers` | `boolean` | No |  |
| `filter_bots` | `boolean` | No |  |
| `filter_browser_extensions` | `boolean` | No |  |
| `filter_localhost` | `boolean` | No |  |
| `id` | `string` | No |  |
| `ingestion_enabled` | `boolean` | Yes |  |
| `ip_denylist` | `string` | No |  |
| `key` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `origin_allowlist` | `string` | No |  |
| `path_denylist` | `string` | No |  |
| `public_report_enabled` | `boolean` | No |  |
| `public_report_key` | `string` | Yes |  |
| `sampling` | `number` | No |  |
| `snippet` | `string` | Yes |  |
| `updated` | `string` | Yes |  |
| `webvitals_enabled` | `boolean` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `query` | `/api/sites/query` | `client.Site().create({ $action: 'query', ... })` |

An action returns that action's OWN response, which is not necessarily a
Site record — check the API definition for its shape.

```ts
const result = await client.Site().create({
  $action: 'query',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Site().create({
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Site().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Site().load({ id: 'site_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Site().remove({ id: 'site_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Site().update({
  id: 'site_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SiteEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatusPageEntity

```ts
const status_page = client.StatusPage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | `string` | No | * `public` - public * `password` - password |
| `allow_search_index` | `boolean` | No |  |
| `auth_secret` | `string` | Yes |  |
| `badge_url_dark` | `string` | Yes |  |
| `badge_url_light` | `string` | Yes |  |
| `components` | `string` | Yes |  |
| `components_count` | `string` | Yes |  |
| `created` | `string` | Yes |  |
| `custom_domain` | `string` | No |  |
| `default_time_period` | `string` | No | * `24h` - 24h * `7d` - 7d * `30d` - 30d * `90d` - 90d |
| `enable_dark_mode` | `boolean` | No |  |
| `enable_performance_metrics` | `boolean` | No |  |
| `environment` | `string` | No | Environment key. |
| `hosted_subdomain` | `string` | Yes |  |
| `ip_allowlist` | `string` | No |  |
| `key` | `string` | Yes |  |
| `logo_url` | `string` | No |  |
| `metadata` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `password` | `string` | No |  |
| `status` | `string` | Yes |  |
| `support_url` | `string` | No |  |
| `updated` | `string` | Yes |  |
| `website_url` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.StatusPage().create({
  hosted_subdomain: 'example_hosted_subdomain',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.StatusPage().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.StatusPage().load({ key: 'key' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.StatusPage().remove({ key: 'key' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.StatusPage().update({
  key: 'key',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatusPageEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatusPageComponentEntity

```ts
const status_page_component = client.StatusPageComponent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `autopublish` | `boolean` | No |  |
| `children` | `string` | Yes |  |
| `created` | `string` | Yes |  |
| `description` | `string` | No |  |
| `group` | `string` | No |  |
| `key` | `string` | Yes |  |
| `monitor` | `string` | No |  |
| `name` | `string` | No |  |
| `position` | `string` | No |  |
| `status` | `string` | Yes |  |
| `statuspage` | `string` | No |  |
| `type` | `string` | Yes |  |
| `updated` | `string` | Yes |  |
| `uptime_history` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.StatusPageComponent().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.StatusPageComponent().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.StatusPageComponent().load({ key: 'key' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.StatusPageComponent().remove({ key: 'key' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.StatusPageComponent().update({
  key: 'key',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatusPageComponentEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TelemetryEntity

```ts
const telemetry = client.Telemetry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Telemetry().create({
  api_key: 'example_api_key',
  monitor_key: 'example_monitor_key',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Telemetry().load({ api_key: 'api_key', monitor_key: 'monitor_key' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TelemetryEntity` instance with the same client and
options.

#### `client()`

Return the parent `CronitorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new CronitorSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

