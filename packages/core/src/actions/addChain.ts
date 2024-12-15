import {
  type AddChainErrorType as viem_AddChainErrorType,
  type AddChainParameters as viem_AddChainParameters,
  addChain as viem_addChain,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type AddChainParameters = Compute<
  viem_AddChainParameters & ConnectorParameter
>

export type AddChainErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_AddChainErrorType

/** https://wagmi.sh/core/api/actions/addChain */
export async function addChain(config: Config, parameters: AddChainParameters) {
  const { connector, ...rest } = parameters

  const client = await getConnectorClient(config, { connector })

  const action = getAction(client, viem_addChain, 'addChain')
  return action(rest)
}
