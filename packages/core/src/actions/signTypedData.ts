import type { TypedData } from 'viem'
import {
  type SignTypedDataParameters as viem_SignTypedDataParameters,
  type SignTypedDataReturnType as viem_SignTypedDataReturnType,
  signTypedData as viem_signTypedData,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import type { ConnectorParameter } from '../types/properties.js'
import { getConnectorClient } from './getConnectorClient.js'

export type SignTypedDataParameters<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
> = viem_SignTypedDataParameters<typedData, primaryType, never> &
  ConnectorParameter

export type SignTypedDataReturnType = viem_SignTypedDataReturnType

export type SignTypedDataError = Error

/** https://alpha.wagmi.sh/core/actions/signTypedData */
export async function signTypedData<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  config: Config,
  parameters: SignTypedDataParameters<typedData, primaryType>,
): Promise<SignTypedDataReturnType> {
  const { connector, ...rest } = parameters
  const client = await getConnectorClient(config, { connector })
  return viem_signTypedData(
    client,
    rest as unknown as viem_SignTypedDataParameters,
  )
}
