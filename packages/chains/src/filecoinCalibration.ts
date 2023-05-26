import { type Chain } from '@wagmi/core'

export const filecoinCalibration: Chain = {
  id: 314_159,
  name: 'Filecoin Calibration',
  network: 'filecoin-calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'testnet filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: { http: ['https://api.calibration.node.glif.io/rpc/v1'] },
    public: { http: ['https://api.calibration.node.glif.io/rpc/v1'] },
  },
  blockExplorers: {
    default: { name: 'Filscan', url: 'https://calibration.filscan.io' },
  },
} as const satisfies Chain
