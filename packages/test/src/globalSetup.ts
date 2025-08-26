import { createServer } from 'prool'
import { anvil } from 'prool/instances'

import { chain as chainLookup } from './chains.js'

export default async function () {
  const promises = []
  for (const chain of Object.values(chainLookup)) {
    promises.push(
      createServer({
        instance: anvil({
          chainId: chain.id,
          forkUrl: chain.fork.url,
          forkBlockNumber: chain.fork.blockNumber,
          noMining: true,
        }),
        port: chain.port,
      }).start(),
    )
  }

  const results = await Promise.all(promises)
  return async () => {
    await Promise.all(results.map((stop) => stop()))
  }
}
