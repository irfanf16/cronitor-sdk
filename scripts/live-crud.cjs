const assert = require('node:assert/strict')
const { randomUUID } = require('node:crypto')
const { CronitorSDK } = require('../ts/dist/CronitorSDK')

async function main() {
  assert.ok(process.env.CRONITOR_API_KEY, 'CRONITOR_API_KEY is required')
  const client = new CronitorSDK({ apikey: process.env.CRONITOR_API_KEY })
  const key = 'voxgig-sdk-test-' + randomUUID()
  let cleanupRequired = false
  let stage = 'create'
  try {
    cleanupRequired = true
    const created = await client.Monitor().create({
      key, type: 'heartbeat', name: 'Voxgig SDK temporary test',
      schedules: ['every 1 day'], paused: true, notify: [],
    })
    assert.equal(created.data().key, key)
    console.log('PASS: generated Monitor.create (temporary paused monitor, notifications disabled).')

    stage = 'load'
    const loaded = await client.Monitor().load({ id: key })
    assert.equal(loaded.data().key, key)
    assert.equal(loaded.data().paused, true)
    console.log('PASS: generated Monitor.load.')

    stage = 'update'
    await client.Monitor().update({ monitor_list: [{
      key, type: 'heartbeat', name: 'Voxgig SDK updated temporary test',
      paused: true, notify: [],
    }] })
    const updated = await client.Monitor().load({ id: key })
    assert.equal(updated.data().name, 'Voxgig SDK updated temporary test')
    assert.equal(updated.data().paused, true)
    console.log('PASS: generated Monitor.update, confirmed by a fresh load.')

    stage = 'list'
    const list = await client.Monitor().list({ search: key })
    assert.ok(list.some(item => (typeof item.data === 'function' ? item.data() : item).key === key))
    console.log('PASS: generated Monitor.list finds the temporary record.')

    stage = 'remove'
    await client.Monitor().remove({ id: key })
    cleanupRequired = false
    const missing = await client.direct({ path: '/api/monitors/{id}', method: 'GET', params: { id: key } })
    assert.equal(missing.status, 404)
    console.log('PASS: generated Monitor.remove; subsequent GET returns HTTP 404.')
  } catch (error) {
    const redact = value => String(value)
      .replaceAll(process.env.CRONITOR_API_KEY, '[REDACTED]')
      .replaceAll(Buffer.from(process.env.CRONITOR_API_KEY + ':').toString('base64'), '[REDACTED]')
      .replace(/[a-f0-9]{32}/gi, '[REDACTED]')
    console.error('Diagnostic:', redact(error.message).slice(0, 1200))
    if (error.result) console.error('API validation:', redact(JSON.stringify(error.result.resdata ?? error.result.body ?? {})).slice(0, 1200))
    throw new Error('Live CRUD failed at stage: ' + stage + '. Sensitive error details suppressed.')
  } finally {
    if (cleanupRequired) {
      const result = await client.direct({ path: '/api/monitors/{id}', method: 'DELETE', params: { id: key } })
      if (![204, 404].includes(result.status)) {
        console.error('Temporary monitor cleanup could not be confirmed; inspect the account for voxgig-sdk-test monitors.')
        process.exitCode = 1
      } else console.log('Cleanup: temporary test monitor removed or already absent.')
    }
  }
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
