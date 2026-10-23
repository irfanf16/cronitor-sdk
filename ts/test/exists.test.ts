
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CronitorSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CronitorSDK.test()
    equal(testsdk instanceof CronitorSDK, true,
      'CronitorSDK.test() must return a client synchronously')
  })

})
