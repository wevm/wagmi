import { createConfig, createConnector, mock } from '@wagmi/solid'
import { celo, mainnet, optimism, zkSync } from '@wagmi/solid/chains'
import { type Address, http } from 'viem'

export const config = createConfig({
  chains: [celo, mainnet, optimism, zkSync],
  connectors: [mock({ accounts: ['0x'] }), foo()],
  transports: {
    [celo.id]: http(),
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [zkSync.id]: http(),
  },
})

export type ChainId =
  | typeof celo.id
  | typeof mainnet.id
  | typeof optimism.id
  | typeof zkSync.id

declare module '@wagmi/solid' {
  interface Register {
    config: typeof config
  }
}

export function foo() {
  type Properties = {
    // TODO(v3): Make `withCapabilities: true` default behavior
    connect<withCapabilities extends boolean = false>(parameters?: {
      chainId?: number | undefined
      isReconnecting?: boolean | undefined
      capabilities?: {
        signInWithEthereum?: { nonce: string } | undefined
      }
      withCapabilities?: withCapabilities | boolean | undefined
    }): Promise<{
      accounts: withCapabilities extends true
        ? readonly {
            capabilities: {
              signInWithEthereum: {
                message: string
                signature: string
              }
            }
          }[]
        : readonly Address[]
      chainId: number
    }>
  }

  return createConnector<unknown, Properties>((_config) => ({}) as never)
}
