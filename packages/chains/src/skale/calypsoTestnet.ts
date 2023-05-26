import { type Chain } from '@wagmi/core'

export const skaleCalypsoTestnet = {
  id: 344_106_930,
  name: 'SKALE | Calypso NFT Hub Testnet',
  network: 'skale-calypso-testnet',
  nativeCurrency: { name: 'sFUEL', symbol: 'sFUEL', decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        'https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar',
      ],
    },
    public: {
      http: [
        'https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar',
      ],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'SKALE Explorer',
      url: 'https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com',
    },
    default: {
      name: 'SKALE Explorer',
      url: 'https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com',
    },
  },
  contracts: {},
  testnet: true,
} as const satisfies Chain
