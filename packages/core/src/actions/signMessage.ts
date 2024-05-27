import type { Account, Client } from 'viem'
import {
  type SignMessageErrorType as viem_SignMessageErrorType,
  type SignMessageParameters as viem_SignMessageParameters,
  type SignMessageReturnType as viem_SignMessageReturnType,
  signMessage as viem_signMessage,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SignMessageParameters = Evaluate<
  viem_SignMessageParameters<Account> & ConnectorParameter
>

export type SignMessageReturnType = viem_SignMessageReturnType

export type SignMessageErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SignMessageErrorType

/** https://wagmi.sh/core/api/actions/signMessage */
export async function signMessage(
  config: Config,
  parameters: SignMessageParameters,
): Promise<SignMessageReturnType> {
  const { account, connector, ...rest } = parameters

  let client: Client
  if (typeof account === 'object' && account.type === 'local')
    client = config.getClient()
  else client = await getConnectorClient(config, { account, connector })

  const action = getAction(client, viem_signMessage, 'signMessage')
  return action({
    ...rest,
    ...(account ? { account } : {}),
  } as viem_SignMessageParameters<Account>)
}
