
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Cronitor',
        slug: "cronitor",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://cronitor.io",

    auth: {
      prefix: 'Basic',
      basic: true,
    },

    headers: {
      "Cronitor-Version": "2025-11-28",
      "content-type": "application/json"
    },

    entity: {
      
        aggregate: {
        },
  
        api_key: {
        },
  
        environment: {
        },
  
        group: {
        },
  
        integration: {
        },
  
        issue: {
        },
  
        maintenance_window: {
        },
  
        metric: {
        },
  
        monitor: {
        },
  
        notification: {
        },
  
        rum_error: {
        },
  
        search: {
        },
  
        site: {
        },
  
        status_page: {
        },
  
        status_page_component: {
        },
  
        telemetry: {
        },
  
    }
  }


  entity = {
    "aggregate": {
      "fields": [],
      "name": "aggregate",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/aggregates",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "aggregates"
                }
              ],
              "parts": [
                "api",
                "aggregates"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "api_key": {
      "fields": [
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "immutable",
          "title": "Immutable",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "kind",
          "title": "Kind",
          "type": "`$STRING`",
          "short": "* `telemetry` - Telemetry * `sdk` - SDK Integration * `custom` - Custom"
        },
        {
          "name": "last_used",
          "title": "Last Used",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "scopes",
          "title": "Scopes",
          "type": "`$ANY`"
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "api_key",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/keys",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "keys"
                }
              ],
              "parts": [
                "api",
                "keys"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/keys",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "keys"
                }
              ],
              "parts": [
                "api",
                "keys"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/keys/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "keys"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "keys",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/keys/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "keys"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "keys",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/keys/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "keys"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "keys",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "environment": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "environment",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/environments",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "environments"
                }
              ],
              "parts": [
                "api",
                "environments"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/environments/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "environments",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/environments",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "environments"
                }
              ],
              "parts": [
                "api",
                "environments"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/environments/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "environments",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/environments/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "environments"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "environments",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "group": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "group",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/groups",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "groups"
                }
              ],
              "parts": [
                "api",
                "groups"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/groups/{key}/pause/{hours}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "groups"
                },
                {
                  "var": "group_id"
                },
                {
                  "lit": "pause"
                },
                {
                  "var": "hour"
                }
              ],
              "parts": [
                "api",
                "groups",
                "{group_id}",
                "pause",
                "{hour}"
              ],
              "rename": {
                "param": {
                  "hours": "hour",
                  "key": "group_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "group_id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "hour",
                    "orig": "hours",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "group_id",
                  "hour"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/groups/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "groups"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "groups",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/groups/{key}/pause",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "groups"
                },
                {
                  "var": "key"
                },
                {
                  "lit": "pause"
                }
              ],
              "parts": [
                "api",
                "groups",
                "{key}",
                "pause"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "pause",
                "exist": [
                  "key"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/groups",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "groups"
                }
              ],
              "parts": [
                "api",
                "groups"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/groups/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "groups"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "groups",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/groups/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "groups"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "groups",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "integration": {
      "fields": [],
      "name": "integration",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/integrations",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "integrations"
                }
              ],
              "parts": [
                "api",
                "integrations"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/integrations/connect",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "integrations"
                },
                {
                  "lit": "connect"
                }
              ],
              "parts": [
                "api",
                "integrations",
                "connect"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {
                "$action": "connect"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/integrations/connect/{token}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "integrations"
                },
                {
                  "lit": "connect"
                },
                {
                  "var": "token"
                }
              ],
              "parts": [
                "api",
                "integrations",
                "connect",
                "{token}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "token"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/integrations",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "integrations"
                }
              ],
              "parts": [
                "api",
                "integrations"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/integrations/services",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "integrations"
                },
                {
                  "lit": "services"
                }
              ],
              "parts": [
                "api",
                "integrations",
                "services"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {
                "$action": "service"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/integrations",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "integrations"
                }
              ],
              "parts": [
                "api",
                "integrations"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "issue": {
      "fields": [
        {
          "name": "affected_components",
          "title": "Affected Components",
          "type": "`$ARRAY`",
          "short": "Status page component keys."
        },
        {
          "name": "alerts",
          "title": "Alerts",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Present with withAlertDetails=true.",
          "readOnly": true
        },
        {
          "name": "assigned_to",
          "title": "Assigned To",
          "type": "`$STRING`",
          "short": "Email address of the assigned team member.",
          "format": "email"
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "created_by",
          "title": "Created By",
          "type": "`$ANY`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "duration",
          "title": "Duration",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Seconds of downtime.",
          "readOnly": true
        },
        {
          "name": "ended",
          "title": "Ended",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "environment",
          "title": "Environment",
          "type": "`$STRING`",
          "short": "Environment key."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "monitors",
          "title": "Monitors",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Null unless withMonitorDetails=true, which includes monitor details.",
          "readOnly": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "severity",
          "title": "Severity",
          "type": "`$ANY`"
        },
        {
          "name": "started",
          "title": "Started",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "state",
          "title": "State",
          "type": "`$STRING`",
          "short": "* `unresolved` - unresolved * `investigating` - investigating * `identified` - identified * `monitoring` - monitoring * `resolved` - resolved * `update` - update"
        },
        {
          "name": "statuspages",
          "title": "Statuspages",
          "type": "`$ARRAY`",
          "short": "Status page keys."
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "updates",
          "title": "Updates",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "issue",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/issues",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "issues"
                }
              ],
              "parts": [
                "api",
                "issues"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "with_alert_detail",
                    "orig": "withAlertDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_component_detail",
                    "orig": "withComponentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_environment_detail",
                    "orig": "withEnvironmentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_monitor_detail",
                    "orig": "withMonitorDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_status_page_detail",
                    "orig": "withStatusPageDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/issues/bulk",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "issues"
                },
                {
                  "lit": "bulk"
                }
              ],
              "parts": [
                "api",
                "issues",
                "bulk"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {
                "$action": "bulk"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/issues",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "issues"
                }
              ],
              "parts": [
                "api",
                "issues"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "check",
                    "orig": "check",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "component",
                    "orig": "component",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "env",
                    "orig": "env",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "group",
                    "orig": "group",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "heartbeat",
                    "orig": "heartbeat",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "job",
                    "orig": "job",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "order_by",
                    "orig": "orderBy",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "severity",
                    "orig": "severity",
                    "type": "`$ARRAY`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "site",
                    "orig": "site",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$ARRAY`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "statuspage",
                    "orig": "statuspage",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "time",
                    "orig": "time",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "with_alert_detail",
                    "orig": "withAlertDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_component_detail",
                    "orig": "withComponentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_environment_detail",
                    "orig": "withEnvironmentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_monitor_detail",
                    "orig": "withMonitorDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_status_page_detail",
                    "orig": "withStatusPageDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_summary",
                    "orig": "withSummary",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/issues/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "issues"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "issues",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "with_alert_detail",
                    "orig": "withAlertDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_component_detail",
                    "orig": "withComponentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_environment_detail",
                    "orig": "withEnvironmentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_monitor_detail",
                    "orig": "withMonitorDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_status_page_detail",
                    "orig": "withStatusPageDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/issues/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "issues"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "issues",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/issues/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "issues"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "issues",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "with_alert_detail",
                    "orig": "withAlertDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_component_detail",
                    "orig": "withComponentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_environment_detail",
                    "orig": "withEnvironmentDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_monitor_detail",
                    "orig": "withMonitorDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_status_page_detail",
                    "orig": "withStatusPageDetails",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "maintenance_window": {
      "fields": [
        {
          "name": "affects_all_monitors",
          "title": "Affects All Monitors",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "affects_statuspage_components",
          "title": "Affects Statuspage Components",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "all_affected_monitors",
          "title": "All Affected Monitors",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "title": "Duration",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Returns the total duration of the maintenance window in seconds.",
          "readOnly": true
        },
        {
          "name": "end",
          "title": "End",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "patch": {
              "type": "`$STRING`"
            }
          },
          "format": "date-time"
        },
        {
          "name": "environment",
          "title": "Environment",
          "type": "`$STRING`",
          "short": "Environment key."
        },
        {
          "name": "groups",
          "title": "Groups",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "monitors",
          "title": "Monitors",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "patch": {
              "type": "`$STRING`"
            }
          }
        },
        {
          "name": "start",
          "title": "Start",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "patch": {
              "type": "`$STRING`"
            }
          },
          "format": "date-time"
        },
        {
          "name": "state",
          "title": "State",
          "type": "`$STRING`",
          "req": true,
          "short": "Returns whether the window is currently past|ongoing|upcoming.",
          "readOnly": true
        },
        {
          "name": "statuspages",
          "title": "Statuspages",
          "type": "`$ARRAY`",
          "short": "Status page keys."
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "maintenance_window",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/maintenance_windows",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "maintenance_windows"
                }
              ],
              "parts": [
                "api",
                "maintenance_windows"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/maintenance_windows",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "maintenance_windows"
                }
              ],
              "parts": [
                "api",
                "maintenance_windows"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/maintenance_windows/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "maintenance_windows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "maintenance_windows",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/api/maintenance_windows/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "maintenance_windows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "maintenance_windows",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/maintenance_windows/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "maintenance_windows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "maintenance_windows",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/maintenance_windows/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "maintenance_windows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "maintenance_windows",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "metric": {
      "fields": [],
      "name": "metric",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/metrics",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "metrics"
                }
              ],
              "parts": [
                "api",
                "metrics"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "monitor": {
      "fields": [
        {
          "name": "assertions",
          "title": "Assertions",
          "type": "`$ARRAY`",
          "short": "Assertions such as \"response.code = 200\" or \"metric.queue_depth < 100\"."
        },
        {
          "name": "attributes",
          "title": "Attributes",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Values derived from the monitor configuration.",
          "readOnly": true
        },
        {
          "name": "badges",
          "title": "Badges",
          "type": "`$OBJECT`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "consecutive_alert_threshold",
          "title": "Consecutive Alert Threshold",
          "type": "`$INTEGER`"
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "defaultName",
          "title": "Default Name",
          "type": "`$STRING`",
          "writeOnly": true
        },
        {
          "name": "defaultNote",
          "title": "Default Note",
          "type": "`$STRING`",
          "writeOnly": true
        },
        {
          "name": "disabled",
          "title": "Disabled",
          "type": "`$BOOLEAN`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "environments",
          "title": "Environments",
          "type": "`$ARRAY`"
        },
        {
          "name": "failure_tolerance",
          "title": "Failure Tolerance",
          "type": "`$INTEGER`",
          "short": "Failures tolerated before an alert."
        },
        {
          "name": "grace_seconds",
          "title": "Grace Seconds",
          "type": "`$INTEGER`",
          "short": "Seconds to wait after a missed or late event before alerting."
        },
        {
          "name": "group",
          "title": "Group",
          "type": "`$STRING`",
          "short": "Group key."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "initialized",
          "title": "Initialized",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the monitor has received telemetry.",
          "readOnly": true
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            },
            "list": {
              "type": "`$STRING`"
            },
            "load": {
              "type": "`$STRING`"
            }
          },
          "short": "Unique monitor key."
        },
        {
          "name": "latest_event",
          "title": "Latest Event",
          "type": "`$ANY`",
          "req": true,
          "short": "Present when the request has withStatus=true (the default).",
          "readOnly": true
        },
        {
          "name": "latest_events",
          "title": "Latest Events",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Latest event of each kind, keyed by event name.",
          "readOnly": true
        },
        {
          "name": "latest_invocations",
          "title": "Latest Invocations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Present with withInvocations=true.",
          "readOnly": true
        },
        {
          "name": "latest_issue",
          "title": "Latest Issue",
          "type": "`$OBJECT`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$STRING`"
        },
        {
          "name": "metric_names",
          "title": "Metric Names",
          "type": "`$ARRAY`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "monitor_list",
          "title": "Monitor List",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "next_expected_at",
          "title": "Next Expected At",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Unix timestamp of the next scheduled run.",
          "readOnly": true
        },
        {
          "name": "note",
          "title": "Note",
          "type": "`$STRING`"
        },
        {
          "name": "notify",
          "title": "Notify",
          "type": "`$ANY`",
          "short": "Notification list keys or inline destinations such as \"email:ops@example.com\"."
        },
        {
          "name": "passing",
          "title": "Passing",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Present when the request has withStatus=true (the default).",
          "readOnly": true
        },
        {
          "name": "paused",
          "title": "Paused",
          "type": "`$BOOLEAN`",
          "req": true,
          "op": {
            "create": {
              "type": "`$BOOLEAN`"
            },
            "list": {
              "type": "`$BOOLEAN`"
            },
            "load": {
              "type": "`$BOOLEAN`"
            }
          }
        },
        {
          "name": "paused_until",
          "title": "Paused Until",
          "type": "`$STRING`",
          "req": true,
          "format": "date-time"
        },
        {
          "name": "platform",
          "title": "Platform",
          "type": "`$STRING`"
        },
        {
          "name": "realert_interval",
          "title": "Realert Interval",
          "type": "`$ANY`",
          "short": "How often to repeat an alert, for example \"8 hours\", or seconds."
        },
        {
          "name": "request",
          "title": "Request",
          "type": "`$OBJECT`",
          "short": "The request a check monitor makes."
        },
        {
          "name": "running",
          "title": "Running",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Present when the request has withStatus=true (the default).",
          "readOnly": true
        },
        {
          "name": "schedule_tolerance",
          "title": "Schedule Tolerance",
          "type": "`$INTEGER`",
          "short": "Missed runs tolerated before an alert."
        },
        {
          "name": "schedules",
          "title": "Schedules",
          "type": "`$ARRAY`",
          "short": "Cron expressions, intervals such as \"every 5 minutes\", or RRULEs."
        },
        {
          "name": "site",
          "title": "Site",
          "type": "`$STRING`",
          "short": "RUM site key."
        },
        {
          "name": "statuspages",
          "title": "Statuspages",
          "type": "`$ARRAY`",
          "short": "Status page keys."
        },
        {
          "name": "tags",
          "title": "Tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "timezone",
          "title": "Timezone",
          "type": "`$STRING`",
          "short": "IANA timezone."
        },
        {
          "name": "tolerated_failures",
          "title": "Tolerated Failures",
          "type": "`$INTEGER`",
          "short": "Use failure_tolerance.",
          "writeOnly": true,
          "deprecated": true
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "monitor",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/monitors",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                }
              ],
              "parts": [
                "api",
                "monitors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/monitors/clone",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                },
                {
                  "lit": "clone"
                }
              ],
              "parts": [
                "api",
                "monitors",
                "clone"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {
                "$action": "clone"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/monitors",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                }
              ],
              "parts": [
                "api",
                "monitors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.monitors`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "env",
                    "orig": "env",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "group",
                    "orig": "group",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "site",
                    "orig": "site",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "tag",
                    "orig": "tag",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$ARRAY`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "with_event",
                    "orig": "withEvents",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_invocation",
                    "orig": "withInvocations",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_status",
                    "orig": "withStatus",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/monitors/{code}/pause/{hours}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                },
                {
                  "var": "monitor_id"
                },
                {
                  "lit": "pause"
                },
                {
                  "var": "hour"
                }
              ],
              "parts": [
                "api",
                "monitors",
                "{monitor_id}",
                "pause",
                "{hour}"
              ],
              "rename": {
                "param": {
                  "code": "monitor_id",
                  "hours": "hour"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "hour",
                    "orig": "hours",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "monitor_id",
                    "orig": "code",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "hour",
                  "monitor_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/monitors/{code}/pause",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                },
                {
                  "var": "code"
                },
                {
                  "lit": "pause"
                }
              ],
              "parts": [
                "api",
                "monitors",
                "{code}",
                "pause"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "code",
                    "orig": "code",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "pause",
                "exist": [
                  "code"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/monitors/{code}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "monitors",
                "{id}"
              ],
              "rename": {
                "param": {
                  "code": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "code",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "env",
                    "orig": "env",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "with_event",
                    "orig": "withEvents",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_invocation",
                    "orig": "withInvocations",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "with_status",
                    "orig": "withStatus",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/monitors/{code}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "monitors",
                "{id}"
              ],
              "rename": {
                "param": {
                  "code": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "code",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/monitors",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                }
              ],
              "parts": [
                "api",
                "monitors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/monitors",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "monitors"
                }
              ],
              "parts": [
                "api",
                "monitors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata.monitor_list`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {
                "exist": [
                  "monitor_list"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "notification": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "notification",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/notifications",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "notifications"
                }
              ],
              "parts": [
                "api",
                "notifications"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/notifications/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "notifications"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "notifications",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/notifications",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "notifications"
                }
              ],
              "parts": [
                "api",
                "notifications"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {}
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/notifications/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "notifications"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "notifications",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/notifications/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "notifications"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "notifications",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rum_error": {
      "fields": [
        {
          "name": "colno",
          "title": "Colno",
          "type": "`$INTEGER`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "environment",
          "title": "Environment",
          "type": "`$STRING`",
          "req": true,
          "short": "Environment key."
        },
        {
          "name": "error_type",
          "title": "Error Type",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "filename",
          "title": "Filename",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "first_seen",
          "title": "First Seen",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "ignored",
          "title": "Ignored",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "last_seen",
          "title": "Last Seen",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "latest_event",
          "title": "Latest Event",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "lineno",
          "title": "Lineno",
          "type": "`$INTEGER`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "occurrences",
          "title": "Occurrences",
          "type": "`$INTEGER`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "site",
          "title": "Site",
          "type": "`$STRING`",
          "req": true,
          "short": "RUM site key."
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        }
      ],
      "name": "rum_error",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/site_errors",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "site_errors"
                }
              ],
              "parts": [
                "api",
                "site_errors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "env",
                    "orig": "env",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "environment",
                    "orig": "environment",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "ignored",
                    "orig": "ignored",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "field": true
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "site",
                    "orig": "site",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/site_errors/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "site_errors"
                },
                {
                  "var": "key"
                }
              ],
              "parts": [
                "api",
                "site_errors",
                "{key}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [],
      "name": "search",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/search",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "api",
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "query",
                    "orig": "query",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "site": {
      "fields": [
        {
          "name": "client_key",
          "title": "Client Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "country_code_denylist",
          "title": "Country Code Denylist",
          "type": "`$STRING`"
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "errors_enabled",
          "title": "Errors Enabled",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "exclude_internal_referrers",
          "title": "Exclude Internal Referrers",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "filter_bots",
          "title": "Filter Bots",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "filter_browser_extensions",
          "title": "Filter Browser Extensions",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "filter_localhost",
          "title": "Filter Localhost",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "ingestion_enabled",
          "title": "Ingestion Enabled",
          "type": "`$BOOLEAN`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "ip_denylist",
          "title": "Ip Denylist",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "origin_allowlist",
          "title": "Origin Allowlist",
          "type": "`$STRING`"
        },
        {
          "name": "path_denylist",
          "title": "Path Denylist",
          "type": "`$STRING`"
        },
        {
          "name": "public_report_enabled",
          "title": "Public Report Enabled",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "public_report_key",
          "title": "Public Report Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "sampling",
          "title": "Sampling",
          "type": "`$INTEGER`"
        },
        {
          "name": "snippet",
          "title": "Snippet",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "webvitals_enabled",
          "title": "Webvitals Enabled",
          "type": "`$BOOLEAN`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "site",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/sites",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "sites"
                }
              ],
              "parts": [
                "api",
                "sites"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/sites/query",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "sites"
                },
                {
                  "lit": "query"
                }
              ],
              "parts": [
                "api",
                "sites",
                "query"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {
                "$action": "query"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/sites",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "sites"
                }
              ],
              "parts": [
                "api",
                "sites"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/sites/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "sites"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "sites",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/sites/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "sites"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "sites",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/sites/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "sites"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "sites",
                "{id}"
              ],
              "rename": {
                "param": {
                  "key": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "id",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "status_page": {
      "fields": [
        {
          "name": "access",
          "title": "Access",
          "type": "`$STRING`",
          "short": "* `public` - public * `password` - password"
        },
        {
          "name": "allow_search_index",
          "title": "Allow Search Index",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "auth_secret",
          "title": "Auth Secret",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "badge_url_dark",
          "title": "Badge Url Dark",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "badge_url_light",
          "title": "Badge Url Light",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "components",
          "title": "Components",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "components_count",
          "title": "Components Count",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "custom_domain",
          "title": "Custom Domain",
          "type": "`$STRING`"
        },
        {
          "name": "default_time_period",
          "title": "Default Time Period",
          "type": "`$STRING`",
          "short": "* `24h` - 24h * `7d` - 7d * `30d` - 30d * `90d` - 90d"
        },
        {
          "name": "enable_dark_mode",
          "title": "Enable Dark Mode",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "enable_performance_metrics",
          "title": "Enable Performance Metrics",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "environment",
          "title": "Environment",
          "type": "`$STRING`",
          "short": "Environment key."
        },
        {
          "name": "hosted_subdomain",
          "title": "Hosted Subdomain",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "ip_allowlist",
          "title": "Ip Allowlist",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "logo_url",
          "title": "Logo Url",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "password",
          "title": "Password",
          "type": "`$STRING`",
          "writeOnly": true
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "support_url",
          "title": "Support Url",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "website_url",
          "title": "Website Url",
          "type": "`$STRING`",
          "format": "uri"
        }
      ],
      "name": "status_page",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/statuspages",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspages"
                }
              ],
              "parts": [
                "api",
                "statuspages"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/statuspages",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspages"
                }
              ],
              "parts": [
                "api",
                "statuspages"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/statuspages/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspages"
                },
                {
                  "var": "key"
                }
              ],
              "parts": [
                "api",
                "statuspages",
                "{key}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/statuspages/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspages"
                },
                {
                  "var": "key"
                }
              ],
              "parts": [
                "api",
                "statuspages",
                "{key}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/statuspages/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspages"
                },
                {
                  "var": "key"
                }
              ],
              "parts": [
                "api",
                "statuspages",
                "{key}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "status_page_component": {
      "fields": [
        {
          "name": "autopublish",
          "title": "Autopublish",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "children",
          "title": "Children",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`"
        },
        {
          "name": "group",
          "title": "Group",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "title": "Key",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "monitor",
          "title": "Monitor",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`"
        },
        {
          "name": "position",
          "title": "Position",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "statuspage",
          "title": "Statuspage",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        },
        {
          "name": "updated",
          "title": "Updated",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true,
          "format": "date-time"
        },
        {
          "name": "uptime_history",
          "title": "Uptime History",
          "type": "`$STRING`",
          "req": true,
          "readOnly": true
        }
      ],
      "name": "status_page_component",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/statuspage_components",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspage_components"
                }
              ],
              "parts": [
                "api",
                "statuspage_components"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/statuspage_components",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspage_components"
                }
              ],
              "parts": [
                "api",
                "statuspage_components"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "query": [
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "page_size",
                    "orig": "pageSize",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "statuspage",
                    "orig": "statuspage",
                    "type": "`$STRING`",
                    "kind": "query",
                    "field": true
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/statuspage_components/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspage_components"
                },
                {
                  "var": "key"
                }
              ],
              "parts": [
                "api",
                "statuspage_components",
                "{key}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/api/statuspage_components/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspage_components"
                },
                {
                  "var": "key"
                }
              ],
              "parts": [
                "api",
                "statuspage_components",
                "{key}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PUT",
              "orig": "/api/statuspage_components/{key}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "statuspage_components"
                },
                {
                  "var": "key"
                }
              ],
              "parts": [
                "api",
                "statuspage_components",
                "{key}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "cronitor_version",
                    "orig": "Cronitor-Version",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ],
                "params": [
                  {
                    "name": "key",
                    "orig": "key",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "key"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "telemetry": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "api_key",
          "monitor_key"
        ],
        "sep": "/"
      },
      "name": "telemetry",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/p/{apiKey}/{monitorKey}",
              "segments": [
                {
                  "lit": "p"
                },
                {
                  "var": "api_key"
                },
                {
                  "var": "monitor_key"
                }
              ],
              "parts": [
                "p",
                "{api_key}",
                "{monitor_key}"
              ],
              "rename": {
                "param": {
                  "apiKey": "api_key",
                  "monitorKey": "monitor_key"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "monitor_key",
                    "orig": "monitorKey",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "env",
                    "orig": "env",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "host",
                    "orig": "host",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "message",
                    "orig": "message",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "metric",
                    "orig": "metric",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "series",
                    "orig": "series",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "status_code",
                    "orig": "status_code",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "monitor_key"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/p/{apiKey}/{monitorKey}",
              "segments": [
                {
                  "lit": "p"
                },
                {
                  "var": "api_key"
                },
                {
                  "var": "monitor_key"
                }
              ],
              "parts": [
                "p",
                "{api_key}",
                "{monitor_key}"
              ],
              "rename": {
                "param": {
                  "apiKey": "api_key",
                  "monitorKey": "monitor_key"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "api_key",
                    "orig": "apiKey",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "monitor_key",
                    "orig": "monitorKey",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "env",
                    "orig": "env",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "host",
                    "orig": "host",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "message",
                    "orig": "message",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "metric",
                    "orig": "metric",
                    "type": "`$ARRAY`",
                    "kind": "query"
                  },
                  {
                    "name": "series",
                    "orig": "series",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "status_code",
                    "orig": "status_code",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "api_key",
                  "monitor_key"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

