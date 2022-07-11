import {
  FetchSignerResult,
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  prepareWriteContract,
} from '@wagmi/core'
import { hashQueryKey } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useChainId, useQuery } from '../utils'

export type UseContractWritePrepareArgs = PrepareWriteContractConfig
export type UseContractWritePrepareConfig = QueryConfig<
  PrepareWriteContractResult,
  Error
>

export const queryKey = (
  {
    args,
    addressOrName,
    contractInterface,
    functionName,
    overrides,
  }: UseContractWritePrepareArgs,
  { chainId, signer }: { chainId?: number; signer?: FetchSignerResult },
) =>
  [
    {
      entity: 'prepareContractTransaction',
      addressOrName,
      args,
      chainId,
      contractInterface,
      functionName,
      overrides,
      signer,
    },
  ] as const

const queryKeyHashFn = ([queryKey_]: ReturnType<typeof queryKey>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { contractInterface, signer, ...rest } = queryKey_
  return hashQueryKey([rest, signer?._address])
}

const queryFn = ({
  queryKey: [
    { args, addressOrName, contractInterface, functionName, overrides },
  ],
}: QueryFunctionArgs<typeof queryKey>) => {
  return prepareWriteContract({
    args,
    addressOrName,
    contractInterface,
    functionName,
    overrides,
  })
}

/**
 * @description Hook for preparing a contract write to be sent via [`useContractWrite`](/docs/hooks/useContractWrite).
 *
 * Eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.
 */
export function useContractWritePrepare({
  addressOrName,
  contractInterface,
  functionName,
  args,
  overrides,
  cacheTime,
  enabled = true,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseContractWritePrepareArgs & UseContractWritePrepareConfig) {
  const chainId = useChainId()
  const { data: signer } = useSigner()

  const contractWritePrepareQuery = useQuery(
    queryKey(
      {
        addressOrName,
        contractInterface,
        functionName,
        args,
        overrides,
      },
      { chainId, signer },
    ),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && signer),
      queryKeyHashFn,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
  return Object.assign(contractWritePrepareQuery, {
    config: {
      addressOrName,
      args,
      contractInterface,
      overrides,
      functionName,
      request: undefined,
      mode: 'prepared',
      ...contractWritePrepareQuery.data,
    } as PrepareWriteContractResult,
  })
}
