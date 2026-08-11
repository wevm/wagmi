import { chain } from '@wagmi/test'
import { custom } from 'viem'
import { expect, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { getProof } from './getProof.js'

const proofResponse = {
  address: '0x4200000000000000000000000000000000000016',
  accountProof: ['0x1'],
  balance: '0x0',
  codeHash: `0x${'0'.repeat(64)}`,
  nonce: '0x0',
  storageHash: `0x${'0'.repeat(64)}`,
  storageProof: [
    {
      key: '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      proof: ['0x1'],
      value: '0x0',
    },
  ],
} as const

const config = createConfig({
  chains: [chain.mainnet],
  storage: null,
  transports: {
    [chain.mainnet.id]: custom({
      async request({ method }) {
        if (method === 'eth_getProof') return proofResponse
        if (method === 'eth_chainId')
          return `0x${chain.mainnet.id.toString(16)}`
        throw new Error(`Unexpected RPC method: ${method}`)
      },
    }),
  },
})

test('default', async () => {
  await expect(
    getProof(config, {
      address: '0x4200000000000000000000000000000000000016',
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  ).resolves.toBeDefined()
})
