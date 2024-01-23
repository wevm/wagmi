import { startProxy } from '@viem/anvil'

import { chain as chainLookup } from './chains.js'

export default async function () {
  const promises = []
  for (const chain of Object.values(chainLookup)) {
    promises.push(
      startProxy({
        port: chain.port,
        host: '::',
        options: {
          chainId: chain.id,
          forkUrl: chain.fork.url,
          forkBlockNumber: chain.fork.blockNumber,
          noMining: true,
        },
      }),
    )
  }
  const results = await Promise.all(promises)

  return () => {
    for (const shutdown of results) {
      shutdown()
    }
  }
}
