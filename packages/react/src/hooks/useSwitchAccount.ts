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
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchAccountParameters<
  connector extends Connector | undefined,
  context = unknown,
> = Pretty<
  SwitchAccountMutationParameters<connector> & {
    mutation?: Omit<
      UseMutationOptions<
        SwitchAccountMutationData,
        SwitchAccountError,
        SwitchAccountMutationVariables<connector>,
        context
      >,
      OmittedMutationOptions
    >
  }
>

export type UseSwitchAccountReturnType<
  connector extends Connector | undefined,
  context = unknown,
> = Pretty<
  Omit<Result<connector, context>, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    switchAccount: Result<connector, context>['mutate']
    switchAccountAsync: Result<connector, context>['mutateAsync']
  }
>
type Result<
  connector extends Connector | undefined,
  context = unknown,
> = UseMutationResult<
  SwitchAccountMutationData,
  SwitchAccountError,
  SwitchAccountMutationVariables<connector>,
  context
>

/** https://wagmi.sh/react/hooks/useSwitchAccount */
export function useSwitchAccount<
  connector extends Connector | undefined = undefined,
  context = unknown,
>({
  connector,
  mutation,
}: UseSwitchAccountParameters<
  connector,
  context
> = {}): UseSwitchAccountReturnType<connector, context> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    SwitchAccountMutationData,
    SwitchAccountError,
    SwitchAccountMutationVariables<connector>,
    context
  >(switchAccountMutationOptions(config, { connector }))
  const connections = useConnections()
  const connectors = connections.map((connection) => connection.connector)

  return {
    ...mutationOptions,
    ...mutation,
    connectors,
    switchAccount: mutate,
    switchAccountAsync: mutateAsync,
  }
}
