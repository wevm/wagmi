import type { Account } from 'viem'
import {
  type PrepareAuthorizationErrorType as viem_PrepareAuthorizationErrorType,
  type PrepareAuthorizationParameters as viem_PrepareAuthorizationParameters,
  type PrepareAuthorizationReturnType as viem_PrepareAuthorizationReturnType,
  prepareAuthorization as viem_prepareAuthorization,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import { getConnection } from './getConnection.js'

export type PrepareAuthorizationParameters<config extends Config = Config> =
  Compute<
    ChainIdParameter<config> & viem_PrepareAuthorizationParameters<Account>
  >

export type PrepareAuthorizationReturnType = viem_PrepareAuthorizationReturnType

export type PrepareAuthorizationErrorType = viem_PrepareAuthorizationErrorType

/** https://wagmi.sh/core/api/actions/prepareAuthorization */
export async function prepareAuthorization<config extends Config>(
  config: config,
  parameters: PrepareAuthorizationParameters<config>,
): Promise<PrepareAuthorizationReturnType> {
  const { chainId, account: account_, ...rest } = parameters

  const account = account_ ?? getConnection(config).address
  const client = config.getClient({ chainId })

  const action = getAction(
    client,
    viem_prepareAuthorization,
    'prepareAuthorization',
  )
  return action({
    ...rest,
    ...(account ? { account } : {}),
    chainId,
  } as viem_PrepareAuthorizationParameters<Account>)
}
