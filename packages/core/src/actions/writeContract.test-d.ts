import { abi, config } from '@wagmi/test'
import { test } from 'vitest'

import { prepareWriteContract } from './prepareWriteContract.js'
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
  const result = await prepareWriteContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 123,
  })
  await writeContract(config, result)
  await writeContract(config, {
    mode: 'prepared',
    request: {
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n],
    },
  })
})
