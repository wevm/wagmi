import { abi, config } from '@wagmi/test'
import { type Address, http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { expect, expectTypeOf, test } from 'vitest'

import { createConfig } from '../config.js'
import {
  type PrepareWriteContractOptions,
  prepareWriteContractQueryOptions,
} from './prepareWriteContract.js'

test('default', () => {
  expect(
    prepareWriteContractQueryOptions(config, {
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareWriteContract",
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
            "0x",
            123n,
          ],
          "functionName": "transferFrom",
        },
      ],
    }
  `)
})

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = PrepareWriteContractOptions<
    typeof config,
    typeof config['chains'][number]['id'],
    typeof abi.erc20,
    'transferFrom'
  >
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()

  type Result2 = PrepareWriteContractOptions<
    typeof config,
    typeof celo.id,
    typeof abi.erc20,
    'transferFrom'
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()

  type Result3 = PrepareWriteContractOptions<
    typeof config,
    typeof mainnet.id,
    typeof abi.erc20,
    'transferFrom'
  >
  expectTypeOf<Result3>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
  }>()
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
    gatewayFee?: bigint | undefined
    gatewayFeeRecipient?: `0x${string}` | undefined
  }>()
})
