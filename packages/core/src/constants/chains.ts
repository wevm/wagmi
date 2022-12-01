import type { Chain } from '@wagmi/chains'

export const localhost: Chain = {
  id: 1_337,
  name: 'Localhost',
  network: 'localhost',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
}

export const hardhat: Chain = {
  id: 31_337,
  name: 'Hardhat',
  network: 'hardhat',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
}

export const foundry: Chain = {
  id: 31_337,
  name: 'Foundry',
  network: 'foundry',
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
}
