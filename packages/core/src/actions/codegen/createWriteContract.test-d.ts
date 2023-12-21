import { abi, config, mainnet, optimism } from '@wagmi/test'
import { test } from 'vitest'

import { simulateContract } from '../simulateContract.js'
import { createWriteContract } from './createWriteContract.js'

test('default', () => {
  const writeErc20 = createWriteContract({
    abi: abi.erc20,
    address: '0x',
  })

  writeErc20(config, {
    functionName: 'transfer',
    args: ['0x', 123n],
  })
})

test('multichain address', () => {
  const writeErc20 = createWriteContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  writeErc20(config, {
    functionName: 'transfer',
    args: ['0x', 123n],
    chainId: mainnet.id,
    // ^?
  })

  writeErc20(config, {
    functionName: 'transfer',
    args: ['0x', 123n],
    // @ts-expect-error chain id must match address keys
    chainId: 420,
  })

  writeErc20(config, {
    // @ts-expect-error address not allowed
    address: '0x',
    functionName: 'transfer',
    args: ['0x', 123n],
  })
})

test('overloads', () => {
  const writeOverloads = createWriteContract({
    abi: abi.writeOverloads,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  writeOverloads(config, {
    functionName: 'foo',
    args: [],
  })

  writeOverloads(config, {
    functionName: 'foo',
    args: ['0x'],
  })

  writeOverloads(config, {
    functionName: 'foo',
    args: ['0x', '0x'],
  })
})

test('useSimulateContract', async () => {
  const writeErc20 = createWriteContract({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  const { request } = await simulateContract(config, {
    account: '0x',
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })

  writeErc20(config, request)
})

test('functionName', () => {
  const writeErc20 = createWriteContract({
    abi: abi.erc20,
    address: '0x',
    functionName: 'transfer',
  })

  writeErc20(config, {
    args: ['0x', 123n],
  })
})

test('functionName with overloads', () => {
  const writeOverloads = createWriteContract({
    abi: abi.writeOverloads,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
    functionName: 'foo',
  })

  writeOverloads(config, {
    args: [],
  })

  writeOverloads(config, {
    args: ['0x'],
  })

  writeOverloads(config, {
    args: ['0x', '0x'],
  })
})
