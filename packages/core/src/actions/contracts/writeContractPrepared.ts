import { PrepareContractTransactionResult } from './prepareContractTransaction'
import {
  SendTransactionPreparedResult,
  sendTransactionPrepared,
} from '../transactions'

export type WriteContractPreparedConfig = {
  /** The prepared request to use when sending the transaction */
  preparedRequest: PrepareContractTransactionResult
}
export type WriteContractPreparedResult = SendTransactionPreparedResult

export async function writeContractPrepared({
  preparedRequest,
}: WriteContractPreparedConfig): Promise<WriteContractPreparedResult> {
  return await sendTransactionPrepared({ preparedRequest })
}
