import { type MutationOptions } from '@tanstack/query-core'
import {
  type SignMessageParameters as SignMessageParameters_,
  type SignMessageReturnType as SignMessageReturnType_,
  UserRejectedRequestError,
} from 'viem'

import { type Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { Evaluate, IsUndefined } from '../types/utils.js'
import { getWalletClient } from './getWalletClient.js'

export type SignMessageParameters = Evaluate<
  Omit<SignMessageParameters_, 'account'>
>

export type SignMessageReturnType = SignMessageReturnType_

export type SignMessageError =
  | ConnectorNotFoundError
  | UserRejectedRequestError
  // base
  | Error

/** https://wagmi.sh/core/actions/signMessage */
export async function signMessage(
  config: Config,
  { message }: SignMessageParameters,
): Promise<SignMessageReturnType> {
  const walletClient = await getWalletClient(config)
  if (!walletClient) throw new ConnectorNotFoundError()
  return walletClient.signMessage({ message })
}

///////////////////////////////////////////////////////////////////////////
// TanStack Query

export type SignMessageMutationData = SignMessageReturnType
export type SignMessageMutationVariables<
  message extends SignMessageParameters['message'] | undefined,
> = Evaluate<
  Omit<SignMessageParameters, 'message'> &
    (IsUndefined<message> extends false
      ? { message?: SignMessageParameters['message'] | undefined }
      : { message: SignMessageParameters['message'] })
>
export type SignMessageMutationParameters<
  message extends SignMessageParameters['message'] | undefined,
> = Evaluate<
  Omit<SignMessageParameters, 'message'> & {
    message?: message | SignMessageParameters['message'] | undefined
  }
>

/** https://wagmi.sh/core/actions/signMessage#tanstack-query */
export const signMessageMutationOptions = <
  message extends SignMessageParameters['message'] | undefined,
>(
  config: Config,
  { message }: SignMessageMutationParameters<message>,
) =>
  ({
    mutationFn(variables) {
      return signMessage(config, { message: (variables.message ?? message)! })
    },
    mutationKey: ['signMessage', { message }],
  }) as const satisfies MutationOptions<
    SignMessageMutationData,
    SignMessageError,
    SignMessageMutationVariables<message>
  >
