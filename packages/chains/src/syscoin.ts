import { type Chain } from '@wagmi/core'

export const syscoin = {
  id: 57,
  name: 'Syscoin Mainnet',
  network: 'syscoin',
  nativeCurrency: {
    decimals: 8,
    name: 'Syscoin',
    symbol: 'SYS',
  },
  rpcUrls: {
    default: { http: ['https://rpc.syscoin.org'] },
    public: { http: ['https://rpc.syscoin.org'] },
  },
  blockExplorers: {
    default: { name: 'SyscoinExplorer', url: 'https://explorer.syscoin.org' },
  },
  contracts: {
    multicall3: {
      address: '0x000562033783B1136159E10d976B519C929cdE8e',
      blockCreated: 80637,
    },
  },
} as const satisfies Chain
