import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "aggregate",
    "accessor": "Aggregate",
    "op": "load",
    "method": "GET",
    "path": "/api/aggregates",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "api_key",
    "accessor": "ApiKey",
    "op": "create",
    "method": "POST",
    "path": "/api/keys",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "key": "x",
      "name": "x",
      "kind": "telemetry",
      "immutable": "x",
      "last_used": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "api_key",
    "accessor": "ApiKey",
    "op": "list",
    "method": "GET",
    "path": "/api/keys",
    "args": [],
    "select": {
      "page": "v1",
      "page_size": "v1",
      "search": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "pageSize",
      "search"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      },
      {
        "name": "search",
        "wire": "search"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "page_count": 1,
      "page_size": 1,
      "total_count": 1,
      "data": [
        {
          "key": "x",
          "name": "x",
          "kind": "telemetry",
          "immutable": "x",
          "last_used": "x",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "api_key",
    "accessor": "ApiKey",
    "op": "load",
    "method": "GET",
    "path": "/api/keys/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "kind": "telemetry",
      "immutable": "x",
      "last_used": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "api_key",
    "accessor": "ApiKey",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/keys/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "api_key",
    "accessor": "ApiKey",
    "op": "update",
    "method": "PUT",
    "path": "/api/keys/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "kind": "telemetry",
      "immutable": "x",
      "last_used": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "environment",
    "accessor": "Environment",
    "op": "create",
    "method": "POST",
    "path": "/api/environments",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "environment",
    "accessor": "Environment",
    "op": "load",
    "method": "GET",
    "path": "/api/environments/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "environment",
    "accessor": "Environment",
    "op": "load",
    "method": "GET",
    "path": "/api/environments",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "environment",
    "accessor": "Environment",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/environments/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "environment",
    "accessor": "Environment",
    "op": "update",
    "method": "PUT",
    "path": "/api/environments/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "create",
    "method": "POST",
    "path": "/api/groups",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "load",
    "method": "GET",
    "path": "/api/groups/{key}/pause/{hours}",
    "args": [
      {
        "name": "group_id",
        "wire": "key",
        "value": "p1"
      },
      {
        "name": "hour",
        "wire": "hours",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "load",
    "method": "GET",
    "path": "/api/groups/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "load",
    "method": "GET",
    "path": "/api/groups/{key}/pause",
    "action": "pause",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "load",
    "method": "GET",
    "path": "/api/groups",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/groups/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "group",
    "accessor": "Group",
    "op": "update",
    "method": "PUT",
    "path": "/api/groups/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "create",
    "method": "POST",
    "path": "/api/integrations",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "create",
    "method": "POST",
    "path": "/api/integrations/connect",
    "action": "connect",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "load",
    "method": "GET",
    "path": "/api/integrations/connect/{token}",
    "args": [
      {
        "name": "token",
        "wire": "token",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "load",
    "method": "GET",
    "path": "/api/integrations",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "load",
    "method": "GET",
    "path": "/api/integrations/services",
    "action": "service",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "integration",
    "accessor": "Integration",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/integrations",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "create",
    "method": "POST",
    "path": "/api/issues",
    "args": [],
    "select": {
      "with_alert_detail": "v1",
      "with_component_detail": "v1",
      "with_environment_detail": "v1",
      "with_monitor_detail": "v1",
      "with_status_page_detail": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "withAlertDetails",
      "withComponentDetails",
      "withEnvironmentDetails",
      "withMonitorDetails",
      "withStatusPageDetails"
    ],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "key": "x",
      "name": "x",
      "severity": "missing_data",
      "state": "unresolved",
      "updates": [
        {
          "key": "x",
          "timestamp": "2026-01-01T00:00:00Z",
          "message": "x",
          "state": "unresolved",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z",
          "created_by": "x"
        }
      ],
      "started": "2026-01-01T00:00:00Z",
      "ended": "2026-01-01T00:00:00Z",
      "duration": 1,
      "statuspages": [
        "x"
      ],
      "affected_components": [
        "x"
      ],
      "monitors": [
        {
          "key": "x",
          "name": "x"
        }
      ],
      "alerts": [
        {}
      ],
      "environment": "x",
      "assigned_to": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "create",
    "method": "POST",
    "path": "/api/issues/bulk",
    "action": "bulk",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "list",
    "method": "GET",
    "path": "/api/issues",
    "args": [],
    "select": {
      "check": "v1",
      "component": "v1",
      "env": "v1",
      "group": "v1",
      "heartbeat": "v1",
      "job": "v1",
      "order_by": "v1",
      "page": "v1",
      "page_size": "v1",
      "search": "v1",
      "severity": "v1",
      "site": "v1",
      "state": "v1",
      "statuspage": "v1",
      "tag": "v1",
      "time": "v1",
      "type": "v1",
      "with_alert_detail": "v1",
      "with_component_detail": "v1",
      "with_environment_detail": "v1",
      "with_monitor_detail": "v1",
      "with_status_page_detail": "v1",
      "with_summary": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "check",
      "component",
      "env",
      "group",
      "heartbeat",
      "job",
      "orderBy",
      "page",
      "pageSize",
      "search",
      "severity",
      "site",
      "state",
      "statuspage",
      "tag",
      "time",
      "type",
      "withAlertDetails",
      "withComponentDetails",
      "withEnvironmentDetails",
      "withMonitorDetails",
      "withStatusPageDetails",
      "withSummary"
    ],
    "queryArgs": [
      {
        "name": "check",
        "wire": "check"
      },
      {
        "name": "component",
        "wire": "component"
      },
      {
        "name": "env",
        "wire": "env"
      },
      {
        "name": "group",
        "wire": "group"
      },
      {
        "name": "heartbeat",
        "wire": "heartbeat"
      },
      {
        "name": "job",
        "wire": "job"
      },
      {
        "name": "order_by",
        "wire": "orderBy"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "severity",
        "wire": "severity"
      },
      {
        "name": "site",
        "wire": "site"
      },
      {
        "name": "state",
        "wire": "state"
      },
      {
        "name": "statuspage",
        "wire": "statuspage"
      },
      {
        "name": "tag",
        "wire": "tag"
      },
      {
        "name": "time",
        "wire": "time"
      },
      {
        "name": "type",
        "wire": "type"
      },
      {
        "name": "with_alert_detail",
        "wire": "withAlertDetails"
      },
      {
        "name": "with_component_detail",
        "wire": "withComponentDetails"
      },
      {
        "name": "with_environment_detail",
        "wire": "withEnvironmentDetails"
      },
      {
        "name": "with_monitor_detail",
        "wire": "withMonitorDetails"
      },
      {
        "name": "with_status_page_detail",
        "wire": "withStatusPageDetails"
      },
      {
        "name": "with_summary",
        "wire": "withSummary"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "page_count": 1,
      "page_size": 1,
      "total_count": 1,
      "data": [
        {
          "key": "x",
          "name": "x",
          "severity": "missing_data",
          "state": "unresolved",
          "updates": [
            {
              "key": "x",
              "timestamp": "2026-01-01T00:00:00Z",
              "message": "x",
              "state": "unresolved",
              "created": "2026-01-01T00:00:00Z",
              "updated": "2026-01-01T00:00:00Z",
              "created_by": "x"
            }
          ],
          "started": "2026-01-01T00:00:00Z",
          "ended": "2026-01-01T00:00:00Z",
          "duration": 1,
          "statuspages": [
            "x"
          ],
          "affected_components": [
            "x"
          ],
          "monitors": [
            {
              "key": "x",
              "name": "x"
            }
          ],
          "alerts": [
            {}
          ],
          "environment": "x",
          "assigned_to": "x",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "load",
    "method": "GET",
    "path": "/api/issues/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {
      "with_alert_detail": "v1",
      "with_component_detail": "v1",
      "with_environment_detail": "v1",
      "with_monitor_detail": "v1",
      "with_status_page_detail": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "withAlertDetails",
      "withComponentDetails",
      "withEnvironmentDetails",
      "withMonitorDetails",
      "withStatusPageDetails"
    ],
    "queryArgs": [
      {
        "name": "with_alert_detail",
        "wire": "withAlertDetails"
      },
      {
        "name": "with_component_detail",
        "wire": "withComponentDetails"
      },
      {
        "name": "with_environment_detail",
        "wire": "withEnvironmentDetails"
      },
      {
        "name": "with_monitor_detail",
        "wire": "withMonitorDetails"
      },
      {
        "name": "with_status_page_detail",
        "wire": "withStatusPageDetails"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "severity": "missing_data",
      "state": "unresolved",
      "updates": [
        {
          "key": "x",
          "timestamp": "2026-01-01T00:00:00Z",
          "message": "x",
          "state": "unresolved",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z",
          "created_by": "x"
        }
      ],
      "started": "2026-01-01T00:00:00Z",
      "ended": "2026-01-01T00:00:00Z",
      "duration": 1,
      "statuspages": [
        "x"
      ],
      "affected_components": [
        "x"
      ],
      "monitors": [
        {
          "key": "x",
          "name": "x"
        }
      ],
      "alerts": [
        {}
      ],
      "environment": "x",
      "assigned_to": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/issues/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "update",
    "method": "PUT",
    "path": "/api/issues/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {
      "with_alert_detail": "v1",
      "with_component_detail": "v1",
      "with_environment_detail": "v1",
      "with_monitor_detail": "v1",
      "with_status_page_detail": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "withAlertDetails",
      "withComponentDetails",
      "withEnvironmentDetails",
      "withMonitorDetails",
      "withStatusPageDetails"
    ],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "severity": "missing_data",
      "state": "unresolved",
      "updates": [
        {
          "key": "x",
          "timestamp": "2026-01-01T00:00:00Z",
          "message": "x",
          "state": "unresolved",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z",
          "created_by": "x"
        }
      ],
      "started": "2026-01-01T00:00:00Z",
      "ended": "2026-01-01T00:00:00Z",
      "duration": 1,
      "statuspages": [
        "x"
      ],
      "affected_components": [
        "x"
      ],
      "monitors": [
        {
          "key": "x",
          "name": "x"
        }
      ],
      "alerts": [
        {}
      ],
      "environment": "x",
      "assigned_to": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "maintenance_window",
    "accessor": "MaintenanceWindow",
    "op": "create",
    "method": "POST",
    "path": "/api/maintenance_windows",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "key": "x",
      "name": "x",
      "description": "x",
      "start": "2026-01-01T00:00:00Z",
      "end": "2026-01-01T00:00:00Z",
      "affects_all_monitors": true,
      "affects_statuspage_components": true,
      "environment": "x",
      "statuspages": [
        "x"
      ],
      "monitors": [],
      "groups": [],
      "all_affected_monitors": "x",
      "duration": 1,
      "state": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "maintenance_window",
    "accessor": "MaintenanceWindow",
    "op": "list",
    "method": "GET",
    "path": "/api/maintenance_windows",
    "args": [],
    "select": {
      "page": "v1",
      "page_size": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "pageSize"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "page_count": 1,
      "page_size": 1,
      "total_count": 1,
      "data": [
        {
          "key": "x",
          "name": "x",
          "description": "x",
          "start": "2026-01-01T00:00:00Z",
          "end": "2026-01-01T00:00:00Z",
          "affects_all_monitors": true,
          "affects_statuspage_components": true,
          "environment": "x",
          "statuspages": [
            "x"
          ],
          "monitors": [],
          "groups": [],
          "all_affected_monitors": "x",
          "duration": 1,
          "state": "x",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "maintenance_window",
    "accessor": "MaintenanceWindow",
    "op": "load",
    "method": "GET",
    "path": "/api/maintenance_windows/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "description": "x",
      "start": "2026-01-01T00:00:00Z",
      "end": "2026-01-01T00:00:00Z",
      "affects_all_monitors": true,
      "affects_statuspage_components": true,
      "environment": "x",
      "statuspages": [
        "x"
      ],
      "monitors": [],
      "groups": [],
      "all_affected_monitors": "x",
      "duration": 1,
      "state": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "maintenance_window",
    "accessor": "MaintenanceWindow",
    "op": "patch",
    "method": "PATCH",
    "path": "/api/maintenance_windows/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "description": "x",
      "start": "2026-01-01T00:00:00Z",
      "end": "2026-01-01T00:00:00Z",
      "affects_all_monitors": true,
      "affects_statuspage_components": true,
      "environment": "x",
      "statuspages": [
        "x"
      ],
      "monitors": [],
      "groups": [],
      "all_affected_monitors": "x",
      "duration": 1,
      "state": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "maintenance_window",
    "accessor": "MaintenanceWindow",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/maintenance_windows/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "maintenance_window",
    "accessor": "MaintenanceWindow",
    "op": "update",
    "method": "PUT",
    "path": "/api/maintenance_windows/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "description": "x",
      "start": "2026-01-01T00:00:00Z",
      "end": "2026-01-01T00:00:00Z",
      "affects_all_monitors": true,
      "affects_statuspage_components": true,
      "environment": "x",
      "statuspages": [
        "x"
      ],
      "monitors": [],
      "groups": [],
      "all_affected_monitors": "x",
      "duration": 1,
      "state": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "metric",
    "accessor": "Metric",
    "op": "load",
    "method": "GET",
    "path": "/api/metrics",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "create",
    "method": "POST",
    "path": "/api/monitors",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "attributes": {},
      "assertions": [
        "x"
      ],
      "created": "2026-01-01T00:00:00Z",
      "disabled": true,
      "failure_tolerance": 1,
      "grace_seconds": 1,
      "consecutive_alert_threshold": 1,
      "group": "x",
      "initialized": true,
      "key": "x",
      "latest_event": {
        "stamp": 1,
        "msg": "x",
        "event": "req-ok",
        "metrics": {},
        "client": "x",
        "host": "x",
        "ip": "x"
      },
      "latest_events": {},
      "latest_issue": {
        "stamp": 1,
        "state": "x"
      },
      "latest_invocations": [
        {}
      ],
      "metric_names": [
        "x"
      ],
      "badges": {
        "simple": "x",
        "detailed": "x"
      },
      "metadata": "x",
      "name": "x",
      "next_expected_at": 1,
      "note": "x",
      "notify": [
        "x"
      ],
      "passing": true,
      "paused": true,
      "platform": "x",
      "realert_interval": 1,
      "request": {
        "url": "x",
        "method": "GET",
        "body": "x",
        "headers": {},
        "cookies": {},
        "timeout_seconds": 1,
        "regions": [
          "x"
        ],
        "follow_redirects": true,
        "verify_ssl": true,
        "use_ipv6": true
      },
      "running": true,
      "schedules": [
        "x"
      ],
      "schedule_tolerance": 1,
      "tags": [
        "x"
      ],
      "timezone": "x",
      "type": "job",
      "environments": [
        "x"
      ],
      "statuspages": [
        "x"
      ],
      "site": "x"
    },
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "create",
    "method": "POST",
    "path": "/api/monitors/clone",
    "action": "clone",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "attributes": {},
      "assertions": [
        "x"
      ],
      "created": "2026-01-01T00:00:00Z",
      "disabled": true,
      "failure_tolerance": 1,
      "grace_seconds": 1,
      "consecutive_alert_threshold": 1,
      "group": "x",
      "initialized": true,
      "key": "x",
      "latest_event": {
        "stamp": 1,
        "msg": "x",
        "event": "req-ok",
        "metrics": {},
        "client": "x",
        "host": "x",
        "ip": "x"
      },
      "latest_events": {},
      "latest_issue": {
        "stamp": 1,
        "state": "x"
      },
      "latest_invocations": [
        {}
      ],
      "metric_names": [
        "x"
      ],
      "badges": {
        "simple": "x",
        "detailed": "x"
      },
      "metadata": "x",
      "name": "x",
      "next_expected_at": 1,
      "note": "x",
      "notify": [
        "x"
      ],
      "passing": true,
      "paused": true,
      "platform": "x",
      "realert_interval": 1,
      "request": {
        "url": "x",
        "method": "GET",
        "body": "x",
        "headers": {},
        "cookies": {},
        "timeout_seconds": 1,
        "regions": [
          "x"
        ],
        "follow_redirects": true,
        "verify_ssl": true,
        "use_ipv6": true
      },
      "running": true,
      "schedules": [
        "x"
      ],
      "schedule_tolerance": 1,
      "tags": [
        "x"
      ],
      "timezone": "x",
      "type": "job",
      "environments": [
        "x"
      ],
      "statuspages": [
        "x"
      ],
      "site": "x"
    },
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "list",
    "method": "GET",
    "path": "/api/monitors",
    "args": [],
    "select": {
      "env": "v1",
      "format": "v1",
      "group": "v1",
      "page": "v1",
      "page_size": "v1",
      "search": "v1",
      "site": "v1",
      "sort": "v1",
      "state": "v1",
      "tag": "v1",
      "type": "v1",
      "with_event": "v1",
      "with_invocation": "v1",
      "with_status": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "env",
      "format",
      "group",
      "page",
      "pageSize",
      "search",
      "site",
      "sort",
      "state",
      "tag",
      "type",
      "withEvents",
      "withInvocations",
      "withStatus"
    ],
    "queryArgs": [
      {
        "name": "env",
        "wire": "env"
      },
      {
        "name": "format",
        "wire": "format"
      },
      {
        "name": "group",
        "wire": "group"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      },
      {
        "name": "search",
        "wire": "search"
      },
      {
        "name": "site",
        "wire": "site"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "state",
        "wire": "state"
      },
      {
        "name": "tag",
        "wire": "tag"
      },
      {
        "name": "type",
        "wire": "type"
      },
      {
        "name": "with_event",
        "wire": "withEvents"
      },
      {
        "name": "with_invocation",
        "wire": "withInvocations"
      },
      {
        "name": "with_status",
        "wire": "withStatus"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "monitors": [
        {
          "attributes": {},
          "assertions": [
            "x"
          ],
          "created": "2026-01-01T00:00:00Z",
          "disabled": true,
          "failure_tolerance": 1,
          "grace_seconds": 1,
          "consecutive_alert_threshold": 1,
          "group": "x",
          "initialized": true,
          "key": "x",
          "latest_event": {
            "stamp": 1,
            "msg": "x",
            "event": "req-ok",
            "metrics": {},
            "client": "x",
            "host": "x",
            "ip": "x"
          },
          "latest_events": {},
          "latest_issue": {
            "stamp": 1,
            "state": "x"
          },
          "latest_invocations": [
            {}
          ],
          "metric_names": [
            "x"
          ],
          "badges": {
            "simple": "x",
            "detailed": "x"
          },
          "metadata": "x",
          "name": "x",
          "next_expected_at": 1,
          "note": "x",
          "notify": [
            "x"
          ],
          "passing": true,
          "paused": true,
          "platform": "x",
          "realert_interval": 1,
          "request": {
            "url": "x",
            "method": "GET",
            "body": "x",
            "headers": {},
            "cookies": {},
            "timeout_seconds": 1,
            "regions": [
              "x"
            ],
            "follow_redirects": true,
            "verify_ssl": true,
            "use_ipv6": true
          },
          "running": true,
          "schedules": [
            "x"
          ],
          "schedule_tolerance": 1,
          "tags": [
            "x"
          ],
          "timezone": "x",
          "type": "job",
          "environments": [
            "x"
          ],
          "statuspages": [
            "x"
          ],
          "site": "x"
        }
      ],
      "page": 1,
      "page_size": 1,
      "total_monitor_count": 1,
      "version": "x"
    },
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "load",
    "method": "GET",
    "path": "/api/monitors/{code}/pause/{hours}",
    "args": [
      {
        "name": "hour",
        "wire": "hours",
        "value": "p1"
      },
      {
        "name": "monitor_id",
        "wire": "code",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "paused": true,
      "paused_until": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "load",
    "method": "GET",
    "path": "/api/monitors/{code}/pause",
    "action": "pause",
    "args": [
      {
        "name": "code",
        "wire": "code",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "paused": true,
      "paused_until": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "load",
    "method": "GET",
    "path": "/api/monitors/{code}",
    "args": [
      {
        "name": "id",
        "wire": "code",
        "value": "p1"
      }
    ],
    "select": {
      "env": "v1",
      "with_event": "v1",
      "with_invocation": "v1",
      "with_status": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "env",
      "withEvents",
      "withInvocations",
      "withStatus"
    ],
    "queryArgs": [
      {
        "name": "env",
        "wire": "env"
      },
      {
        "name": "with_event",
        "wire": "withEvents"
      },
      {
        "name": "with_invocation",
        "wire": "withInvocations"
      },
      {
        "name": "with_status",
        "wire": "withStatus"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "attributes": {},
      "assertions": [
        "x"
      ],
      "created": "2026-01-01T00:00:00Z",
      "disabled": true,
      "failure_tolerance": 1,
      "grace_seconds": 1,
      "consecutive_alert_threshold": 1,
      "group": "x",
      "initialized": true,
      "key": "x",
      "latest_event": {
        "stamp": 1,
        "msg": "x",
        "event": "req-ok",
        "metrics": {},
        "client": "x",
        "host": "x",
        "ip": "x"
      },
      "latest_events": {},
      "latest_issue": {
        "stamp": 1,
        "state": "x"
      },
      "latest_invocations": [
        {}
      ],
      "metric_names": [
        "x"
      ],
      "badges": {
        "simple": "x",
        "detailed": "x"
      },
      "metadata": "x",
      "name": "x",
      "next_expected_at": 1,
      "note": "x",
      "notify": [
        "x"
      ],
      "passing": true,
      "paused": true,
      "platform": "x",
      "realert_interval": 1,
      "request": {
        "url": "x",
        "method": "GET",
        "body": "x",
        "headers": {},
        "cookies": {},
        "timeout_seconds": 1,
        "regions": [
          "x"
        ],
        "follow_redirects": true,
        "verify_ssl": true,
        "use_ipv6": true
      },
      "running": true,
      "schedules": [
        "x"
      ],
      "schedule_tolerance": 1,
      "tags": [
        "x"
      ],
      "timezone": "x",
      "type": "job",
      "environments": [
        "x"
      ],
      "statuspages": [
        "x"
      ],
      "site": "x"
    },
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/monitors/{code}",
    "args": [
      {
        "name": "id",
        "wire": "code",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/monitors",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "deleted_count": 1,
      "requested_count": 1
    },
    "idField": "id"
  },
  {
    "entity": "monitor",
    "accessor": "Monitor",
    "op": "update",
    "method": "PUT",
    "path": "/api/monitors",
    "args": [],
    "select": {
      "monitor_list": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "attributes": {},
        "assertions": [
          "x"
        ],
        "created": "2026-01-01T00:00:00Z",
        "disabled": true,
        "failure_tolerance": 1,
        "grace_seconds": 1,
        "consecutive_alert_threshold": 1,
        "group": "x",
        "initialized": true,
        "key": "x",
        "latest_event": {
          "stamp": 1,
          "msg": "x",
          "event": "req-ok",
          "metrics": {},
          "client": "x",
          "host": "x",
          "ip": "x"
        },
        "latest_events": {},
        "latest_issue": {
          "stamp": 1,
          "state": "x"
        },
        "latest_invocations": [
          {}
        ],
        "metric_names": [
          "x"
        ],
        "badges": {
          "simple": "x",
          "detailed": "x"
        },
        "metadata": "x",
        "name": "x",
        "next_expected_at": 1,
        "note": "x",
        "notify": [
          "x"
        ],
        "passing": true,
        "paused": true,
        "platform": "x",
        "realert_interval": 1,
        "request": {
          "url": "x",
          "method": "GET",
          "body": "x",
          "headers": {},
          "cookies": {},
          "timeout_seconds": 1,
          "regions": [
            "x"
          ],
          "follow_redirects": true,
          "verify_ssl": true,
          "use_ipv6": true
        },
        "running": true,
        "schedules": [
          "x"
        ],
        "schedule_tolerance": 1,
        "tags": [
          "x"
        ],
        "timezone": "x",
        "type": "job",
        "environments": [
          "x"
        ],
        "statuspages": [
          "x"
        ],
        "site": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "notification",
    "accessor": "Notification",
    "op": "create",
    "method": "POST",
    "path": "/api/notifications",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "notification",
    "accessor": "Notification",
    "op": "load",
    "method": "GET",
    "path": "/api/notifications/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "notification",
    "accessor": "Notification",
    "op": "load",
    "method": "GET",
    "path": "/api/notifications",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "notification",
    "accessor": "Notification",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/notifications/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "notification",
    "accessor": "Notification",
    "op": "update",
    "method": "PUT",
    "path": "/api/notifications/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "rum_error",
    "accessor": "RumError",
    "op": "list",
    "method": "GET",
    "path": "/api/site_errors",
    "args": [],
    "select": {
      "env": "v1",
      "environment": "v1",
      "ignored": "v1",
      "page": "v1",
      "page_size": "v1",
      "site": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "env",
      "environment",
      "ignored",
      "page",
      "pageSize",
      "site"
    ],
    "queryArgs": [
      {
        "name": "env",
        "wire": "env"
      },
      {
        "name": "environment",
        "wire": "environment"
      },
      {
        "name": "ignored",
        "wire": "ignored"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      },
      {
        "name": "site",
        "wire": "site"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "page_count": 1,
      "page_size": 1,
      "total_count": 1,
      "data": [
        {
          "key": "x",
          "ignored": true,
          "error_type": "x",
          "message": "x",
          "filename": "x",
          "lineno": 1,
          "colno": 1,
          "first_seen": "2026-01-01T00:00:00Z",
          "last_seen": "2026-01-01T00:00:00Z",
          "occurrences": 1,
          "latest_event": "x",
          "site": "x",
          "environment": "x",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "rum_error",
    "accessor": "RumError",
    "op": "load",
    "method": "GET",
    "path": "/api/site_errors/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "ignored": true,
      "error_type": "x",
      "message": "x",
      "filename": "x",
      "lineno": 1,
      "colno": 1,
      "first_seen": "2026-01-01T00:00:00Z",
      "last_seen": "2026-01-01T00:00:00Z",
      "occurrences": 1,
      "latest_event": "x",
      "site": "x",
      "environment": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "load",
    "method": "GET",
    "path": "/api/search",
    "args": [],
    "select": {
      "query": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [
      "query"
    ],
    "queryArgs": [
      {
        "name": "query",
        "wire": "query"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "site",
    "accessor": "Site",
    "op": "create",
    "method": "POST",
    "path": "/api/sites",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "key": "x",
      "name": "x",
      "client_key": "x",
      "public_report_enabled": true,
      "public_report_key": "x",
      "webvitals_enabled": true,
      "errors_enabled": true,
      "filter_localhost": true,
      "filter_bots": true,
      "filter_browser_extensions": true,
      "exclude_internal_referrers": true,
      "origin_allowlist": "x",
      "ip_denylist": "x",
      "country_code_denylist": "x",
      "path_denylist": "x",
      "snippet": "x",
      "sampling": 1,
      "ingestion_enabled": true,
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "site",
    "accessor": "Site",
    "op": "create",
    "method": "POST",
    "path": "/api/sites/query",
    "action": "query",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "site",
    "accessor": "Site",
    "op": "list",
    "method": "GET",
    "path": "/api/sites",
    "args": [],
    "select": {
      "page": "v1",
      "page_size": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "pageSize"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "page_count": 1,
      "page_size": 1,
      "total_count": 1,
      "data": [
        {
          "key": "x",
          "name": "x",
          "client_key": "x",
          "public_report_enabled": true,
          "public_report_key": "x",
          "webvitals_enabled": true,
          "errors_enabled": true,
          "filter_localhost": true,
          "filter_bots": true,
          "filter_browser_extensions": true,
          "exclude_internal_referrers": true,
          "origin_allowlist": "x",
          "ip_denylist": "x",
          "country_code_denylist": "x",
          "path_denylist": "x",
          "snippet": "x",
          "sampling": 1,
          "ingestion_enabled": true,
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "site",
    "accessor": "Site",
    "op": "load",
    "method": "GET",
    "path": "/api/sites/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "client_key": "x",
      "public_report_enabled": true,
      "public_report_key": "x",
      "webvitals_enabled": true,
      "errors_enabled": true,
      "filter_localhost": true,
      "filter_bots": true,
      "filter_browser_extensions": true,
      "exclude_internal_referrers": true,
      "origin_allowlist": "x",
      "ip_denylist": "x",
      "country_code_denylist": "x",
      "path_denylist": "x",
      "snippet": "x",
      "sampling": 1,
      "ingestion_enabled": true,
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "site",
    "accessor": "Site",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/sites/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "site",
    "accessor": "Site",
    "op": "update",
    "method": "PUT",
    "path": "/api/sites/{key}",
    "args": [
      {
        "name": "id",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "client_key": "x",
      "public_report_enabled": true,
      "public_report_key": "x",
      "webvitals_enabled": true,
      "errors_enabled": true,
      "filter_localhost": true,
      "filter_bots": true,
      "filter_browser_extensions": true,
      "exclude_internal_referrers": true,
      "origin_allowlist": "x",
      "ip_denylist": "x",
      "country_code_denylist": "x",
      "path_denylist": "x",
      "snippet": "x",
      "sampling": 1,
      "ingestion_enabled": true,
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "status_page",
    "accessor": "StatusPage",
    "op": "create",
    "method": "POST",
    "path": "/api/statuspages",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "key": "x",
      "name": "x",
      "logo_url": "x",
      "website_url": "x",
      "support_url": "x",
      "allow_search_index": true,
      "enable_performance_metrics": true,
      "default_time_period": "24h",
      "enable_dark_mode": true,
      "hosted_subdomain": "x",
      "custom_domain": "x",
      "access": "public",
      "auth_secret": "x",
      "ip_allowlist": "x",
      "components": "x",
      "components_count": "x",
      "status": "x",
      "environment": "x",
      "metadata": "x",
      "badge_url_light": "x",
      "badge_url_dark": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "status_page",
    "accessor": "StatusPage",
    "op": "list",
    "method": "GET",
    "path": "/api/statuspages",
    "args": [],
    "select": {
      "page": "v1",
      "page_size": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "pageSize"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "page_count": 1,
      "page_size": 1,
      "total_count": 1,
      "data": [
        {
          "key": "x",
          "name": "x",
          "logo_url": "x",
          "website_url": "x",
          "support_url": "x",
          "allow_search_index": true,
          "enable_performance_metrics": true,
          "default_time_period": "24h",
          "enable_dark_mode": true,
          "hosted_subdomain": "x",
          "custom_domain": "x",
          "access": "public",
          "auth_secret": "x",
          "ip_allowlist": "x",
          "components": "x",
          "components_count": "x",
          "status": "x",
          "environment": "x",
          "metadata": "x",
          "badge_url_light": "x",
          "badge_url_dark": "x",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "status_page",
    "accessor": "StatusPage",
    "op": "load",
    "method": "GET",
    "path": "/api/statuspages/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "logo_url": "x",
      "website_url": "x",
      "support_url": "x",
      "allow_search_index": true,
      "enable_performance_metrics": true,
      "default_time_period": "24h",
      "enable_dark_mode": true,
      "hosted_subdomain": "x",
      "custom_domain": "x",
      "access": "public",
      "auth_secret": "x",
      "ip_allowlist": "x",
      "components": "x",
      "components_count": "x",
      "status": "x",
      "environment": "x",
      "metadata": "x",
      "badge_url_light": "x",
      "badge_url_dark": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "status_page",
    "accessor": "StatusPage",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/statuspages/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "status_page",
    "accessor": "StatusPage",
    "op": "update",
    "method": "PUT",
    "path": "/api/statuspages/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "name": "x",
      "logo_url": "x",
      "website_url": "x",
      "support_url": "x",
      "allow_search_index": true,
      "enable_performance_metrics": true,
      "default_time_period": "24h",
      "enable_dark_mode": true,
      "hosted_subdomain": "x",
      "custom_domain": "x",
      "access": "public",
      "auth_secret": "x",
      "ip_allowlist": "x",
      "components": "x",
      "components_count": "x",
      "status": "x",
      "environment": "x",
      "metadata": "x",
      "badge_url_light": "x",
      "badge_url_dark": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "status_page_component",
    "accessor": "StatusPageComponent",
    "op": "create",
    "method": "POST",
    "path": "/api/statuspage_components",
    "args": [],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "key": "x",
      "position": "x",
      "type": "x",
      "name": "x",
      "description": "x",
      "status": "x",
      "uptime_history": "x",
      "monitor": "x",
      "group": "x",
      "statuspage": "x",
      "autopublish": true,
      "children": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "status_page_component",
    "accessor": "StatusPageComponent",
    "op": "list",
    "method": "GET",
    "path": "/api/statuspage_components",
    "args": [],
    "select": {
      "page": "v1",
      "page_size": "v1",
      "statuspage": "v1"
    },
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "pageSize",
      "statuspage"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "page_size",
        "wire": "pageSize"
      },
      {
        "name": "statuspage",
        "wire": "statuspage"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "page": 1,
      "page_count": 1,
      "page_size": 1,
      "total_count": 1,
      "data": [
        {
          "key": "x",
          "position": "x",
          "type": "x",
          "name": "x",
          "description": "x",
          "status": "x",
          "uptime_history": "x",
          "monitor": "x",
          "group": "x",
          "statuspage": "x",
          "autopublish": true,
          "children": "x",
          "created": "2026-01-01T00:00:00Z",
          "updated": "2026-01-01T00:00:00Z"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "status_page_component",
    "accessor": "StatusPageComponent",
    "op": "load",
    "method": "GET",
    "path": "/api/statuspage_components/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "position": "x",
      "type": "x",
      "name": "x",
      "description": "x",
      "status": "x",
      "uptime_history": "x",
      "monitor": "x",
      "group": "x",
      "statuspage": "x",
      "autopublish": true,
      "children": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "status_page_component",
    "accessor": "StatusPageComponent",
    "op": "remove",
    "method": "DELETE",
    "path": "/api/statuspage_components/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "status_page_component",
    "accessor": "StatusPageComponent",
    "op": "update",
    "method": "PUT",
    "path": "/api/statuspage_components/{key}",
    "args": [
      {
        "name": "key",
        "wire": "key",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [
      {
        "name": "cronitor_version",
        "wire": "Cronitor-Version",
        "value": "h1"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "basic"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "key": "x",
      "position": "x",
      "type": "x",
      "name": "x",
      "description": "x",
      "status": "x",
      "uptime_history": "x",
      "monitor": "x",
      "group": "x",
      "statuspage": "x",
      "autopublish": true,
      "children": "x",
      "created": "2026-01-01T00:00:00Z",
      "updated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "telemetry",
    "accessor": "Telemetry",
    "op": "create",
    "method": "POST",
    "path": "/p/{apiKey}/{monitorKey}",
    "args": [
      {
        "name": "api_key",
        "wire": "apiKey",
        "value": "p1"
      },
      {
        "name": "monitor_key",
        "wire": "monitorKey",
        "value": "p2"
      }
    ],
    "select": {
      "env": "v1",
      "host": "v1",
      "message": "v1",
      "metric": "v1",
      "series": "v1",
      "state": "v1",
      "status_code": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "state",
      "message",
      "series",
      "metric",
      "env",
      "host",
      "status_code"
    ],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "telemetry",
    "accessor": "Telemetry",
    "op": "load",
    "method": "GET",
    "path": "/p/{apiKey}/{monitorKey}",
    "args": [
      {
        "name": "api_key",
        "wire": "apiKey",
        "value": "p1"
      },
      {
        "name": "monitor_key",
        "wire": "monitorKey",
        "value": "p2"
      }
    ],
    "select": {
      "env": "v1",
      "host": "v1",
      "message": "v1",
      "metric": "v1",
      "series": "v1",
      "state": "v1",
      "status_code": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "state",
      "message",
      "series",
      "metric",
      "env",
      "host",
      "status_code"
    ],
    "queryArgs": [
      {
        "name": "env",
        "wire": "env"
      },
      {
        "name": "host",
        "wire": "host"
      },
      {
        "name": "message",
        "wire": "message"
      },
      {
        "name": "metric",
        "wire": "metric"
      },
      {
        "name": "series",
        "wire": "series"
      },
      {
        "name": "state",
        "wire": "state"
      },
      {
        "name": "status_code",
        "wire": "status_code"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
