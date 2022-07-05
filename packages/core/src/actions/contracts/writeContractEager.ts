import { PopulatedTransaction } from 'ethers'

import {
  SendTransactionEagerResult,
  sendTransactionEager,
} from '../transactions'

export type WriteContractEagerConfig = {
  unsignedTransaction: PopulatedTransaction
}
export type WriteContractEagerResult = SendTransactionEagerResult

export async function writeContractEager({
  unsignedTransaction,
}: WriteContractEagerConfig): Promise<WriteContractEagerResult> {
  return await sendTransactionEager({ request: unsignedTransaction })
}
