import { type Chain } from '@wagmi/core'

export const songbirdTestnet: Chain = {
  id: 16,
  name: 'Coston',
  network: 'coston',
  nativeCurrency: {
    decimals: 18,
    name: 'costonflare',
    symbol: 'CFLR',
  },
  rpcUrls: {
    default: { http: ['https://coston-api.flare.network/ext/C/rpc'] },
    public: { http: ['https://coston-api.flare.network/ext/C/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'Coston Explorer',
      url: 'https://coston-explorer.flare.network',
    },
  },
  testnet: true,
}
