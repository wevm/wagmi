import { JsonRpcProvider } from '@ethersproject/providers'
import { normalizeHardhatNetworkAccountsConfig } from 'hardhat/internal/core/providers/util'
import { defaultHardhatNetworkParams } from 'hardhat/internal/core/config/default-config'
import { Wallet } from 'ethers/lib/ethers'

import {
  WagmiClientConfig,
  chain,
  createWagmiClient,
  defaultChains,
} from '../src'
import { MockConnector, MockProviderOptions } from '../src/connectors/mock'

class EthersProviderWrapper extends JsonRpcProvider {
  toJSON() {
    return '<WrappedHardhatProvider>'
  }
}

export const getProvider = () => {
  const url = chain.hardhat.rpcUrls[0]
  const network = {
    chainId: chain.hardhat.id,
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    name: chain.hardhat.name,
  }
  return new EthersProviderWrapper(url, network)
}

const accounts = normalizeHardhatNetworkAccountsConfig(
  defaultHardhatNetworkParams.accounts,
)

export const getSigners = () => {
  const provider = getProvider()
  const signers = accounts.map((x) => {
    const wallet = new Wallet(x.privateKey)
    return provider.getSigner(wallet.address)
  })
  return signers
}

export const getMockConnector = (
  options: MockProviderOptions,
  chains = defaultChains,
) => {
  return new MockConnector({
    chains,
    options,
  })
}

type Config = Partial<WagmiClientConfig>
export const setupWagmiClient = (config: Config = {}) => {
  return createWagmiClient({
    connectors: [
      getMockConnector({
        signer: getSigners()[0],
      }),
    ],
    provider: getProvider,
    ...config,
  })
}
