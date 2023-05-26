import { type Chain } from '@wagmi/core'

export const flareTestnet: Chain = {
  id: 114,
  name: 'Coston2',
  network: 'coston2',
  nativeCurrency: {
    decimals: 18,
    name: 'coston2flare',
    symbol: 'C2FLR',
  },
  rpcUrls: {
    default: { http: ['https://coston2-api.flare.network/ext/C/rpc'] },
    public: { http: ['https://coston2-api.flare.network/ext/C/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'Coston2 Explorer',
      url: 'https://coston2-explorer.flare.network',
    },
  },
  testnet: true,
}
