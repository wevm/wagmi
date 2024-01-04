import { fetchLogs } from '@viem/anvil'
import { afterAll, afterEach } from 'vitest'

import { chain } from './chains.js'
import { testClient } from './clients.js'
import { pool } from './constants.js'

afterAll(async () => {
  // If you are using a fork, you can reset your anvil instance to the initial fork block.
  await Promise.all(
    Object.values(testClient).map((client) => client.resetFork()),
  )
})

afterEach(async (context) => {
  context.onTestFailed(async () => {
    for (const testChain of Object.values(chain)) {
      // If a test fails, you can fetch and print the logs of your anvil instance.
      const logs = await fetchLogs(`http://localhost:${testChain.port}`, pool)
      // Only print the 20 most recent log messages.
      console.log(...logs.slice(-20))
    }
  })
})
