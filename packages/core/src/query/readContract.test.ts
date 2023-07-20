import { abi, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { readContractQueryOptions } from './readContract.js'

test('default', () => {
  expect(
    readContractQueryOptions(config, {
      address: '0x',
      abi: abi.erc20,
      functionName: 'balanceOf',
      args: ['0x'],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "readContract",
        {
          "abi": [
            {
              "inputs": [
                {
                  "indexed": true,
                  "name": "owner",
                  "type": "address",
                },
                {
                  "indexed": true,
                  "name": "spender",
                  "type": "address",
                },
                {
                  "name": "value",
                  "type": "uint256",
                },
              ],
              "name": "Approval",
              "type": "event",
            },
            {
              "inputs": [
                {
                  "indexed": true,
                  "name": "from",
                  "type": "address",
                },
                {
                  "indexed": true,
                  "name": "to",
                  "type": "address",
                },
                {
                  "name": "value",
                  "type": "uint256",
                },
              ],
              "name": "Transfer",
              "type": "event",
            },
            {
              "inputs": [
                {
                  "name": "owner",
                  "type": "address",
                },
                {
                  "name": "spender",
                  "type": "address",
                },
              ],
              "name": "allowance",
              "outputs": [
                {
                  "type": "uint256",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [
                {
                  "name": "spender",
                  "type": "address",
                },
                {
                  "name": "amount",
                  "type": "uint256",
                },
              ],
              "name": "approve",
              "outputs": [
                {
                  "type": "bool",
                },
              ],
              "stateMutability": "nonpayable",
              "type": "function",
            },
            {
              "inputs": [
                {
                  "name": "account",
                  "type": "address",
                },
              ],
              "name": "balanceOf",
              "outputs": [
                {
                  "type": "uint256",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [],
              "name": "decimals",
              "outputs": [
                {
                  "type": "uint8",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [],
              "name": "name",
              "outputs": [
                {
                  "type": "string",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [],
              "name": "symbol",
              "outputs": [
                {
                  "type": "string",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [],
              "name": "totalSupply",
              "outputs": [
                {
                  "type": "uint256",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [
                {
                  "name": "recipient",
                  "type": "address",
                },
                {
                  "name": "amount",
                  "type": "uint256",
                },
              ],
              "name": "transfer",
              "outputs": [
                {
                  "type": "bool",
                },
              ],
              "stateMutability": "nonpayable",
              "type": "function",
            },
            {
              "inputs": [
                {
                  "name": "sender",
                  "type": "address",
                },
                {
                  "name": "recipient",
                  "type": "address",
                },
                {
                  "name": "amount",
                  "type": "uint256",
                },
              ],
              "name": "transferFrom",
              "outputs": [
                {
                  "type": "bool",
                },
              ],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "address": "0x",
          "args": [
            "0x",
          ],
          "functionName": "balanceOf",
        },
      ],
    }
  `)
})
