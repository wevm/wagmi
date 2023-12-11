import {
  type VerifyMessageErrorType as viem_VerifyMessageErrorType,
  type VerifyMessageParameters as viem_VerifyMessageParameters,
  type VerifyMessageReturnType as viem_VerifyMessageReturnType,
  verifyMessage as viem_verifyMessage,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type Evaluate } from '../types/utils.js'

export type VerifyMessageParameters = Evaluate<viem_VerifyMessageParameters>

export type VerifyMessageReturnType = viem_VerifyMessageReturnType

export type VerifyMessageErrorType = viem_VerifyMessageErrorType

/** https://beta.wagmi.sh/core/api/actions/verifyMessage */
export async function verifyMessage(
  config: Config,
  parameters: VerifyMessageParameters,
): Promise<VerifyMessageReturnType> {
  const { ...rest } = parameters
  const client = config.getClient()
  return viem_verifyMessage(client, rest)
}
