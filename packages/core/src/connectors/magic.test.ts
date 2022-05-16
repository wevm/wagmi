import { chain, defaultChains } from '../constants'
import { MagicConnector } from './magic'

describe('MagicConnector', () => {
  it('inits', () => {
    const connector = new MagicConnector({
      chains: defaultChains,
      options: {
        apiKey: process.env.MAGIC_API_KEY,
        network: {
          rpcUrl: chain.hardhat.rpcUrls.default.toString(),
          chainId: chain.hardhat.id,
        },
      },
    })
    expect(connector.name).toEqual('Magic')
  })
})
