import { PrepareContractTransactionResult } from './prepareContractTransaction'
import {
  SendTransactionPreparedResult,
  sendTransactionPrepared,
} from '../transactions'

export type WriteContractPreparedConfig = {
  /** The prepared request to use when sending the transaction */
  request: PrepareContractTransactionResult
}
export type WriteContractPreparedResult = SendTransactionPreparedResult

export async function writeContractPrepared({
  request,
}: WriteContractPreparedConfig): Promise<WriteContractPreparedResult> {
  return await sendTransactionPrepared({ request })
}
