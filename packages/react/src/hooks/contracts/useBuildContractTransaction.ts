import {
  BuildContractTransactionConfig,
  BuildContractTransactionResult,
  FetchSignerResult,
  buildContractTransaction,
} from '@wagmi/core'
import { hashQueryKey } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useChainId, useQuery } from '../utils'

export type UseBuildContractTransactionArgs = BuildContractTransactionConfig
export type UseBuildContractTransactionConfig = QueryConfig<
  BuildContractTransactionResult,
  Error
>

export const queryKey = (
  {
    args,
    addressOrName,
    contractInterface,
    functionName,
    overrides,
  }: UseBuildContractTransactionArgs,
  { chainId, signer }: { chainId?: number; signer?: FetchSignerResult },
) =>
  [
    {
      entity: 'buildTransactionRequest',
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
  return buildContractTransaction({
    args,
    addressOrName,
    contractInterface,
    functionName,
    overrides,
  })
}

export function useBuildContractTransaction({
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
}: UseBuildContractTransactionArgs & UseBuildContractTransactionConfig) {
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
