import { createConfig, http } from 'wagmi'
import { base, celo, mainnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [base, celo, mainnet],
  transports: {
    [base.id]: http(),
    [celo.id]: http(),
    [mainnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
