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
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type {
  IsNarrowable,
  UnionCompute,
  UnionStrictOmit,
} from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import { getConnectorAccount } from './getConnectorAccount.js'
import type { GetConnectorClientErrorType } from './getConnectorClient.js'

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
    UnionStrictOmit<
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
      ChainIdParameter<config, chainId> &
      ConnectorParameter & {
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
  | GetConnectorClientErrorType
  | BaseErrorType
  | ErrorType
  | viem_PrepareTransactionRequestErrorType

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
  const { chainId, connector, ...rest } = parameters

  const account = await getConnectorAccount(config, {
    account: parameters.account,
    chainId,
    connector,
    required: false,
  })

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
