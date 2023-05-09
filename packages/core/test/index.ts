import type { Chain, CreateConfigParameters } from '../src'
import { createConfig } from '../src'
import { MockConnector } from '../src/connectors/mock'
import { getPublicClient, getWalletClients } from './utils'

type Config = Partial<CreateConfigParameters> & { chains?: Chain[] }

export function setupConfig(config: Config = {}) {
  return createConfig({
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
