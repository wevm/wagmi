import type { Account, Client, TypedData } from 'viem'
import {
  type SignMessageErrorType as viem_SignMessageErrorType,
  type SignTypedDataParameters as viem_SignTypedDataParameters,
  type SignTypedDataReturnType as viem_SignTypedDataReturnType,
  signTypedData as viem_signTypedData,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { UnionEvaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SignTypedDataParameters<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  ///
  primaryTypes = typedData extends TypedData ? keyof typedData : string,
> = UnionEvaluate<
  viem_SignTypedDataParameters<typedData, primaryType, Account, primaryTypes> &
    ConnectorParameter
>

export type SignTypedDataReturnType = viem_SignTypedDataReturnType

export type SignTypedDataErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SignMessageErrorType

/** https://wagmi.sh/core/api/actions/signTypedData */
export async function signTypedData<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  config: Config,
  parameters: SignTypedDataParameters<typedData, primaryType>,
): Promise<SignTypedDataReturnType> {
  const { account, connector, ...rest } = parameters

  let client: Client
  if (typeof account === 'object' && account.type === 'local')
    client = config.getClient()
  else client = await getConnectorClient(config, { account, connector })

  const action = getAction(client, viem_signTypedData, 'signTypedData')
  return action({
    ...rest,
    ...(account ? { account } : {}),
  } as unknown as viem_SignTypedDataParameters)
}
