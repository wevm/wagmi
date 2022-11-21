import type { providers } from 'ethers'
import { toUtf8String } from 'ethers/lib/utils.js'

import type { Hash } from '../../types'
import { getProvider } from '../providers'

export type WaitForTransactionArgs = {
  /** Chain id to use for provider */
  chainId?: number
  /**
   * Number of blocks to wait for after transaction is mined
   * @default 1
   */
  confirmations?: number
  /*
   * Maximum amount of time to wait before timing out in milliseconds
   * @default 0
   */
  timeout?: number
} & (
  | {
      /** Transaction hash to monitor */
      hash: Hash
      wait?: never
    }
  | {
      hash?: never
      /** Function resolving to transaction receipt */
      wait: providers.TransactionResponse['wait']
    }
)

export type WaitForTransactionResult = providers.TransactionReceipt

export async function waitForTransaction({
  chainId,
  confirmations,
  timeout,
  ...args
}: WaitForTransactionArgs): Promise<WaitForTransactionResult> {
  let promise: Promise<providers.TransactionReceipt>
  const provider = getProvider({ chainId })
  if (args.hash) {
    promise = provider.waitForTransaction(args.hash, confirmations, timeout)
    // eslint-disable-next-line testing-library/await-async-utils
  } else promise = args.wait(confirmations)

  const receipt = await promise
  if (receipt.status === 0) {
    const code = await provider.call(receipt, receipt.blockNumber)
    const reason = toUtf8String(`0x${code.substring(138)}`)
    throw new Error(reason)
  }

  return receipt
}
