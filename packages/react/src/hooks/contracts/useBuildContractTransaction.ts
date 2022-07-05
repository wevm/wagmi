import {
  BuildContractTransactionConfig,
  BuildContractTransactionResult,
  buildContractTransaction,
} from '@wagmi/core'
import { useEffect } from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useProvider } from '../providers'
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
    signer,
  }: UseBuildContractTransactionArgs,
  { chainId }: { chainId?: number },
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

const queryFn = ({
  queryKey: [
    { args, addressOrName, contractInterface, functionName, overrides, signer },
  ],
}: QueryFunctionArgs<typeof queryKey>) => {
  return buildContractTransaction({
    args,
    addressOrName,
    contractInterface,
    functionName,
    overrides,
    signer,
  })
}

export function useBuildContractTransaction({
  addressOrName,
  contractInterface,
  functionName,
  args,
  overrides,
  signer: signer_,
  cacheTime,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
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
        signer: signer_ || signer,
      },
      { chainId },
    ),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && (signer_ || signer)),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
