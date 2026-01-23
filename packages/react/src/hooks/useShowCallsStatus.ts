'use client'
import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  ShowCallsStatusErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ShowCallsStatusData,
  type ShowCallsStatusMutate,
  type ShowCallsStatusMutateAsync,
  type ShowCallsStatusOptions,
  type ShowCallsStatusVariables,
  showCallsStatusMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseShowCallsStatusParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & ShowCallsStatusOptions<context>>

export type UseShowCallsStatusReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    ShowCallsStatusData,
    ShowCallsStatusErrorType,
    ShowCallsStatusVariables,
    context,
    ShowCallsStatusMutate,
    ShowCallsStatusMutateAsync
  > & {
    /** @deprecated use `mutate` instead */
    showCallsStatus: ShowCallsStatusMutate
    /** @deprecated use `mutateAsync` instead */
    showCallsStatusAsync: ShowCallsStatusMutateAsync
  }
>

/** https://wagmi.sh/react/api/hooks/useShowCallsStatus */
export function useShowCallsStatus<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseShowCallsStatusParameters<config, context> = {},
): UseShowCallsStatusReturnType<context> {
  const config = useConfig(parameters)
  const options = showCallsStatusMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseShowCallsStatusReturnType<context>
  return {
    ...(mutation as Return),
    showCallsStatus: mutation.mutate as Return['mutate'],
    showCallsStatusAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
