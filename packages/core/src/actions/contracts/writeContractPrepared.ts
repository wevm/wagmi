import { PrepareContractTransactionResult } from './prepareContractTransaction'
import {
  SendTransactionPreparedResult,
  sendTransactionPrepared,
} from '../transactions'

export type WriteContractPreparedConfig = {
  request: PrepareContractTransactionResult
}
export type WriteContractPreparedResult = SendTransactionPreparedResult

export async function writeContractPrepared({
  request,
}: WriteContractPreparedConfig): Promise<WriteContractPreparedResult> {
  return await sendTransactionPrepared({ request })
}
