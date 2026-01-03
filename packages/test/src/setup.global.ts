import { Instance, Server } from 'prool'
import { chain as chainLookup } from './chains.js'

export default async function () {
  const promises = []
  for (const chain of Object.values(chainLookup)) {
    const instance = Instance.anvil({
      chainId: chain.id,
      forkBlockNumber: chain.fork.blockNumber,
      forkUrl: chain.fork.url,
      noMining: true,
      // @ts-expect-error
      mnemonicSeedUnsafe: 1,
    })
    promises.push(Server.create({ instance, port: chain.port }).start())
  }

  const results = await Promise.all(promises)

  return async () => {
    await Promise.all(results.map((stop) => stop()))
  }
}
