import { http, createConfig, createStorage } from '@wagmi/solid'
import { mainnet, optimism, sepolia } from '@wagmi/solid/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism],
  connectors: [],
  storage: createStorage({ storage: localStorage, key: 'devtools' }),
  transports: {
    [mainnet.id]: http(
      'https://eth-mainnet.g.alchemy.com/v2/StF61Ht3J9nXAojZX-b21LVt9l0qDL38',
    ),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/roJyEHxkj7XWg1T9wmYnxvktDodQrFAS',
    ),
    [optimism.id]: http(),
  },
})
