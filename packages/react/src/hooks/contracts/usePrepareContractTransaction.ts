import {
  FetchSignerResult,
  PrepareContractTransactionConfig,
  PrepareContractTransactionResult,
  prepareContractTransaction,
} from '@wagmi/core'
import { hashQueryKey } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useChainId, useQuery } from '../utils'

export type UsePrepareContractTransactionArgs = PrepareContractTransactionConfig
export type UsePrepareContractTransactionConfig = QueryConfig<
  PrepareContractTransactionResult,
  Error
>

export const queryKey = (
  {
    args,
    addressOrName,
    contractInterface,
    functionName,
    overrides,
  }: UsePrepareContractTransactionArgs,
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
  return prepareContractTransaction({
    args,
    addressOrName,
    contractInterface,
    functionName,
    overrides,
  })
}

export function usePrepareContractTransaction({
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
}: UsePrepareContractTransactionArgs & UsePrepareContractTransactionConfig) {
  const chainId = useChainId()
  const { data: signer } = useSigner()

  return useQuery(
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
}
