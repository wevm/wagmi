import { config } from '@wagmi/test'
import { mainnet, zkSync } from 'viem/chains'
import { test } from 'vitest'

import { http } from 'viem'
import { createConfig } from '../createConfig.js'
import { getTransactionConfirmations } from './getTransactionConfirmations.js'

test('default', async () => {
  getTransactionConfirmations(config, {
    transactionReceipt: {
      blockHash: '0x',
      blockNumber: 1n,
      contractAddress: '0x',
      cumulativeGasUsed: 1n,
      effectiveGasPrice: 1n,
      from: '0x',
      gasUsed: 1n,
      l1Fee: 1n,
      logs: [],
      logsBloom: '0x',
      status: 'success',
      to: '0x',
      transactionHash: '0x',
      transactionIndex: 1,
      type: 'eip1559',
    },
  })
})

test('chain formatters', async () => {
  const config = createConfig({
    chains: [mainnet, zkSync],
    transports: { [mainnet.id]: http(), [zkSync.id]: http() },
  })

  const transactionReceipt = {
    blockHash: '0x',
    blockNumber: 1n,
    contractAddress: '0x',
    cumulativeGasUsed: 1n,
    effectiveGasPrice: 1n,
    from: '0x',
    gasUsed: 1n,
    logsBloom: '0x',
    status: 'success',
    to: '0x',
    transactionHash: '0x',
    transactionIndex: 1,
    type: 'eip1559',
  } as const

  getTransactionConfirmations(config, {
    transactionReceipt: {
      ...transactionReceipt,
      l1BatchNumber: 1n,
      l1BatchTxIndex: 1n,
      logs: [],
      l2ToL1Logs: [],
    },
  })

  getTransactionConfirmations(config, {
    chainId: zkSync.id,
    transactionReceipt: {
      ...transactionReceipt,
      l1BatchNumber: 1n,
      l1BatchTxIndex: 1n,
      logs: [],
      l2ToL1Logs: [],
    },
  })

  getTransactionConfirmations(config, {
    chainId: mainnet.id,
    transactionReceipt: {
      ...transactionReceipt,
      // @ts-expect-error
      l1BatchNumber: 1n,
      l1BatchTxIndex: 1n,
      logs: [],
      l2ToL1Logs: [],
    },
  })
})
