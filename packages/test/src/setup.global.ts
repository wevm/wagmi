import { Instance, Server } from 'prool'
import * as TestContainers from 'prool/testcontainers'
import { chain as chainLookup } from './chains.js'

export default async function () {
  const promises = []
  for (const chain of Object.values(chainLookup)) {
    const instance = (() => {
      if ('fork' in chain)
        return Instance.anvil({
          chainId: chain.id,
          forkBlockNumber: chain.fork.blockNumber,
          forkUrl: chain.fork.url,
          noMining: true,
          // @ts-expect-error
          mnemonicSeedUnsafe: 1,
        })
      return TestContainers.Instance.tempo({
        ...chain.local.args,
        image: `ghcr.io/tempoxyz/tempo:${chain.local.tag}`,
      })
    })()
    promises.push(Server.create({ instance, port: chain.port }).start())
  }

  const results = await Promise.all(promises)

  return async () => {
    await Promise.all(results.map((stop) => stop()))
  }
}
