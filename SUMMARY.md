# Cronitor API

Monitor cron jobs, heartbeats, websites, and APIs, and manage alerts, issues, status pages, and Real User Monitoring sites. Reference: https://cronitor.io/docs/api

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 72 HTTP routes. There are 1 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Aggregate

Results: Response schema not yet published. See https://cronitor.io/docs/metrics-api.

SDK operations: `load`.

### ApiKey

Results: No response body.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `kind`: * `telemetry` - Telemetry * `sdk` - SDK Integration * `custom` - Custom

### Environment

Results: Response schema not yet published. See https://cronitor.io/docs/environments-api; No response body.

SDK operations: `create`, `load`, `remove`, `update`.

### Group

Results: Response schema not yet published. See https://cronitor.io/docs/groups-api; No response body.

SDK operations: `create`, `load`, `remove`, `update`.

### Integration

Results: Response schema not yet published. See https://cronitor.io/docs/integrations-api; No response body.

SDK operations: `create`, `load`, `remove`.

### Issue

Results: Response schema not yet published. See https://cronitor.io/docs/issues-api; No response body.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `affected_components`: Status page component keys.
- `alerts`: Present with withAlertDetails=true.
- `assigned_to`: Email address of the assigned team member.
- `duration`: Seconds of downtime.
- `environment`: Environment key.

### MaintenanceWindow

Results: No response body.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `duration`: Returns the total duration of the maintenance window in seconds.
- `environment`: Environment key.
- `state`: Returns whether the window is currently past|ongoing|upcoming.
- `statuspages`: Status page keys.

### Metric

Results: Response schema not yet published. See https://cronitor.io/docs/metrics-api.

SDK operations: `load`.

### Monitor

Results: Deleted.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `assertions`: Assertions such as &quot;response.code = 200&quot; or &quot;metric.`queue_depth` &lt; 100&quot;.
- `attributes`: Values derived from the monitor configuration.
- `failure_tolerance`: Failures tolerated before an alert. Default 0.
- `grace_seconds`: Seconds to wait after a missed or late event before alerting.
- `group`: Group key.

### Notification

Results: Response schema not yet published. See https://cronitor.io/docs/notifications-api; No response body.

SDK operations: `create`, `load`, `remove`, `update`.

### RumError

SDK operations: `list`, `load`.

Key fields to recognise:

- `environment`: Environment key.
- `site`: RUM site key.

### Search

Results: Response schema not yet published. See https://cronitor.io/docs/monitors-api; No query given.

SDK operations: `load`.

### Site

Results: Response schema not yet published. See https://cronitor.io/docs/sites-api; No response body.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### StatusPage

Results: No response body.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `access`: * `public` - public * `password` - password
- `default_time_period`: * `24h` - 24h * `7d` - 7d * `30d` - 30d * `90d` - 90d
- `environment`: Environment key.

### StatusPageComponent

Results: No response body.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

### Telemetry

Results: Event accepted.

