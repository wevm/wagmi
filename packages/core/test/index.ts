import { providers } from 'ethers'
import {
  MockConnector,
  defaultChains,
  infuraApiKey,
  wallets,
} from 'wagmi-testing'

import { WagmiClientConfig, createWagmiClient } from '../src'

type Config = Partial<WagmiClientConfig> & {
  chainId?: number
}

export const setupWagmiClient = (config?: Config) => {
  const network = config?.chainId ?? 1
  return createWagmiClient({
    connectors: [
      new MockConnector({
        chains: defaultChains,
        options: {
          network,
          privateKey: wallets.ethers1.privateKey,
        },
      }),
    ],
    provider: new providers.InfuraProvider(network, infuraApiKey),
    ...config,
  })
}
