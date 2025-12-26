import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import type { GetBalanceQueryFnData } from '@wagmi/core/query'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type SolidBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = Compute<
  GetBalanceOptions<config> &
    ConfigParameter<config> &
    QueryParameter<
      GetBalanceQueryFnData,
      GetBalanceErrorType,
      selectData,
      GetBalanceQueryKey<config>
    >
>

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = Accessor<SolidBalanceParameters<config, selectData>>

export type UseBalanceReturnType<selectData = GetBalanceData> =
  UseQueryReturnType<selectData, GetBalanceErrorType>

/** https://wagmi.sh/solid/api/primitives/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
  parameters: UseBalanceParameters<config, selectData> = () => ({}),
): UseBalanceReturnType<selectData> {
  const config = useConfig(parameters)
  const configChainId = useChainId(() => ({ config: config() }))

  const queryOptions = createMemo(() => {
    const { address, chainId = configChainId(), query = {} } = parameters()
    const options = getBalanceQueryOptions(config(), {
      ...parameters(),
      chainId,
    })
    const enabled = Boolean(address && (query.enabled ?? true))

    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions)
}
