const assert = require('node:assert/strict')
const { CronitorSDK } = require('../ts/dist/CronitorSDK')

async function main() {
  const apikey = process.env.CRONITOR_API_KEY
  if (!apikey) throw new Error('Set CRONITOR_API_KEY in .env before running this test.')
  const client = new CronitorSDK({ apikey })
  const result = await client.direct({
    path: '/api/monitors', method: 'GET', query: { page: 1, pageSize: 5 },
  })
  assert.equal(result.ok, true, `Live list failed (HTTP ${result.status ?? 'transport error'}).`)
  assert.equal(result.status, 200)
  assert.ok(Array.isArray(result.data.monitors), 'Expected versioned monitors response')
  const monitors = await client.Monitor().list({ page: 1, page_size: 5 })
  assert.ok(Array.isArray(monitors))
  console.log('PASS: authenticated direct list and generated Monitor.list (read only).')
  console.log(`Monitor count on first page: ${monitors.length}`)
  if (result.data.monitors.length) {
    const id = result.data.monitors[0].code
    if (id) {
      await client.Monitor().load({ id })
      console.log('PASS: generated Monitor.load.')
    }
  }
}

main().catch(() => {
  console.error('Live smoke test failed. Check the key, monitor:read scope, network and API response. No credentials or account data were printed.')
  process.exitCode = 1
})
