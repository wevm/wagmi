import { startProxy } from '@viem/anvil'

import { chain } from './chains.js'

export default async function () {
  await Promise.all(
    Object.values(chain).map(async (chain) => {
      await startProxy({
        port: chain.port,
        host: '::',
        options: {
          chainId: chain.id,
          forkUrl: chain.fork.url,
          forkBlockNumber: chain.fork.blockNumber,
          noMining: true,
        },
      })
    }),
  )
}
