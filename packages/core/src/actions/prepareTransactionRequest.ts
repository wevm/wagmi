import type {
  Account,
  Address,
  Calls,
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
  IsNarrowable,
  UnionCompute,
  UnionStrictOmit,
} from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import { getConnectorClient } from './getConnectorClient.js'

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
  [key in keyof chains]: UnionCompute<
    | (PrepareTransactionRequestParameters_base<
        config,
        chainId,
        request,
        chains[key]
      > & {
        calls?: undefined
        to: Address
      })
    | (UnionStrictOmit<
        PrepareTransactionRequestParameters_base<
          config,
          chainId,
          request,
          chains[key]
        >,
        'to'
      > & {
        calls: Calls<readonly unknown[]>
        to?: Address | undefined
      })
  >
}[number]
type PrepareTransactionRequestParameters_base<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  request extends viem_PrepareTransactionRequestRequest<Chain, Chain>,
  chain extends Chain,
> = UnionStrictOmit<
  viem_PrepareTransactionRequestParameters<
    chain,
    Account,
    chain,
    Account | Address,
    request extends viem_PrepareTransactionRequestRequest<chain, chain>
      ? request
      : never
  >,
  'chain'
> &
  ChainIdParameter<config, chainId>

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
  [key in keyof chains]: viem_PrepareTransactionRequestReturnType<
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

  let account: Address | Account | undefined
  if (account_) account = account_
  else {
    const connectorClient = await getConnectorClient(config, {
      account: account_,
      assertChainId: false,
      chainId,
    })
    account = connectorClient.account
  }

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
