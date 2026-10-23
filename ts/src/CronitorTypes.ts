// Typed models for the Cronitor SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Aggregate {
}

export interface AggregateLoadMatch {
}

export interface ApiKey {
  created: string
  id?: string
  immutable: string
  key: string
  kind?: string
  last_used: string
  name: string
  scopes?: any
  updated: string
}

export interface ApiKeyLoadMatch {
  id: string
}

export interface ApiKeyListMatch {
  page?: number
  page_size?: number
  search?: string
}

export interface ApiKeyCreateData {
  kind?: string
  name: string
  scopes?: any
}

export interface ApiKeyUpdateData {
  id: string
  kind?: string
  name?: string
  scopes?: any
}

export interface ApiKeyRemoveMatch {
  id: string
}

export interface Environment {
  id?: string
}

export interface EnvironmentLoadMatch {
  id: string
}

export interface EnvironmentCreateData {
  id?: string
}

export interface EnvironmentUpdateData {
  id: string
}

export interface EnvironmentRemoveMatch {
  id: string
}

export interface Group {
  id?: string
}

export interface GroupLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'pause'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface GroupCreateData {
  id?: string
}

export interface GroupUpdateData {
  id: string
}

export interface GroupRemoveMatch {
  id: string
}

export interface Integration {
}

export interface IntegrationLoadMatch {
  token: string

  // Selects a custom action instead of the plain load:
  //   'service'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface IntegrationCreateData {

  // Selects a custom action instead of the plain create:
  //   'connect'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface IntegrationRemoveMatch {
}

export interface Issue {
  affected_components?: any[]
  alerts: any[]
  assigned_to?: string
  created: string
  created_by: any
  duration: number
  ended: string
  environment?: string
  id?: string
  key: string
  monitors: any[]
  name: string
  severity?: any
  started?: string
  state?: string
  statuspages?: any[]
  updated: string
  updates?: any[]
}

export interface IssueLoadMatch {
  id: string
  with_alert_detail?: boolean
  with_component_detail?: boolean
  with_environment_detail?: boolean
  with_monitor_detail?: boolean
  with_status_page_detail?: boolean
}

export interface IssueListMatch {
  check?: any[]
  component?: any[]
  env?: string
  group?: any[]
  heartbeat?: any[]
  job?: any[]
  order_by?: string
  page?: number
  page_size?: number
  search?: string
  severity?: any[]
  site?: any[]
  state?: any[]
  statuspage?: string
  tag?: any[]
  time?: string
  type?: any[]
  with_alert_detail?: boolean
  with_component_detail?: boolean
  with_environment_detail?: boolean
  with_monitor_detail?: boolean
  with_status_page_detail?: boolean
  with_summary?: boolean
}

export interface IssueCreateData {
  with_alert_detail?: boolean
  with_component_detail?: boolean
  with_environment_detail?: boolean
  with_monitor_detail?: boolean
  with_status_page_detail?: boolean
  affected_components?: any[]
  assigned_to?: string
  environment?: string
  name: string
  severity?: any
  started?: string
  state?: string
  statuspages?: any[]
  updates?: any[]

  // Selects a custom action instead of the plain create:
  //   'bulk'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface IssueUpdateData {
  id: string
  with_alert_detail?: boolean
  with_component_detail?: boolean
  with_environment_detail?: boolean
  with_monitor_detail?: boolean
  with_status_page_detail?: boolean
  affected_components?: any[]
  assigned_to?: string
  environment?: string
  name?: string
  severity?: any
  started?: string
  state?: string
  statuspages?: any[]
  updates?: any[]
}

export interface IssueRemoveMatch {
  id: string
}

export interface MaintenanceWindow {
  affects_all_monitors?: boolean
  affects_statuspage_components?: boolean
  all_affected_monitors: string
  created: string
  description?: string
  duration: number
  end: string
  environment?: string
  groups?: any[]
  id?: string
  key: string
  monitors?: any[]
  name: string
  start: string
  state: string
  statuspages?: any[]
  updated: string
}

export interface MaintenanceWindowLoadMatch {
  id: string
}

export interface MaintenanceWindowListMatch {
  page?: number
  page_size?: number
}

