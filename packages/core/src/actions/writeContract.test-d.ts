import { abi, config } from '@wagmi/test'
import { test } from 'vitest'

import { simulateContract } from './simulateContract.js'
import { writeContract } from './writeContract.js'

test('default', async () => {
  await writeContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 123,
  })
})

test('prepareWriteContract', async () => {
  const { request } = await simulateContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 123,
  })
  await writeContract(config, request)
  await writeContract(config, {
    __mode: 'prepared',
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
  })
})
