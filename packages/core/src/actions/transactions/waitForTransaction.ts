import type {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'

import { getProvider } from '../providers'

export type WaitForTransactionArgs = {
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
  wait?: TransactionResponse['wait']
}

export type WaitForTransactionResult = TransactionReceipt

export async function waitForTransaction(
  args: WaitForTransactionArgs,
): Promise<WaitForTransactionResult> {
  const provider = getProvider()

  let promise: Promise<TransactionReceipt>
  // eslint-disable-next-line testing-library/await-async-utils
  if (args.wait) promise = args.wait(args.confirmations)
  else if (args.hash)
    promise = provider.waitForTransaction(
      args.hash,
      args.confirmations,
      args.timeout,
    )
  else throw new Error('hash or wait is required')

  const receipt = await promise
  return receipt
}
