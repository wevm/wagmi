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
  type ShowCallsStatusVariables,
  showCallsStatusMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseShowCallsStatusParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          ShowCallsStatusData,
          ShowCallsStatusErrorType,
          ShowCallsStatusVariables,
          context
        >
      | undefined
  }
>

export type UseShowCallsStatusReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    ShowCallsStatusData,
    ShowCallsStatusErrorType,
    ShowCallsStatusVariables,
    context
  > & {
    showCallsStatus: ShowCallsStatusMutate
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
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = showCallsStatusMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseShowCallsStatusReturnType
  return {
    ...result,
    showCallsStatus: mutate as Return['showCallsStatus'],
    showCallsStatusAsync: mutateAsync as Return['showCallsStatusAsync'],
  }
}
