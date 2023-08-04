import { startProxy } from '@viem/anvil'

import { mainnetFork, optimismFork } from './chains'

export default async function () {
  await Promise.all(
    [mainnetFork, optimismFork].map(async (chain) => {
      await startProxy({
        port: chain.port,
        host: '::',
        options: {
          chainId: chain.id,
          forkUrl: chain.fork.url,
          forkBlockNumber: chain.fork.blockNumber,
        },
      })
    }),
  )
}
