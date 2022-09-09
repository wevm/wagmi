import { Interface } from 'ethers/lib/utils'
import { describe, expect, it } from 'vitest'

import { mlootContractConfig } from '../../test'
import { minimizeContractInterface } from './minimizeContractInterface'

describe('minimizeContractInterface', () => {
  it('minimizes contract interface', () => {
    expect(
      minimizeContractInterface({
        contractInterface: new Interface(mlootContractConfig.contractInterface),
        functionName: 'getRing',
      }),
    ).toMatchInlineSnapshot(`
      [
        "function getRing(uint256 tokenId) view returns (string)",
      ]
    `)
  })

  it('minimizes overloaded contract interface', () => {
    expect(
      minimizeContractInterface({
        contractInterface: new Interface([
          {
            inputs: [
              { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            ],
            name: 'getChest',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
              { internalType: 'uint256', name: 'wagmiId', type: 'uint256' },
            ],
            name: 'getChest',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
        ]),
        functionName: 'getChest',
      }),
    ).toMatchInlineSnapshot(`
      [
        "function getChest(uint256 tokenId) view returns (string)",
        "function getChest(uint256 tokenId, uint256 wagmiId) view returns (string)",
      ]
    `)
  })
})
