import { PopulatedTransaction } from 'ethers'

import {
  SendTransactionPreparedResult,
  sendTransactionPrepared,
} from '../transactions'

export type WriteContractEagerConfig = {
  unsignedTransaction: PopulatedTransaction
}
export type WriteContractEagerResult = SendTransactionPreparedResult

export async function writeContractPrepared({
  unsignedTransaction,
}: WriteContractEagerConfig): Promise<WriteContractEagerResult> {
  return await sendTransactionPrepared({ request: unsignedTransaction })
}
