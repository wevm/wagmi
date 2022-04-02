import { chain, defaultChains } from '../constants'
import { WalletConnectConnector } from './walletConnect'

describe('WalletConnectConnector', () => {
  it('inits', () => {
    const connector = new WalletConnectConnector({
      chains: defaultChains,
      options: {
        rpc: {
          [chain.hardhat.id]: chain.hardhat.rpcUrls.default.toString(),
        },
      },
    })
    expect(connector.name).toEqual('WalletConnect')
  })
})
