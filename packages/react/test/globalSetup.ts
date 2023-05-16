import { startProxy } from '@viem/anvil'

import { forkBlockNumber, forkUrl, testChains } from './constants.js'

export default async function () {
  await Promise.all(
    Object.values(testChains).map(async (chain) => {
      await startProxy({
        port: chain.port,
        host: '::',
        options: {
          chainId: chain.id,
          forkUrl,
          forkBlockNumber,
        },
      })
    }),
  )
}
