import type {
  Config,
  PrepareSendTransactionError,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type PrepareSendTransactionData,
  type PrepareSendTransactionOptions,
  type PrepareSendTransactionQueryFnData,
  type PrepareSendTransactionQueryKey,
  prepareSendTransactionQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnectorClient } from './useConnectorClient.js'

export type UsePrepareSendTransactionParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = PrepareSendTransactionData<config, chainId>,
> = PrepareSendTransactionOptions<config, chainId> &
  UseQueryParameters<
    PrepareSendTransactionQueryFnData<config, chainId>,
    PrepareSendTransactionError,
    selectData,
    PrepareSendTransactionQueryKey<config, chainId>
  > &
  ConfigParameter<config>

export type UsePrepareSendTransactionReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = PrepareSendTransactionData<config, chainId>,
> = UseQueryResult<selectData, PrepareSendTransactionError>

/** https://wagmi.sh/react/hooks/usePrepareSendTransaction */
export function usePrepareSendTransaction<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = PrepareSendTransactionData<config, chainId>,
>(
  parameters: UsePrepareSendTransactionParameters<
    config,
    chainId,
    selectData
  > = {} as UsePrepareSendTransactionParameters<config, chainId, selectData>,
): UsePrepareSendTransactionReturnType<config, chainId, selectData> {
  const { connector, ...query } = parameters
  const config = useConfig(parameters)
  const { data: connectorClient } = useConnectorClient({
    connector,
    enabled: parameters.account === undefined,
  })

  const account = parameters.account ?? connectorClient?.account
  const chainId = useChainId()
  const queryOptions = prepareSendTransactionQueryOptions(config, {
    ...parameters,
    account,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(parameters.enabled ?? true)

  return useQuery({
    ...queryOptions,
    ...(query as any),
    enabled,
  }) as UsePrepareSendTransactionReturnType<config, chainId, selectData>
}
