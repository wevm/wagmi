'use client'

import {
  type Config,
  type GetBalanceError,
  type ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
} from '@wagmi/core/query'
import type { GetBalanceQueryFnData } from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = Evaluate<
  GetBalanceOptions<config> &
    ConfigParameter<config> & {
      query?:
        | UseQueryParameters<
            GetBalanceQueryFnData,
            GetBalanceError,
            selectData,
            GetBalanceQueryKey<config>
          >
        | undefined
    }
>

export type UseBalanceReturnType<selectData = GetBalanceData> =
  UseQueryReturnType<selectData, GetBalanceError>

/** https://alpha.wagmi.sh/react/api/hooks/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
  parameters: UseBalanceParameters<config, selectData> = {},
): UseBalanceReturnType<selectData> {
  const { address, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = getBalanceQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(address && (query.enabled ?? true))

  return useQuery({ ...queryOptions, ...query, enabled })
}
