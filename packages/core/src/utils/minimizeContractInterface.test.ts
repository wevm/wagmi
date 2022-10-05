import { describe, expect, it } from 'vitest'

import { mlootContractConfig } from '../../test'
import { minimizeContractInterface } from './minimizeContractInterface'

describe('minimizeContractInterface', () => {
  it('minimizes contract interface', () => {
    expect(
      minimizeContractInterface({
        abi: mlootContractConfig.abi,
        functionName: 'getRing',
      }),
    ).toMatchInlineSnapshot(`
      [
        {
          "inputs": [
            {
              "name": "tokenId",
              "type": "uint256",
            },
          ],
          "name": "getRing",
          "outputs": [
            {
              "name": "",
              "type": "string",
            },
          ],
          "stateMutability": "view",
          "type": "function",
        },
      ]
    `)
  })

  it('minimizes overloaded contract interface', () => {
    expect(
      minimizeContractInterface({
        abi: [
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
        ],
        functionName: 'getChest',
      }),
    ).toMatchInlineSnapshot(`
      [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256",
            },
          ],
          "name": "getChest",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string",
            },
          ],
          "stateMutability": "view",
          "type": "function",
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256",
            },
            {
              "internalType": "uint256",
              "name": "wagmiId",
              "type": "uint256",
            },
          ],
          "name": "getChest",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string",
            },
          ],
          "stateMutability": "view",
          "type": "function",
        },
      ]
    `)
  })

  it('minmizes contract in human-readable form', () => {
    expect(
      minimizeContractInterface({
        abi: [
          'function getChest(uint256 tokenId) view returns (string)',
          'function getRing(uint256 tokenId) view returns (string)',
          'function getChest(uint256 tokenId, uint256 wagmiId) view returns (string)',
        ],
        functionName: 'getRing',
      }),
    ).toMatchInlineSnapshot(`
      [
        "function getRing(uint256 tokenId) view returns (string)",
      ]
    `)
  })
})
