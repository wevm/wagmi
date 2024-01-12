import {
  type PrepareTransactionRequestErrorType as viem_PrepareTransactionRequestErrorType,
  type PrepareTransactionRequestParameters as viem_PrepareTransactionRequestParameters,
  type PrepareTransactionRequestReturnType as viem_PrepareTransactionRequestReturnType,
  prepareTransactionRequest as viem_prepareTransactionRequest,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'
import { type Evaluate, type UnionLooseOmit } from '../types/utils.js'

export type PrepareTransactionRequestParameters<
  config extends Config = Config,
> = Evaluate<
  UnionLooseOmit<viem_PrepareTransactionRequestParameters, 'chain'> &
    ChainIdParameter<config>
>

export type PrepareTransactionRequestReturnType =
  Evaluate<viem_PrepareTransactionRequestReturnType>

export type PrepareTransactionRequestErrorType =
  viem_PrepareTransactionRequestErrorType

/** https://wagmi.sh/core/api/actions/prepareTransactionRequest */
export async function prepareTransactionRequest<config extends Config>(
  config: config,
  parameters: PrepareTransactionRequestParameters<config>,
): Promise<PrepareTransactionRequestReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_prepareTransactionRequest(
    client,
    rest,
  ) as unknown as Promise<PrepareTransactionRequestReturnType>
}
