import { fetchLogs } from '@viem/anvil'
import { afterAll, afterEach } from 'vitest'

import { chain } from './chain.js'
import { testClient } from './config.js'
import { pool } from './constants.js'

afterAll(async () => {
  // If you are using a fork, you can reset your anvil instance to the initial fork block.
  await Promise.all(
    Object.values(testClient).map((client) =>
      client.reset({
        jsonRpcUrl: client.chain.fork.url,
        blockNumber: client.chain.fork.blockNumber,
      }),
    ),
  )
})

afterEach(async (context) => {
  context.onTestFailed(async () => {
    // If a test fails, you can fetch and print the logs of your anvil instance.
    const logs = await fetchLogs(`http://localhost:${chain.mainnet.port}`, pool)
    // Only print the 20 most recent log messages.
    console.log(...logs.slice(-20))
  })
})
