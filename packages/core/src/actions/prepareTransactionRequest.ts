import {
  type Account,
  type Address,
  type Chain,
  type PrepareTransactionRequestErrorType as viem_PrepareTransactionRequestErrorType,
  type PrepareTransactionRequestParameterType as viem_PrepareTransactionRequestParameterType,
  type PrepareTransactionRequestParameters as viem_PrepareTransactionRequestParameters,
  type PrepareTransactionRequestReturnType as viem_PrepareTransactionRequestReturnType,
} from 'viem'
import { prepareTransactionRequest as viem_prepareTransactionRequest } from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type SelectChains } from '../types/chain.js'
import {
  type ChainIdParameter,
  type ConnectorParameter,
} from '../types/properties.js'
import {
  type Evaluate,
  type IsNarrowable,
  type UnionEvaluate,
  type UnionOmit,
} from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import { getConnectorClient } from './getConnectorClient.js'

export type PrepareTransactionRequestParameters<
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
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
        parameterType
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
  parameterType extends viem_PrepareTransactionRequestParameterType = viem_PrepareTransactionRequestParameterType,
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
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
  > &
    ConnectorParameter & {
      chainId: chains[key]['id']
    }
}[number]

export type PrepareTransactionRequestErrorType =
  viem_PrepareTransactionRequestErrorType

/** https://wagmi.sh/core/api/actions/prepareTransactionRequest */
export async function prepareTransactionRequest<
  config extends Config,
  parameterType extends viem_PrepareTransactionRequestParameterType,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  parameters: PrepareTransactionRequestParameters<
    parameterType,
    config,
    chainId
  >,
): Promise<
  PrepareTransactionRequestReturnType<parameterType, config, chainId>
> {
  const { account, chainId, connector, ...rest } = parameters

  let client
  if (typeof account === 'object' && account.type === 'local')
    client = config.getClient({ chainId })
  else
    client = await getConnectorClient(config, { account, chainId, connector })

  const action = getAction(
    client,
    viem_prepareTransactionRequest,
    'prepareTransactionRequest',
  )
  return action({
    ...rest,
    ...(account ? { account } : {}),
  } as unknown as viem_PrepareTransactionRequestParameters) as unknown as Promise<
    PrepareTransactionRequestReturnType<parameterType, config, chainId>
  >
}
