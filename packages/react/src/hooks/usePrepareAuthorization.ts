'use client'
import type {
  Config,
  PrepareAuthorizationErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type PrepareAuthorizationData,
  type PrepareAuthorizationOptions,
  prepareAuthorizationQueryOptions,
} from '@wagmi/core/query'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UsePrepareAuthorizationParameters<
  config extends Config = Config,
  selectData = PrepareAuthorizationData,
> = Compute<
  PrepareAuthorizationOptions<config, selectData> & ConfigParameter<config>
>

export type UsePrepareAuthorizationReturnType<
  selectData = PrepareAuthorizationData,
> = UseQueryReturnType<selectData, PrepareAuthorizationErrorType>

/** https://wagmi.sh/react/api/hooks/usePrepareAuthorization */
export function usePrepareAuthorization<
  config extends Config = ResolvedRegister['config'],
  selectData = PrepareAuthorizationData,
>(
  parameters: UsePrepareAuthorizationParameters<config, selectData> = {},
): UsePrepareAuthorizationReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = prepareAuthorizationQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
