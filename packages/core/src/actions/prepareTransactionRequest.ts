import type {
  Account,
  Address,
  Chain,
  PrepareTransactionRequestErrorType as viem_PrepareTransactionRequestErrorType,
  PrepareTransactionRequestParameterType as viem_PrepareTransactionRequestParameterType,
  PrepareTransactionRequestParameters as viem_PrepareTransactionRequestParameters,
  PrepareTransactionRequestReturnType as viem_PrepareTransactionRequestReturnType,
} from 'viem'

import { prepareTransactionRequest as viem_prepareTransactionRequest } from 'viem/actions'
import { type Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import { type ChainIdParameter } from '../types/properties.js'

import { type Evaluate, type IsNarrowable } from '../types/utils.js'

export type PrepareTransactionRequestParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Evaluate<
    Omit<
      viem_PrepareTransactionRequestParameters<
        chains[key],
        Account,
        chains[key],
        Account,
        parameterType
      >,
      'chain'
    > &
      ChainIdParameter<config, chainId> & {
        to: Address
      }
  >
}[number]

export type PrepareTransactionRequestReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Evaluate<
    viem_PrepareTransactionRequestReturnType<
      IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined,
      Account,
      chains[key],
      Account,
      parameterType
    >
  >
}[number]

export type PrepareTransactionRequestErrorType =
  viem_PrepareTransactionRequestErrorType

/** https://wagmi.sh/core/api/actions/prepareTransactionRequest */
export async function prepareTransactionRequest<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  parameterType extends viem_PrepareTransactionRequestParameterType,
>(
  config: config,
  parameters: PrepareTransactionRequestParameters<
    config,
    chainId,
    parameterType
  >,
): Promise<
  PrepareTransactionRequestReturnType<config, chainId, parameterType>
> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_prepareTransactionRequest(client, {
    ...(rest as any),
  }) as unknown as Promise<
    PrepareTransactionRequestReturnType<config, chainId, parameterType>
  >
}
