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
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<viem_VerifyTypedDataParameters & ChainIdParameter<config, chainId>>

export type VerifyTypedDataReturnType = viem_VerifyTypedDataReturnType

export type VerifyTypedDataErrorType = viem_VerifyTypedDataErrorType

/** https://beta.wagmi.sh/core/api/actions/verifyTypedData */
export async function verifyTypedData(
  config: Config,
  parameters: VerifyTypedDataParameters,
): Promise<VerifyTypedDataReturnType> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return viem_verifyTypedData(client, rest)
}
