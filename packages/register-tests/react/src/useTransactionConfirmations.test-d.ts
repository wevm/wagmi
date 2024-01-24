import { config as testConfig } from '@wagmi/test'
import { test } from 'vitest'
import { useTransactionConfirmations } from 'wagmi'
import { mainnet, zkSync } from 'wagmi/chains'

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

test('chain formatters', async () => {
  useTransactionConfirmations({
    transactionReceipt: {
      ...transactionReceipt,
      l1BatchNumber: 1n,
      l1BatchTxIndex: 1n,
      logs: [],
      l2ToL1Logs: [],
    },
  })

  useTransactionConfirmations({
    chainId: zkSync.id,
    transactionReceipt: {
      ...transactionReceipt,
      l1BatchNumber: 1n,
      l1BatchTxIndex: 1n,
      logs: [],
      l2ToL1Logs: [],
    },
  })

  useTransactionConfirmations({
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

test('parameters: config', async () => {
  useTransactionConfirmations({
    config: testConfig,
    transactionReceipt: {
      ...transactionReceipt,
      // @ts-expect-error
      l1BatchNumber: 1n,
    },
  })
})
