'use client'

import { useMutation } from '@tanstack/react-query'
import type { RequestPermissionsErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type RequestPermissionsData,
  type RequestPermissionsMutate,
  type RequestPermissionsMutateAsync,
  type RequestPermissionsVariables,
  requestPermissionsMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseRequestPermissionsParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          RequestPermissionsData,
          RequestPermissionsErrorType,
          RequestPermissionsVariables,
          context
        >
      | undefined
  }
>

export type UseRequestPermissionsReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    RequestPermissionsData,
    RequestPermissionsErrorType,
    RequestPermissionsVariables,
    context
  > & {
    requestPermissions: RequestPermissionsMutate<context>
    requestPermissionsAsync: RequestPermissionsMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useRequestPermissions */
export function useRequestPermissions<context = unknown>(
  parameters: UseRequestPermissionsParameters<context> = {},
): UseRequestPermissionsReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = requestPermissionsMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    requestPermissions: mutate,
    requestPermissionsAsync: mutateAsync,
  }
}
