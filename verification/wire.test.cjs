const { test } = require('node:test')
const assert = require('node:assert/strict')
const { CronitorSDK } = require('../ts/dist/CronitorSDK')

function clientWithResponse(body, status = 200) {
  const calls = []
  const client = new CronitorSDK({
    apikey: 'synthetic-test-key',
    system: {
      fetch: async (url, options) => {
        calls.push({ url: String(url), options })
        return new Response(JSON.stringify(body), {
          status,
          headers: { 'content-type': 'application/json' },
        })
      },
    },
  })
  return { client, calls }
}

test('monitor list sends Basic auth, version and original query names', async () => {
  const { client, calls } = clientWithResponse({
    monitors: [{ code: 'abc123', key: 'demo', name: 'Demo' }],
    page: 1, page_size: 5, total_monitor_count: 1, version: '2025-11-28',
  })
  const monitors = await client.Monitor().list({ page: 1, page_size: 5 })
  assert.equal(monitors.length, 1)
  const { url, options } = calls[0]
  const parsed = new URL(url)
  assert.equal(parsed.origin, 'https://cronitor.io')
  assert.equal(parsed.pathname, '/api/monitors')
  assert.equal(parsed.searchParams.get('pageSize'), '5')
  const headers = new Headers(options.headers)
  assert.equal(headers.get('authorization'), 'Basic ' + Buffer.from('synthetic-test-key:').toString('base64'))
  assert.equal(headers.get('cronitor-version'), '2025-11-28')
})

test('monitor load uses the requested monitor resource', async () => {
  const { client, calls } = clientWithResponse({ code: 'abc123', key: 'demo', name: 'Demo' })
  const monitor = await client.Monitor().load({ id: 'abc123' })
  assert.equal(new URL(calls[0].url).pathname, '/api/monitors/abc123')
  assert.equal(monitor.data().name, 'Demo')
})

test('direct request exposes an authentication failure', async () => {
  const { client } = clientWithResponse({ error: { message: 'Invalid API key' } }, 401)
  const result = await client.direct({ path: '/api/monitors', method: 'GET' })
  assert.equal(result.ok, false)
  assert.equal(result.status, 401)
})
