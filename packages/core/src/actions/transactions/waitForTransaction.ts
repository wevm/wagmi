import { providers } from 'ethers'

import { getProvider } from '../providers'

export type WaitForTransactionArgs = {
  /** Chain id to use for provider */
  chainId?: number
  /**
   * Number of blocks to wait for after transaction is mined
   * @default 1
   */
  confirmations?: number
  /** Transaction hash to monitor */
  hash?: string
  /*
   * Maximum amount of time to wait before timing out in milliseconds
   * @default 0
   */
  timeout?: number
  /** Function resolving to transaction receipt */
  wait?: providers.TransactionResponse['wait']
}

export type WaitForTransactionResult = providers.TransactionReceipt

export async function waitForTransaction({
  chainId,
  confirmations,
  hash,
  timeout,
  wait: wait_,
}: WaitForTransactionArgs): Promise<WaitForTransactionResult> {
  let promise: Promise<providers.TransactionReceipt>
  if (hash) {
    const provider = getProvider({ chainId })
    promise = provider.waitForTransaction(hash, confirmations, timeout)
  } else if (wait_) promise = wait_(confirmations)
  else throw new Error('hash or wait is required')

  return await promise
}
