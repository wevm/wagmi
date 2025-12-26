import type { Config, GetEnsNameErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsNameData,
  type GetEnsNameOptions,
  type GetEnsNameQueryFnData,
  type GetEnsNameQueryKey,
  getEnsNameQueryOptions,
} from '@wagmi/core/query'

import { type Accessor, createMemo } from 'solid-js'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { UseQueryReturnType } from '../utils/query.js'
import { useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type SolidEnsNameParameters<
  config extends Config = Config,
  selectData = GetEnsNameData,
> = Compute<
  ConfigParameter<config> &
    QueryParameter<
      GetEnsNameQueryFnData,
      GetEnsNameErrorType,
      selectData,
      GetEnsNameQueryKey<config>
    > &
    GetEnsNameOptions<config>
>

export type UseEnsNameParameters<
  config extends Config = Config,
  selectData = GetEnsNameData,
> = Accessor<SolidEnsNameParameters<config, selectData>>

export type UseEnsNameReturnType<selectData = GetEnsNameData> =
  UseQueryReturnType<selectData, GetEnsNameErrorType>

/** https://wagmi.sh/solid/api/primitives/useEnsName */
export function useEnsName<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsNameData,
>(
  parameters: UseEnsNameParameters<config, selectData> = () => ({}),
): UseEnsNameReturnType<selectData> {
  const config = useConfig(parameters)
  const configChainId = useChainId(() => ({ config: config() }))

  const queryOptions = createMemo(() => {
    const params = parameters()
    const { address, chainId = configChainId(), query = {} } = params
    const options = getEnsNameQueryOptions(config(), {
      ...params,
      chainId,
    })
    const enabled = Boolean(address && (query.enabled ?? true))
    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions)
}
