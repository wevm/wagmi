import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type Connector,
  type OmittedMutationOptions,
  type SwitchAccountError,
  type SwitchAccountMutationData,
  type SwitchAccountMutationParameters,
  type SwitchAccountMutationVariables,
  switchAccountMutationOptions,
} from '@wagmi/core'
import type { Prettify } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseSwitchAccountParameters = Prettify<
  SwitchAccountMutationParameters & {
    mutation?: Omit<Options, OmittedMutationOptions>
  }
>
type Options = UseMutationOptions<
  SwitchAccountMutationData,
  SwitchAccountError,
  SwitchAccountMutationVariables
>

export type UseSwitchAccountReturnType = Prettify<
  Omit<Result, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    switchAccount: Result['mutate']
    switchAccountAsync: Result['mutateAsync']
  }
>
type Result = UseMutationResult<
  SwitchAccountMutationData,
  SwitchAccountError,
  SwitchAccountMutationVariables
>

export function useSwitchAccount({
  connector,
  mutation,
}: UseSwitchAccountParameters = {}): UseSwitchAccountReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation(
    switchAccountMutationOptions(config, { connector }),
  )

  return {
    ...mutationOptions,
    ...mutation,
    connectors: config.connectors.filter((x) =>
      config.state.connections.has(x.uid),
    ),
    switchAccount: mutate,
    switchAccountAsync: mutateAsync,
  }
}
