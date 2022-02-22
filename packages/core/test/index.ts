import { providers } from 'ethers'
import {
  MockConnector,
  defaultChains,
  infuraApiKey,
  wallets,
} from 'wagmi-testing'

import { createWagmiClient } from '../src'
import { WagmiClientConfig } from '../src/client'

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
      }) as any,
    ],
    provider: new providers.InfuraProvider(network, infuraApiKey),
    ...config,
  })
}

export const getProvider = ({ chainId }: { chainId?: number } = {}) =>
  new providers.InfuraProvider(chainId ?? 1, infuraApiKey)
