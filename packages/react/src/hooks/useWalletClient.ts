'use client'
// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem
import { useQueryClient } from '@tanstack/react-query'
import type {
  Config,
  GetWalletClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetWalletClientData,
  type GetWalletClientOptions,
  getWalletClientQueryOptions,
} from '@wagmi/core/query'
import { useEffect, useRef } from 'react'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseWalletClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = Compute<
  GetWalletClientOptions<config, chainId, selectData> & ConfigParameter<config>
>

export type UseWalletClientReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetWalletClientErrorType>

/** https://wagmi.sh/react/api/hooks/useWalletClient */
export function useWalletClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
>(
  parameters: UseWalletClientParameters<config, chainId, selectData> = {},
): UseWalletClientReturnType<config, chainId, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const { address, connector } = useConnection({ config })
  const options = getWalletClientQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector,
    query: parameters.query as any,
  })

  const addressRef = useRef(address)
  const queryClient = useQueryClient()
  // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required
  useEffect(() => {
    const previousAddress = addressRef.current
    if (!address && previousAddress) {
      // remove when account is disconnected
      queryClient.removeQueries({ queryKey: options.queryKey })
      addressRef.current = undefined
    } else if (address !== previousAddress) {
      // invalidate when address changes
      queryClient.invalidateQueries({ queryKey: options.queryKey })
      addressRef.current = address
    }
  }, [address, queryClient])

  return useQuery(options) as any
}
