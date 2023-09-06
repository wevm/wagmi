import type { Account, Address, Chain } from 'viem'
import {
  type EstimateGasParameters as viem_EstimateGasParameters,
  type EstimateGasReturnType as viem_EstimateGasReturnType,
  estimateGas as viem_estimateGas,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  AccountParameter,
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import {
  type OneOf,
  type UnionEvaluate,
  type UnionLooseOmit,
} from '../types/utils.js'
import { getConnectorClient } from './getConnectorClient.js'

export type EstimateGasParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionEvaluate<
    UnionLooseOmit<
      viem_EstimateGasParameters<chains[key]>,
      'account' | 'chain'
    > &
      ChainIdParameter<config, chainId> &
      OneOf<AccountParameter | ConnectorParameter>
  >
}[number]

export type EstimateGasReturnType = viem_EstimateGasReturnType

export type EstimateGasError = Error

/** https://alpha.wagmi.sh/core/actions/estimateGas */
export async function estimateGas<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  config: config,
  parameters: EstimateGasParameters<config, chainId>,
): Promise<EstimateGasReturnType> {
  const { chainId, connector, ...rest } = parameters

  let account: Address | Account
  if (parameters.account) account = parameters.account
  else {
    const connectorClient = await getConnectorClient(config, {
      chainId,
      connector,
    })
    account = connectorClient.account
  }

  const client = config.getClient({ chainId })
  return viem_estimateGas(client, {
    ...(rest as viem_EstimateGasParameters),
    account,
  })
}
