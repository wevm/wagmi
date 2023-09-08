import type { Account } from 'viem'
import {
  type SignMessageParameters as viem_SignMessageParameters,
  type SignMessageReturnType as viem_SignMessageReturnType,
  signMessage as viem_signMessage,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getConnectorClient } from './getConnectorClient.js'

export type SignMessageParameters = Evaluate<
  viem_SignMessageParameters<Account> & ConnectorParameter
>

export type SignMessageReturnType = viem_SignMessageReturnType

export type SignMessageError = Error

/** https://alpha.wagmi.sh/core/api/actions/signMessage */
export async function signMessage(
  config: Config,
  parameters: SignMessageParameters,
): Promise<SignMessageReturnType> {
  const { account, connector, ...rest } = parameters
  const client = await getConnectorClient(config, { account, connector })
  return viem_signMessage(client, rest)
}
