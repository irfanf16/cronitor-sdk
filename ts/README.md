# Cronitor TypeScript SDK



The TypeScript SDK for the Cronitor API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Aggregate()` — each with a small set of operations (`list`, `load`, `create`, `update`, `patch`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/irfanf16/cronitor-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/irfanf16/cronitor-sdk
npm install ./cronitor-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CronitorSDK } from '@irfanf16/cronitor-sdk'

const client = new CronitorSDK({
  apikey: process.env.CRONITOR_APIKEY,
  secret: process.env.CRONITOR_SECRET,
})
```

### 3. Load an aggregate

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const aggregate = await client.Aggregate().load()
  console.log(aggregate.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const telemetry = await client.Telemetry().load({ api_key: "example", monitor_key: "example" })
  console.log(telemetry.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CronitorSDK.test()

const telemetry = await client.Telemetry().load({ api_key: 'example_api_key', monitor_key: 'example_monitor_key' })
// telemetry is the Telemetry entity; .data() reads its mock record
console.log(telemetry.data())
```

You can also use the instance method:

```ts
const client = new CronitorSDK({ apikey: '...', secret: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Telemetry()

// First call runs the operation and stores its result
await entity.load({ api_key: 'example_api_key', monitor_key: 'example_monitor_key' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CronitorSDK({
  apikey: '...',
  secret: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CRONITOR_TEST_LIVE=TRUE
CRONITOR_APIKEY=<your-key>
CRONITOR_SECRET=<your-secret>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### CronitorSDK

#### Constructor

```ts
new CronitorSDK(options?: {
  apikey?: string
  secret?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `secret` | `string` | API secret for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Aggregate(data?)` | `AggregateEntity` | Create an Aggregate entity instance. |
| `ApiKey(data?)` | `ApiKeyEntity` | Create an ApiKey entity instance. |
| `Environment(data?)` | `EnvironmentEntity` | Create an Environment entity instance. |
| `Group(data?)` | `GroupEntity` | Create a Group entity instance. |
| `Integration(data?)` | `IntegrationEntity` | Create an Integration entity instance. |
| `Issue(data?)` | `IssueEntity` | Create an Issue entity instance. |
| `MaintenanceWindow(data?)` | `MaintenanceWindowEntity` | Create a MaintenanceWindow entity instance. |
| `Metric(data?)` | `MetricEntity` | Create a Metric entity instance. |
| `Monitor(data?)` | `MonitorEntity` | Create a Monitor entity instance. |
| `Notification(data?)` | `NotificationEntity` | Create a Notification entity instance. |
| `RumError(data?)` | `RumErrorEntity` | Create a RumError entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Site(data?)` | `SiteEntity` | Create a Site entity instance. |
| `StatusPage(data?)` | `StatusPageEntity` | Create a StatusPage entity instance. |
| `StatusPageComponent(data?)` | `StatusPageComponentEntity` | Create a StatusPageComponent entity instance. |
| `Telemetry(data?)` | `TelemetryEntity` | Create a Telemetry entity instance. |
| `tester(testopts?, sdkopts?)` | `CronitorSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CronitorSDK.test(testopts?, sdkopts?)` | `CronitorSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `patch` | `patch(reqdata?, ctrl?): Promise<Entity>` | Change part of an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CronitorSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create`, `update` and `patch` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Aggregate

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/aggregates`

#### ApiKey

| Field | Description |
| --- | --- |
| `created` |  |
| `id` |  |
| `immutable` |  |
| `key` |  |
| `kind` | * `telemetry` - Telemetry * `sdk` - SDK Integration * `custom` - Custom |
| `last_used` |  |
| `name` |  |
| `scopes` |  |
| `updated` |  |

Operations: create, list, load, remove, update.

API path: `/api/keys`

#### Environment

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, load, remove, update.

API path: `/api/environments`

#### Group

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, load, remove, update.

API path: `/api/groups`

#### Integration

| Field | Description |
| --- | --- |

Operations: create, load, remove.

API path: `/api/integrations`

#### Issue

| Field | Description |
| --- | --- |
| `affected_components` | Status page component keys. |
| `alerts` | Present with withAlertDetails=true. |
| `assigned_to` | Email address of the assigned team member. |
| `created` |  |
| `created_by` |  |
| `duration` | Seconds of downtime. |
| `ended` |  |
| `environment` | Environment key. |
| `id` |  |
| `key` |  |
| `monitors` | Null unless withMonitorDetails=true, which includes monitor details. |
| `name` |  |
| `severity` |  |
| `started` |  |
| `state` | * `unresolved` - unresolved * `investigating` - investigating * `identified` - identified * `monitoring` - monitoring * `resolved` - resolved * `update` - update |
| `statuspages` | Status page keys. |
| `updated` |  |
| `updates` |  |

Operations: create, list, load, remove, update.

API path: `/api/issues`

#### MaintenanceWindow

| Field | Description |
| --- | --- |
| `affects_all_monitors` |  |
| `affects_statuspage_components` |  |
| `all_affected_monitors` |  |
| `created` |  |
| `description` |  |
| `duration` | Returns the total duration of the maintenance window in seconds. |
| `end` |  |
| `environment` | Environment key. |
| `groups` |  |
| `id` |  |
| `key` |  |
| `monitors` |  |
| `name` |  |
| `start` |  |
| `state` | Returns whether the window is currently past|ongoing|upcoming. |
| `statuspages` | Status page keys. |
| `updated` |  |

Operations: create, list, load, patch, remove, update.

API path: `/api/maintenance_windows`

#### Metric

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/metrics`

#### Monitor

| Field | Description |
| --- | --- |
| `assertions` | Assertions such as "response.code = 200" or "metric.queue_depth < 100". |
| `attributes` | Values derived from the monitor configuration. |
| `badges` |  |
| `consecutive_alert_threshold` |  |
| `created` |  |
| `defaultName` |  |
| `defaultNote` |  |
| `disabled` |  |
| `environments` |  |
| `failure_tolerance` | Failures tolerated before an alert. |
| `grace_seconds` | Seconds to wait after a missed or late event before alerting. |
| `group` | Group key. |
| `id` |  |
| `initialized` | Whether the monitor has received telemetry. |
| `key` | Unique monitor key. |
| `latest_event` | Present when the request has withStatus=true (the default). |
| `latest_events` | Latest event of each kind, keyed by event name. |
| `latest_invocations` | Present with withInvocations=true. |
| `latest_issue` |  |
| `metadata` |  |
| `metric_names` |  |
| `monitor_list` |  |
| `name` |  |
| `next_expected_at` | Unix timestamp of the next scheduled run. |
| `note` |  |
| `notify` | Notification list keys or inline destinations such as "email:ops@example.com". |
| `passing` | Present when the request has withStatus=true (the default). |
| `paused` |  |
| `paused_until` |  |
| `platform` |  |
| `realert_interval` | How often to repeat an alert, for example "8 hours", or seconds. |
| `request` | The request a check monitor makes. |
| `running` | Present when the request has withStatus=true (the default). |
| `schedule_tolerance` | Missed runs tolerated before an alert. |
| `schedules` | Cron expressions, intervals such as "every 5 minutes", or RRULEs. |
| `site` | RUM site key. |
| `statuspages` | Status page keys. |
| `tags` |  |
| `timezone` | IANA timezone. |
| `tolerated_failures` | Use failure_tolerance. |
| `type` |  |

Operations: create, list, load, remove, update.

API path: `/api/monitors`

#### Notification

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, load, remove, update.

API path: `/api/notifications`

#### RumError

| Field | Description |
| --- | --- |
| `colno` |  |
| `created` |  |
| `environment` | Environment key. |
| `error_type` |  |
| `filename` |  |
| `first_seen` |  |
| `ignored` |  |
| `key` |  |
| `last_seen` |  |
| `latest_event` |  |
| `lineno` |  |
| `message` |  |
| `occurrences` |  |
| `site` | RUM site key. |
| `updated` |  |

Operations: list, load.

API path: `/api/site_errors`

#### Search

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/search`

#### Site

| Field | Description |
| --- | --- |
| `client_key` |  |
| `country_code_denylist` |  |
| `created` |  |
| `errors_enabled` |  |
| `exclude_internal_referrers` |  |
| `filter_bots` |  |
| `filter_browser_extensions` |  |
| `filter_localhost` |  |
| `id` |  |
| `ingestion_enabled` |  |
| `ip_denylist` |  |
| `key` |  |
| `name` |  |
| `origin_allowlist` |  |
| `path_denylist` |  |
| `public_report_enabled` |  |
| `public_report_key` |  |
| `sampling` |  |
| `snippet` |  |
| `updated` |  |
| `webvitals_enabled` |  |

Operations: create, list, load, remove, update.

API path: `/api/sites`

#### StatusPage

| Field | Description |
| --- | --- |
| `access` | * `public` - public * `password` - password |
| `allow_search_index` |  |
| `auth_secret` |  |
| `badge_url_dark` |  |
| `badge_url_light` |  |
| `components` |  |
| `components_count` |  |
| `created` |  |
| `custom_domain` |  |
| `default_time_period` | * `24h` - 24h * `7d` - 7d * `30d` - 30d * `90d` - 90d |
| `enable_dark_mode` |  |
| `enable_performance_metrics` |  |
| `environment` | Environment key. |
| `hosted_subdomain` |  |
| `ip_allowlist` |  |
| `key` |  |
| `logo_url` |  |
| `metadata` |  |
| `name` |  |
| `password` |  |
| `status` |  |
| `support_url` |  |
| `updated` |  |
| `website_url` |  |

Operations: create, list, load, remove, update.

API path: `/api/statuspages`

#### StatusPageComponent

| Field | Description |
| --- | --- |
| `autopublish` |  |
| `children` |  |
| `created` |  |
| `description` |  |
| `group` |  |
| `key` |  |
| `monitor` |  |
| `name` |  |
| `position` |  |
| `status` |  |
| `statuspage` |  |
| `type` |  |
| `updated` |  |
| `uptime_history` |  |

Operations: create, list, load, remove, update.

API path: `/api/statuspage_components`

#### Telemetry

| Field | Description |
| --- | --- |
| `id` |  |

Operations: create, load.

API path: `/p/{apiKey}/{monitorKey}`



## Entities


### Aggregate

Create an instance: `const aggregate = client.Aggregate()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const aggregate = await client.Aggregate().load()
```


### ApiKey

Create an instance: `const api_key = client.ApiKey()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `string` |  |
| `id` | `string` |  |
| `immutable` | `string` |  |
| `key` | `string` |  |
| `kind` | `string` | * `telemetry` - Telemetry * `sdk` - SDK Integration * `custom` - Custom |
| `last_used` | `string` |  |
| `name` | `string` |  |
| `scopes` | `any` |  |
| `updated` | `string` |  |

#### Example: Load

```ts
const api_key = await client.ApiKey().load({ id: 'api_key_id' })
```

#### Example: List

```ts
const api_keys = await client.ApiKey().list()
```

#### Example: Create

```ts
const api_key = await client.ApiKey().create({
  name: 'example_name',
})
```


### Environment

Create an instance: `const environment = client.Environment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const environment = await client.Environment().load({ id: 'environment_id' })
```

#### Example: Create

```ts
const environment = await client.Environment().create({
})
```


### Group

Create an instance: `const group = client.Group()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const group = await client.Group().load({ id: 'group_id' })
```

#### Example: Create

```ts
const group = await client.Group().create({
})
```


### Integration

Create an instance: `const integration = client.Integration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Example: Load

```ts
const integration = await client.Integration().load({ token: 'token' })
```

#### Example: Create

```ts
const integration = await client.Integration().create({
})
```


### Issue

Create an instance: `const issue = client.Issue()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affected_components` | `any[]` | Status page component keys. |
| `alerts` | `any[]` | Present with withAlertDetails=true. |
| `assigned_to` | `string` | Email address of the assigned team member. |
| `created` | `string` |  |
| `created_by` | `any` |  |
| `duration` | `number` | Seconds of downtime. |
| `ended` | `string` |  |
| `environment` | `string` | Environment key. |
| `id` | `string` |  |
| `key` | `string` |  |
| `monitors` | `any[]` | Null unless withMonitorDetails=true, which includes monitor details. |
| `name` | `string` |  |
| `severity` | `any` |  |
| `started` | `string` |  |
| `state` | `string` | * `unresolved` - unresolved * `investigating` - investigating * `identified` - identified * `monitoring` - monitoring * `resolved` - resolved * `update` - update |
| `statuspages` | `any[]` | Status page keys. |
| `updated` | `string` |  |
| `updates` | `any[]` |  |

#### Example: Load

```ts
const issue = await client.Issue().load({ id: 'issue_id' })
```

#### Example: List

```ts
const issues = await client.Issue().list()
```

#### Example: Create

```ts
const issue = await client.Issue().create({
  name: 'example_name',
})
```


### MaintenanceWindow

Create an instance: `const maintenance_window = client.MaintenanceWindow()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `patch(data)` | Change part of an existing entity. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `affects_all_monitors` | `boolean` |  |
| `affects_statuspage_components` | `boolean` |  |
| `all_affected_monitors` | `string` |  |
| `created` | `string` |  |
| `description` | `string` |  |
| `duration` | `number` | Returns the total duration of the maintenance window in seconds. |
| `end` | `string` |  |
| `environment` | `string` | Environment key. |
| `groups` | `any[]` |  |
| `id` | `string` |  |
| `key` | `string` |  |
| `monitors` | `any[]` |  |
| `name` | `string` |  |
| `start` | `string` |  |
| `state` | `string` | Returns whether the window is currently past|ongoing|upcoming. |
| `statuspages` | `any[]` | Status page keys. |
| `updated` | `string` |  |

#### Example: Load

```ts
const maintenance_window = await client.MaintenanceWindow().load({ id: 'maintenance_window_id' })
```

#### Example: List

```ts
const maintenance_windows = await client.MaintenanceWindow().list()
```

#### Example: Create

```ts
const maintenance_window = await client.MaintenanceWindow().create({
  end: 'example_end',
  name: 'example_name',
  start: 'example_start',
})
```


### Metric

Create an instance: `const metric = client.Metric()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const metric = await client.Metric().load()
```


### Monitor

Create an instance: `const monitor = client.Monitor()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assertions` | `any[]` | Assertions such as "response.code = 200" or "metric.queue_depth < 100". |
| `attributes` | `Record<string, any>` | Values derived from the monitor configuration. |
| `badges` | `Record<string, any>` |  |
| `consecutive_alert_threshold` | `number` |  |
| `created` | `string` |  |
| `defaultName` | `string` |  |
| `defaultNote` | `string` |  |
| `disabled` | `boolean` |  |
| `environments` | `any[]` |  |
| `failure_tolerance` | `number` | Failures tolerated before an alert. |
| `grace_seconds` | `number` | Seconds to wait after a missed or late event before alerting. |
| `group` | `string` | Group key. |
| `id` | `string` |  |
| `initialized` | `boolean` | Whether the monitor has received telemetry. |
| `key` | `string` | Unique monitor key. |
| `latest_event` | `any` | Present when the request has withStatus=true (the default). |
| `latest_events` | `Record<string, any>` | Latest event of each kind, keyed by event name. |
| `latest_invocations` | `any[]` | Present with withInvocations=true. |
| `latest_issue` | `Record<string, any>` |  |
| `metadata` | `string` |  |
| `metric_names` | `any[]` |  |
| `monitor_list` | `any[]` |  |
| `name` | `string` |  |
| `next_expected_at` | `number` | Unix timestamp of the next scheduled run. |
| `note` | `string` |  |
| `notify` | `any` | Notification list keys or inline destinations such as "email:ops@example.com". |
| `passing` | `boolean` | Present when the request has withStatus=true (the default). |
| `paused` | `boolean` |  |
| `paused_until` | `string` |  |
| `platform` | `string` |  |
| `realert_interval` | `any` | How often to repeat an alert, for example "8 hours", or seconds. |
| `request` | `Record<string, any>` | The request a check monitor makes. |
| `running` | `boolean` | Present when the request has withStatus=true (the default). |
| `schedule_tolerance` | `number` | Missed runs tolerated before an alert. |
| `schedules` | `any[]` | Cron expressions, intervals such as "every 5 minutes", or RRULEs. |
| `site` | `string` | RUM site key. |
| `statuspages` | `any[]` | Status page keys. |
| `tags` | `any[]` |  |
| `timezone` | `string` | IANA timezone. |
| `tolerated_failures` | `number` | Use failure_tolerance. |
| `type` | `string` |  |

#### Example: Load

```ts
const monitor = await client.Monitor().load({ id: 'monitor_id' })
```

#### Example: List

```ts
const monitors = await client.Monitor().list()
```

#### Example: Create

```ts
const monitor = await client.Monitor().create({
})
```


### Notification

Create an instance: `const notification = client.Notification()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const notification = await client.Notification().load({ id: 'notification_id' })
```

#### Example: Create

```ts
const notification = await client.Notification().create({
})
```


### RumError

Create an instance: `const rum_error = client.RumError()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `colno` | `number` |  |
| `created` | `string` |  |
| `environment` | `string` | Environment key. |
| `error_type` | `string` |  |
| `filename` | `string` |  |
| `first_seen` | `string` |  |
| `ignored` | `boolean` |  |
| `key` | `string` |  |
| `last_seen` | `string` |  |
| `latest_event` | `string` |  |
| `lineno` | `number` |  |
| `message` | `string` |  |
| `occurrences` | `number` |  |
| `site` | `string` | RUM site key. |
| `updated` | `string` |  |

#### Example: Load

```ts
const rum_error = await client.RumError().load({ key: 'key' })
```

#### Example: List

```ts
const rum_errors = await client.RumError().list()
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const search = await client.Search().load()
```


### Site

Create an instance: `const site = client.Site()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `client_key` | `string` |  |
| `country_code_denylist` | `string` |  |
| `created` | `string` |  |
| `errors_enabled` | `boolean` |  |
| `exclude_internal_referrers` | `boolean` |  |
| `filter_bots` | `boolean` |  |
| `filter_browser_extensions` | `boolean` |  |
| `filter_localhost` | `boolean` |  |
| `id` | `string` |  |
| `ingestion_enabled` | `boolean` |  |
| `ip_denylist` | `string` |  |
| `key` | `string` |  |
| `name` | `string` |  |
| `origin_allowlist` | `string` |  |
| `path_denylist` | `string` |  |
| `public_report_enabled` | `boolean` |  |
| `public_report_key` | `string` |  |
| `sampling` | `number` |  |
| `snippet` | `string` |  |
| `updated` | `string` |  |
| `webvitals_enabled` | `boolean` |  |

#### Example: Load

```ts
const site = await client.Site().load({ id: 'site_id' })
```

#### Example: List

```ts
const sites = await client.Site().list()
```

#### Example: Create

```ts
const site = await client.Site().create({
  name: 'example_name',
})
```


### StatusPage

Create an instance: `const status_page = client.StatusPage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access` | `string` | * `public` - public * `password` - password |
| `allow_search_index` | `boolean` |  |
| `auth_secret` | `string` |  |
| `badge_url_dark` | `string` |  |
| `badge_url_light` | `string` |  |
| `components` | `string` |  |
| `components_count` | `string` |  |
| `created` | `string` |  |
| `custom_domain` | `string` |  |
| `default_time_period` | `string` | * `24h` - 24h * `7d` - 7d * `30d` - 30d * `90d` - 90d |
| `enable_dark_mode` | `boolean` |  |
| `enable_performance_metrics` | `boolean` |  |
| `environment` | `string` | Environment key. |
| `hosted_subdomain` | `string` |  |
| `ip_allowlist` | `string` |  |
| `key` | `string` |  |
| `logo_url` | `string` |  |
| `metadata` | `string` |  |
| `name` | `string` |  |
| `password` | `string` |  |
| `status` | `string` |  |
| `support_url` | `string` |  |
| `updated` | `string` |  |
| `website_url` | `string` |  |

#### Example: Load

```ts
const status_page = await client.StatusPage().load({ key: 'key' })
```

#### Example: List

```ts
const status_pages = await client.StatusPage().list()
```

#### Example: Create

```ts
const status_page = await client.StatusPage().create({
  hosted_subdomain: 'example_hosted_subdomain',
  name: 'example_name',
})
```


### StatusPageComponent

Create an instance: `const status_page_component = client.StatusPageComponent()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `autopublish` | `boolean` |  |
| `children` | `string` |  |
| `created` | `string` |  |
| `description` | `string` |  |
| `group` | `string` |  |
| `key` | `string` |  |
| `monitor` | `string` |  |
| `name` | `string` |  |
| `position` | `string` |  |
| `status` | `string` |  |
| `statuspage` | `string` |  |
| `type` | `string` |  |
| `updated` | `string` |  |
| `uptime_history` | `string` |  |

#### Example: Load

```ts
const status_page_component = await client.StatusPageComponent().load({ key: 'key' })
```

#### Example: List

```ts
const status_page_components = await client.StatusPageComponent().list()
```

#### Example: Create

```ts
const status_page_component = await client.StatusPageComponent().create({
})
```


### Telemetry

Create an instance: `const telemetry = client.Telemetry()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const telemetry = await client.Telemetry().load({ api_key: 'api_key', monitor_key: 'monitor_key' })
```

#### Example: Create

```ts
const telemetry = await client.Telemetry().create({
  api_key: 'example_api_key',
  monitor_key: 'example_monitor_key',
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
cronitor/
├── src/
│   ├── CronitorSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CronitorSDK } from '@irfanf16/cronitor-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const telemetry = client.Telemetry()
await telemetry.load({ api_key: "example", monitor_key: "example" })

// telemetry.data() now returns the telemetry data from the last `load`
// telemetry.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
