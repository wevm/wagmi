import { fetchLogs } from '@viem/anvil'
import { afterAll, afterEach } from 'vitest'

import { mainnetFork, optimismFork } from './chains'
import { mainnetTestClient, optimismTestClient } from './clients'

afterAll(async () => {
  // Reset your anvil instance to the initial fork block.
  await Promise.all(
    [mainnetTestClient, optimismTestClient].map((client) =>
      client.reset({
        jsonRpcUrl: client.chain.fork.url,
        blockNumber: client.chain.fork.blockNumber,
      }),
    ),
  )
})

afterEach(async (context) => {
  context.onTestFailed(async () => {
    for (const chain of [mainnetFork, optimismFork]) {
      const pool = Number(process.env.VITEST_POOL_ID!)
      // Print the logs of your anvil instances on failures.
      const logs = await fetchLogs(`http://localhost:${chain.port}`, pool)
      // Only print the 20 most recent log messages.
      console.log(...logs.slice(-20))
    }
  })
})
