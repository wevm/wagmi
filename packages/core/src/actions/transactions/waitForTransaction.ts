import type { TransactionResponse } from '@ethersproject/providers'
import type { ResolvedConfig } from 'abitype'
import type { providers } from 'ethers'
import { toUtf8String } from 'ethers/lib/utils.js'

import type { Hash } from '../../types'
import { fetchBlockNumber } from '../network-status'
import { getProvider } from '../providers'
import { fetchTransaction } from './fetchTransaction'

type EthersReplaceable = {
  data: string
  from: string
  nonce: number
  to: string
  value: ResolvedConfig['BigIntType']
  startBlock: number
}

export type WaitForTransactionArgs = {
  /** Chain id to use for provider */
  chainId?: number
  /**
   * Number of blocks to wait for after transaction is mined
   * @default 1
   */
  confirmations?: number
  /** Transaction hash to monitor */
  hash: Hash
  /** Callback to invoke when the transaction has been sped up. */
  onSpeedUp?: (transaction: TransactionResponse) => void
  /*
   * Maximum amount of time to wait before timing out in milliseconds
   * @default 0
   */
  timeout?: number
}

export type WaitForTransactionResult = providers.TransactionReceipt

export async function waitForTransaction({
  chainId,
  confirmations = 1,
  hash,
  onSpeedUp,
  timeout = 0,
}: WaitForTransactionArgs): Promise<WaitForTransactionResult> {
  const provider = getProvider({ chainId })

  const [blockNumber, transaction] = await Promise.all([
    fetchBlockNumber(),
    fetchTransaction({ hash }),
  ])

  let replaceable: EthersReplaceable | null = null
  if (confirmations !== 0 && transaction?.to) {
    replaceable = {
      data: transaction.data,
      from: transaction.from,
      nonce: transaction.nonce,
      startBlock: blockNumber,
      to: transaction.to,
      value: transaction.value,
    }
  }

  try {
    const receipt = await provider._waitForTransaction(
      hash,
      confirmations,
      timeout,
      replaceable!,
    )
    if (receipt.status === 0) {
      const code = await provider.call(receipt, receipt.blockNumber)
      const reason = toUtf8String(`0x${code.substring(138)}`)
      throw new Error(reason)
    }
    return receipt
  } catch (err: any) {
    if (err?.reason === 'repriced') {
      onSpeedUp?.(err.replacement as TransactionResponse)
      return waitForTransaction({
        hash: err.replacement?.hash,
        confirmations,
        timeout,
      })
    }
    throw err
  }
}
