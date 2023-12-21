import { type TypedData } from 'viem'
import {
  type VerifyTypedDataErrorType as viem_VerifyTypedDataErrorType,
  type VerifyTypedDataParameters as viem_VerifyTypedDataParameters,
  type VerifyTypedDataReturnType as viem_VerifyTypedDataReturnType,
  verifyTypedData as viem_verifyTypedData,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'

export type VerifyTypedDataParameters<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  config extends Config = Config,
> = Evaluate<
  viem_VerifyTypedDataParameters<
    typedData,
    primaryType extends string ? primaryType : never // TODO: Remove extends clause once Viem is updated
  > &
    ChainIdParameter<config>
>

export type VerifyTypedDataReturnType = viem_VerifyTypedDataReturnType

export type VerifyTypedDataErrorType = viem_VerifyTypedDataErrorType

/** https://rc.wagmi.sh/core/api/actions/verifyTypedData */
export async function verifyTypedData<
  config extends Config,
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(
  config: config,
  parameters: VerifyTypedDataParameters<typedData, primaryType, config>,
): Promise<VerifyTypedDataReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_verifyTypedData(client, rest as viem_VerifyTypedDataParameters)
}
