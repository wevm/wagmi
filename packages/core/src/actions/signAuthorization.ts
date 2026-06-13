import type { Account } from 'viem'
import {
  type SignAuthorizationErrorType as viem_SignAuthorizationErrorType,
  type SignAuthorizationParameters as viem_SignAuthorizationParameters,
  type SignAuthorizationReturnType as viem_SignAuthorizationReturnType,
  signAuthorization as viem_signAuthorization,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SignAuthorizationParameters = Compute<
  viem_SignAuthorizationParameters<Account> & ConnectorParameter
>

export type SignAuthorizationReturnType = viem_SignAuthorizationReturnType

export type SignAuthorizationErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SignAuthorizationErrorType

/** https://wagmi.sh/core/api/actions/signAuthorization */
export async function signAuthorization<config extends Config>(
  config: config,
  parameters: SignAuthorizationParameters,
): Promise<SignAuthorizationReturnType> {
  const { account, chainId, connector, ...rest } = parameters

  const client = await getConnectorClient(config, {
    account,
    chainId,
    connector,
  })

  return viem_signAuthorization(client, {
    ...rest,
    account,
    chainId,
  })
}
