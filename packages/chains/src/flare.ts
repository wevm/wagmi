import { type Chain } from '@wagmi/core'

export const flare: Chain = {
  id: 14,
  name: 'Flare Mainnet',
  network: 'flare-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'flare',
    symbol: 'FLR',
  },
  rpcUrls: {
    default: { http: ['https://flare-api.flare.network/ext/C/rpc'] },
    public: { http: ['https://flare-api.flare.network/ext/C/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'Flare Explorer',
      url: 'https://flare-explorer.flare.network',
    },
  },
}
