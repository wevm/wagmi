import { chain, defaultChains } from '../constants'
import { WalletConnectConnector } from './walletConnect'

describe('WalletConnectConnector', () => {
  it('inits', () => {
    const connector = new WalletConnectConnector({
      chains: defaultChains,
      options: {
        rpc: `${chain.hardhat.rpcUrls[0]}`,
      },
    })
    expect(connector.name).toEqual('WalletConnect')
  })
})
