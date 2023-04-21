import type { Chain, ClientConfig } from '../src'
import { createClient } from '../src'
import { MockConnector } from '../src/connectors/mock'
import { getPublicClient, getWalletClients } from './utils'

type Config = Partial<ClientConfig> & { chains?: Chain[] }

export function setupClient(config: Config = {}) {
  return createClient({
    connectors: [
      new MockConnector({
        options: {
          walletClient: getWalletClients()[0]!,
        },
      }),
    ],
    publicClient: ({ chainId }) =>
      getPublicClient({ chainId, chains: config.chains }),
    ...config,
  })
}

export {
  mirrorCrowdfundContractConfig,
  mlootContractConfig,
  wagmiContractConfig,
  wagmigotchiContractConfig,
} from './constants'
export {
  getCrowdfundArgs,
  getPublicClient,
  getRandomTokenId,
  getWalletClients,
  getWebSocketPublicClient,
  testChains,
} from './utils'
