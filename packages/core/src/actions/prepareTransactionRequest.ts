import type {
  Account,
  Address,
  Chain,
  PrepareTransactionRequestErrorType as viem_PrepareTransactionRequestErrorType,
  PrepareTransactionRequestParameters as viem_PrepareTransactionRequestParameters,
  PrepareTransactionRequestRequest as viem_PrepareTransactionRequestRequest,
  PrepareTransactionRequestReturnType as viem_PrepareTransactionRequestReturnType,
} from 'viem'
import { prepareTransactionRequest as viem_prepareTransactionRequest } from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { ChainIdParameter } from '../types/properties.js'
import type {
  Evaluate,
  IsNarrowable,
  UnionEvaluate,
  UnionOmit,
} from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import { getAccount } from './getAccount.js'

export type PrepareTransactionRequestParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  > = viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionEvaluate<
    UnionOmit<
      viem_PrepareTransactionRequestParameters<
        chains[key],
        Account,
        chains[key],
        Account | Address,
        request extends viem_PrepareTransactionRequestRequest<
          chains[key],
          chains[key]
        >
          ? request
          : never
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
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  > = viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Evaluate<
    viem_PrepareTransactionRequestReturnType<
      IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined,
      Account,
      chains[key],
      Account,
      request extends viem_PrepareTransactionRequestRequest<
        IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined,
        chains[key]
      >
        ? request
        : never
    >
  > & {
    chainId: chains[key]['id']
  }
}[number]

export type PrepareTransactionRequestErrorType =
  viem_PrepareTransactionRequestErrorType

/** https://wagmi.sh/core/api/actions/prepareTransactionRequest */
export async function prepareTransactionRequest<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  const request extends viem_PrepareTransactionRequestRequest<
    SelectChains<config, chainId>['0'],
    SelectChains<config, chainId>['0']
  >,
>(
  config: config,
  parameters: PrepareTransactionRequestParameters<config, chainId, request>,
): Promise<PrepareTransactionRequestReturnType<config, chainId, request>> {
  const { account: account_, chainId, ...rest } = parameters

  const account = account_ ?? getAccount(config).address
  const client = config.getClient({ chainId })

  const action = getAction(
    client,
    viem_prepareTransactionRequest,
    'prepareTransactionRequest',
  )
  return action({
    ...rest,
    ...(account ? { account } : {}),
  } as unknown as viem_PrepareTransactionRequestParameters) as unknown as Promise<
    PrepareTransactionRequestReturnType<config, chainId, request>
  >
}
