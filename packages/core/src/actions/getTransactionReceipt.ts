import {
  type GetTransactionReceiptErrorType as viem_GetTransactionReceiptErrorType,
  type GetTransactionReceiptParameters as viem_GetTransactionReceiptParameters,
  type GetTransactionReceiptReturnType as viem_GetTransactionReceiptReturnType,
  getTransactionReceipt as viem_getTransactionReceipt,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'

export type GetTransactionReceiptParameters<config extends Config = Config> =
  Evaluate<viem_GetTransactionReceiptParameters & ChainIdParameter<config>>

export type GetTransactionReceiptReturnType =
  viem_GetTransactionReceiptReturnType

export type GetTransactionReceiptErrorType = viem_GetTransactionReceiptErrorType

/** https://wagmi.sh/core/api/actions/getTransactionReceipt */
export async function getTransactionReceipt<config extends Config>(
  config: config,
  parameters: GetTransactionReceiptParameters<config>,
): Promise<GetTransactionReceiptReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_getTransactionReceipt(client, rest)
}