export interface MaintenanceWindowCreateData {
  affects_all_monitors?: boolean
  affects_statuspage_components?: boolean
  description?: string
  end: string
  environment?: string
  groups?: any[]
  monitors?: any[]
  name: string
  start: string
  statuspages?: any[]
}

export interface MaintenanceWindowUpdateData {
  id: string
  affects_all_monitors?: boolean
  affects_statuspage_components?: boolean
  description?: string
  end?: string
  environment?: string
  groups?: any[]
  monitors?: any[]
  name?: string
  start?: string
  statuspages?: any[]
}

export interface MaintenanceWindowPatchData {
  id: string
  affects_all_monitors?: boolean
  affects_statuspage_components?: boolean
  description?: string
  end?: string
  environment?: string
  groups?: any[]
  monitors?: any[]
  name?: string
  start?: string
  statuspages?: any[]
}

export interface MaintenanceWindowRemoveMatch {
  id: string
}

export interface Metric {
}

export interface MetricLoadMatch {
}

export interface Monitor {
  assertions?: any[]
  attributes: Record<string, any>
  badges: Record<string, any>
  consecutive_alert_threshold?: number
  created: string
  defaultName?: string
  defaultNote?: string
  disabled: boolean
  environments?: any[]
  failure_tolerance?: number
  grace_seconds?: number
  group?: string
  id?: string
  initialized: boolean
  key: string
  latest_event: any
  latest_events: Record<string, any>
  latest_invocations: any[]
  latest_issue: Record<string, any>
  metadata?: string
  metric_names: any[]
  monitor_list?: any[]
  name?: string
  next_expected_at: number
  note?: string
  notify?: any
  passing: boolean
  paused: boolean
  paused_until: string
  platform?: string
  realert_interval?: any
  request?: Record<string, any>
  running: boolean
  schedule_tolerance?: number
  schedules?: any[]
  site?: string
  statuspages?: any[]
  tags?: any[]
  timezone?: string
  tolerated_failures?: number
  type?: string
}

export interface MonitorLoadMatch {
  id: string
  env?: string
  with_event?: boolean
  with_invocation?: boolean
  with_status?: boolean

  // Selects a custom action instead of the plain load:
  //   'pause'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MonitorListMatch {
  env?: string
  format?: string
  group?: string
  page?: number
  page_size?: number
  search?: string
  site?: string
  sort?: string
  state?: any[]
  tag?: any[]
  type?: any[]
  with_event?: boolean
  with_invocation?: boolean
  with_status?: boolean
}

export interface MonitorCreateData {
  assertions?: any[]
  consecutive_alert_threshold?: number
  defaultName?: string
  defaultNote?: string
  environments?: any[]
  failure_tolerance?: number
  grace_seconds?: number
  group?: string
  key?: string
  metadata?: string
  name?: string
  note?: string
  notify?: any
  paused?: boolean
  platform?: string
  realert_interval?: any
  request?: Record<string, any>
  schedule_tolerance?: number
  schedules?: any[]
  site?: string
  statuspages?: any[]
  tags?: any[]
  timezone?: string
  tolerated_failures?: number
  type?: string

  // Selects a custom action instead of the plain create:
  //   'clone'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MonitorUpdateData {
  monitor_list?: any[]
}

export interface MonitorRemoveMatch {
  id: string
}

export interface Notification {
  id?: string
}

export interface NotificationLoadMatch {
  id: string
}

export interface NotificationCreateData {
  id?: string
}

export interface NotificationUpdateData {
  id: string
}

export interface NotificationRemoveMatch {
  id: string
}

export interface RumError {
  colno: number
  created: string
  environment: string
  error_type: string
  filename: string
  first_seen: string
  ignored?: boolean
  key: string
  last_seen: string
  latest_event: string
  lineno: number
  message: string
  occurrences: number
  site: string
  updated: string
}

export interface RumErrorLoadMatch {
  key: string
}

export interface RumErrorListMatch {
  env?: string
  environment?: number
  ignored?: boolean
  page?: number
  page_size?: number
  site?: string
}

export interface Search {
}

export interface SearchLoadMatch {
  query?: string
}

