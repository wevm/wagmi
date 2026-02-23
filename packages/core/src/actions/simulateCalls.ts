import type { Account, Address } from 'viem'
import {
  type SimulateCallsErrorType as viem_SimulateCallsErrorType,
  type SimulateCallsParameters as viem_SimulateCallsParameters,
  type SimulateCallsReturnType as viem_SimulateCallsReturnType,
  simulateCalls as viem_simulateCalls,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SimulateCallsParameters<
  config extends Config = Config,
  calls extends readonly unknown[] = readonly unknown[],
> = Compute<
  viem_SimulateCallsParameters<calls> &
    ChainIdParameter<config> &
    ConnectorParameter
>

export type SimulateCallsReturnType<
  calls extends readonly unknown[] = readonly unknown[],
> = viem_SimulateCallsReturnType<calls>

export type SimulateCallsErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SimulateCallsErrorType

/** https://wagmi.sh/core/api/actions/simulateCalls */
export async function simulateCalls<
  config extends Config,
  const calls extends readonly unknown[],
>(
  config: config,
  parameters: SimulateCallsParameters<config, calls>,
): Promise<SimulateCallsReturnType<calls>> {
  const { account: account_, chainId, connector, ...rest } = parameters

  let account: Account | Address | undefined = account_
  if (!account && connector) {
    const connectorClient = await getConnectorClient(config, {
      assertChainId: false,
      chainId,
      connector,
    })
    account = connectorClient.account
  }

  const client = config.getClient({ chainId })
  const action = getAction(client, viem_simulateCalls, 'simulateCalls')
  return action({
    ...(rest as viem_SimulateCallsParameters<calls>),
    ...(typeof account !== 'undefined' ? { account } : {}),
  })
}
