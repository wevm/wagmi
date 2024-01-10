import { exec } from 'child_process'
import { startProxy } from '@viem/anvil'

import { type Chain, chain as chainLookup } from './chains.js'

export default async function () {
  const promises = []
  for (const chain of Object.values(chainLookup)) {
    promises.push(createProxy(chain))
  }
  await Promise.all(promises)
}

async function createProxy(chain: Chain) {
  try {
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
  } catch (error) {
    if ((error as Error).message.includes('EADDRINUSE')) {
      console.error(
        `createProxy: Chain ${chain.id} - ${(error as Error).message}`,
      )
      exec(`kill -9 $(lsof -t -i:${chain.port})`)
    } else throw error
  }
}
