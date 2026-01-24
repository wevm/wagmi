import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  getBalanceQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
  parameters: useBalance.Parameters<config, selectData> = () => ({}),
): useBalance.ReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    getBalanceQueryOptions(config(), {
      ...parameters(),
      chainId: parameters().chainId ?? chainId(),
    }),
  )
  return useQuery(options)
}

export namespace useBalance {
  export type Parameters<
    config extends Config = Config,
    selectData = GetBalanceData,
  > = Accessor<SolidParameters<config, selectData>>

  export type ReturnType<selectData = GetBalanceData> = UseQueryReturnType<
    selectData,
    GetBalanceErrorType
  >

  export type SolidParameters<
    config extends Config = Config,
    selectData = GetBalanceData,
  > = Compute<GetBalanceOptions<config, selectData> & ConfigParameter<config>>
}
