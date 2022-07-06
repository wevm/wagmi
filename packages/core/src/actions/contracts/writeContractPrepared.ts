import { BuildContractTransactionResult } from './buildContractTransaction'
import {
  SendTransactionPreparedResult,
  sendTransactionPrepared,
} from '../transactions'

export type WriteContractEagerConfig = {
  unsignedTransaction: BuildContractTransactionResult
}
export type WriteContractEagerResult = SendTransactionPreparedResult

export async function writeContractPrepared({
  unsignedTransaction,
}: WriteContractEagerConfig): Promise<WriteContractEagerResult> {
  return await sendTransactionPrepared({ request: unsignedTransaction })
}
