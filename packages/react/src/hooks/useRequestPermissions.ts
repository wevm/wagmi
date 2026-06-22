'use client'
import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  RequestPermissionsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type RequestPermissionsData,
  type RequestPermissionsMutate,
  type RequestPermissionsMutateAsync,
  type RequestPermissionsOptions,
  type RequestPermissionsVariables,
  requestPermissionsMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseRequestPermissionsParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & RequestPermissionsOptions<context>>

export type UseRequestPermissionsReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    RequestPermissionsData,
    RequestPermissionsErrorType,
    RequestPermissionsVariables,
    context,
    RequestPermissionsMutate<context>,
    RequestPermissionsMutateAsync<context>
  > & {
    /** @deprecated use `mutate` instead */
    requestPermissions: RequestPermissionsMutate<context>
    /** @deprecated use `mutateAsync` instead */
    requestPermissionsAsync: RequestPermissionsMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useRequestPermissions */
export function useRequestPermissions<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseRequestPermissionsParameters<config, context> = {},
): UseRequestPermissionsReturnType<context> {
  const config = useConfig(parameters)
  const options = requestPermissionsMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseRequestPermissionsReturnType<context>
  return {
    ...(mutation as Return),
    requestPermissions: mutation.mutate as Return['mutate'],
    requestPermissionsAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
