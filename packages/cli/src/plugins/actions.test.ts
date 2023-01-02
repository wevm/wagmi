import { describe, expect, it } from 'vitest'

import { format } from '../utils'

import { actions } from './actions'

const abi = [
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [{ name: 'name', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'from',
        type: 'address',
      },
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
      },
    ],
    outputs: [],
  },
] as const

describe('actions', () => {
  describe('run', () => {
    describe('isTypeScript', () => {
      it('true', async () => {
        const { imports, content } = await actions().run({
          contracts: [
            {
              name: 'Wagmi',
              address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
              abi,
              content: '',
              meta: {
                abiName: 'WagmiAbi',
                addressName: 'WagmiAddress',
                configName: 'WagmiConfig',
              },
            },
          ],
          isTypeScript: true,
        })
        await expect(
          format(`${imports}\n\n${content}`),
        ).resolves.toMatchSnapshot()
      })

      it('false', async () => {
        const { imports, content } = await actions().run({
          contracts: [
            {
              name: 'Wagmi',
              address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
              abi,
              content: '',
              meta: {
                abiName: 'WagmiAbi',
                addressName: 'WagmiAddress',
                configName: 'WagmiConfig',
              },
            },
          ],
          isTypeScript: false,
        })
        await expect(
          format(`${imports}\n\n${content}`),
        ).resolves.toMatchSnapshot()
      })
    })
  })
})