export interface Site {
  client_key: string
  country_code_denylist?: string
  created: string
  errors_enabled?: boolean
  exclude_internal_referrers?: boolean
  filter_bots?: boolean
  filter_browser_extensions?: boolean
  filter_localhost?: boolean
  id?: string
  ingestion_enabled: boolean
  ip_denylist?: string
  key: string
  name: string
  origin_allowlist?: string
  path_denylist?: string
  public_report_enabled?: boolean
  public_report_key: string
  sampling?: number
  snippet: string
  updated: string
  webvitals_enabled?: boolean
}

export interface SiteLoadMatch {
  id: string
}

export interface SiteListMatch {
  page?: number
  page_size?: number
}

export interface SiteCreateData {
  country_code_denylist?: string
  errors_enabled?: boolean
  exclude_internal_referrers?: boolean
  filter_bots?: boolean
  filter_browser_extensions?: boolean
  filter_localhost?: boolean
  ip_denylist?: string
  name: string
  origin_allowlist?: string
  path_denylist?: string
  public_report_enabled?: boolean
  sampling?: number
  webvitals_enabled?: boolean

  // Selects a custom action instead of the plain create:
  //   'query'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SiteUpdateData {
  id: string
  country_code_denylist?: string
  errors_enabled?: boolean
  exclude_internal_referrers?: boolean
  filter_bots?: boolean
  filter_browser_extensions?: boolean
  filter_localhost?: boolean
  ip_denylist?: string
  name?: string
  origin_allowlist?: string
  path_denylist?: string
  public_report_enabled?: boolean
  sampling?: number
  webvitals_enabled?: boolean
}

export interface SiteRemoveMatch {
  id: string
}

export interface StatusPage {
  access?: string
  allow_search_index?: boolean
  auth_secret: string
  badge_url_dark: string
  badge_url_light: string
  components: string
  components_count: string
  created: string
  custom_domain?: string
  default_time_period?: string
  enable_dark_mode?: boolean
  enable_performance_metrics?: boolean
  environment?: string
  hosted_subdomain: string
  ip_allowlist?: string
  key: string
  logo_url?: string
  metadata: string
  name: string
  password?: string
  status: string
  support_url?: string
  updated: string
  website_url?: string
}

export interface StatusPageLoadMatch {
  key: string
}

export interface StatusPageListMatch {
  page?: number
  page_size?: number
}

export interface StatusPageCreateData {
  access?: string
  allow_search_index?: boolean
  custom_domain?: string
  default_time_period?: string
  enable_dark_mode?: boolean
  enable_performance_metrics?: boolean
  environment?: string
  hosted_subdomain: string
  ip_allowlist?: string
  logo_url?: string
  name: string
  password?: string
  support_url?: string
  website_url?: string
}

export interface StatusPageUpdateData {
  key: string
  access?: string
  allow_search_index?: boolean
  custom_domain?: string
  default_time_period?: string
  enable_dark_mode?: boolean
  enable_performance_metrics?: boolean
  environment?: string
  hosted_subdomain?: string
  ip_allowlist?: string
  logo_url?: string
  name?: string
  password?: string
  support_url?: string
  website_url?: string
}

export interface StatusPageRemoveMatch {
  key: string
}

export interface StatusPageComponent {
  autopublish?: boolean
  children: string
  created: string
  description?: string
  group?: string
  key: string
  monitor?: string
  name?: string
  position?: string
  status: string
  statuspage?: string
  type: string
  updated: string
  uptime_history: string
}

export interface StatusPageComponentLoadMatch {
  key: string
}

export interface StatusPageComponentListMatch {
  page?: number
  page_size?: number
  statuspage?: string
}

export interface StatusPageComponentCreateData {
  autopublish?: boolean
  description?: string
  group?: string
  monitor?: string
  name?: string
  position?: string
  statuspage?: string
}

export interface StatusPageComponentUpdateData {
  key: string
  autopublish?: boolean
  description?: string
  group?: string
  monitor?: string
  name?: string
  position?: string
  statuspage?: string
}

export interface StatusPageComponentRemoveMatch {
  key: string
}

export interface Telemetry {
  id?: string
}

export interface TelemetryLoadMatch {
  api_key: string
  monitor_key: string
  env?: string
  host?: string
  message?: string
  metric?: any[]
  series?: string
  state?: string
  status_code?: number
}

export interface TelemetryCreateData {
  api_key: string
  monitor_key: string
  env?: string
  host?: string
  message?: string
  metric?: any[]
  series?: string
  state?: string
  status_code?: number
  id?: string
}