SDK operations: `create`, `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Aggregate | `load` | `GET /api/aggregates` | Required |
| ApiKey | `create` | `POST /api/keys` | Required |
| ApiKey | `list` | `GET /api/keys` | Required |
| ApiKey | `load` | `GET /api/keys/{key}` | Required |
| ApiKey | `remove` | `DELETE /api/keys/{key}` | Required |
| ApiKey | `update` | `PUT /api/keys/{key}` | Required |
| Environment | `create` | `POST /api/environments` | Required |
| Environment | `load` | `GET /api/environments/{key}` | Required |
| Environment | `load` | `GET /api/environments` | Required |
| Environment | `remove` | `DELETE /api/environments/{key}` | Required |
| Environment | `update` | `PUT /api/environments/{key}` | Required |
| Group | `create` | `POST /api/groups` | Required |
| Group | `load` | `GET /api/groups/{key}/pause/{hours}` | Required |
| Group | `load` | `GET /api/groups/{key}` | Required |
| Group | `load` | `GET /api/groups/{key}/pause` | Required |
| Group | `load` | `GET /api/groups` | Required |
| Group | `remove` | `DELETE /api/groups/{key}` | Required |
| Group | `update` | `PUT /api/groups/{key}` | Required |
| Integration | `create` | `POST /api/integrations` | Required |
| Integration | `create` | `POST /api/integrations/connect` | Required |
| Integration | `load` | `GET /api/integrations/connect/{token}` | Required |
| Integration | `load` | `GET /api/integrations` | Required |
| Integration | `load` | `GET /api/integrations/services` | Required |
| Integration | `remove` | `DELETE /api/integrations` | Required |
| Issue | `create` | `POST /api/issues` | Required |
| Issue | `create` | `POST /api/issues/bulk` | Required |
| Issue | `list` | `GET /api/issues` | Required |
| Issue | `load` | `GET /api/issues/{key}` | Required |
| Issue | `remove` | `DELETE /api/issues/{key}` | Required |
| Issue | `update` | `PUT /api/issues/{key}` | Required |
| MaintenanceWindow | `create` | `POST /api/maintenance_windows` | Required |
| MaintenanceWindow | `list` | `GET /api/maintenance_windows` | Required |
| MaintenanceWindow | `load` | `GET /api/maintenance_windows/{key}` | Required |
| MaintenanceWindow | `patch` | `PATCH /api/maintenance_windows/{key}` | Required |
| MaintenanceWindow | `remove` | `DELETE /api/maintenance_windows/{key}` | Required |
| MaintenanceWindow | `update` | `PUT /api/maintenance_windows/{key}` | Required |
| Metric | `load` | `GET /api/metrics` | Required |
| Monitor | `create` | `POST /api/monitors` | Required |
| Monitor | `create` | `POST /api/monitors/clone` | Required |
| Monitor | `list` | `GET /api/monitors` | Required |
| Monitor | `load` | `GET /api/monitors/{code}/pause/{hours}` | Required |
| Monitor | `load` | `GET /api/monitors/{code}/pause` | Required |
| Monitor | `load` | `GET /api/monitors/{code}` | Required |
| Monitor | `remove` | `DELETE /api/monitors/{code}` | Required |
| Monitor | `remove` | `DELETE /api/monitors` | Required |
| Monitor | `update` | `PUT /api/monitors` | Required |
| Notification | `create` | `POST /api/notifications` | Required |
| Notification | `load` | `GET /api/notifications/{key}` | Required |
| Notification | `load` | `GET /api/notifications` | Required |
| Notification | `remove` | `DELETE /api/notifications/{key}` | Required |
| Notification | `update` | `PUT /api/notifications/{key}` | Required |
| RumError | `list` | `GET /api/site_errors` | Required |
| RumError | `load` | `GET /api/site_errors/{key}` | Required |
| Search | `load` | `GET /api/search` | Required |
| Site | `create` | `POST /api/sites` | Required |
| Site | `create` | `POST /api/sites/query` | Required |
| Site | `list` | `GET /api/sites` | Required |
| Site | `load` | `GET /api/sites/{key}` | Required |
| Site | `remove` | `DELETE /api/sites/{key}` | Required |
| Site | `update` | `PUT /api/sites/{key}` | Required |
| StatusPage | `create` | `POST /api/statuspages` | Required |
| StatusPage | `list` | `GET /api/statuspages` | Required |
| StatusPage | `load` | `GET /api/statuspages/{key}` | Required |
| StatusPage | `remove` | `DELETE /api/statuspages/{key}` | Required |
| StatusPage | `update` | `PUT /api/statuspages/{key}` | Required |
| StatusPageComponent | `create` | `POST /api/statuspage_components` | Required |
| StatusPageComponent | `list` | `GET /api/statuspage_components` | Required |
| StatusPageComponent | `load` | `GET /api/statuspage_components/{key}` | Required |
| StatusPageComponent | `remove` | `DELETE /api/statuspage_components/{key}` | Required |
| StatusPageComponent | `update` | `PUT /api/statuspage_components/{key}` | Required |
| Telemetry | `create` | `POST /p/{apiKey}/{monitorKey}` | Not required |
| Telemetry | `load` | `GET /p/{apiKey}/{monitorKey}` | Not required |

## Connect to the API

- API server: `https://cronitor.io`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

Send an API key as the HTTP Basic username with an empty password, for example `curl -u API_KEY: https://cronitor.io/api/monitors`. Keys carry scopes: https://cronitor.io/docs/api-keys

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

