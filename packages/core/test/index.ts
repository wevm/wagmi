import { Chain, ClientConfig, createClient } from '../src'
import { MockConnector } from '../src/connectors/mock'
import { getProvider, getSigners } from './utils'

type Config = Partial<ClientConfig> & { chains?: Chain[] }

export function setupClient(config: Config = {}) {
  return createClient({
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0]!,
        },
      }),
    ],
    provider: ({ chainId }) => getProvider({ chainId, chains: config.chains }),
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
  getProvider,
  getRandomTokenId,
  getWebSocketProvider,
  getSigners,
} from './utils'

/**
 * Assert parameter is of a specific type.
 *
 * @param value - Value that should be identical to type `T`.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function expectType<T>(value: T): void {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}
