import { hashQueryKey } from '@tanstack/react-query'
import {
  FetchSignerResult,
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  prepareWriteContract,
} from '@wagmi/core'
import { providers } from 'ethers'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useChainId, useQuery } from '../utils'

export type UsePrepareContractWriteArgs = Omit<
  PrepareWriteContractConfig,
  'signerOrProvider'
>
export type UsePrepareContractWriteConfig = QueryConfig<
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
  }: UsePrepareContractWriteArgs,
  {
    chainId,
    signer,
  }: { chainId?: number; signer?: FetchSignerResult<providers.JsonRpcSigner> },
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

const queryFn =
  ({ signer }: { signer?: FetchSignerResult }) =>
  ({
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
      signer,
    })
  }

/**
 * @description Hook for preparing a contract write to be sent via [`useContractWrite`](/docs/hooks/useContractWrite).
 *
 * Eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  contractInterface: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
export function usePrepareContractWrite({
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
}: UsePrepareContractWriteArgs & UsePrepareContractWriteConfig) {
  const chainId = useChainId()
  const { data: signer } = useSigner<providers.JsonRpcSigner>()

  const prepareContractWriteQuery = useQuery(
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
    queryFn({ signer }),
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
  return Object.assign(prepareContractWriteQuery, {
    config: {
      addressOrName,
      args,
      contractInterface,
      overrides,
      functionName,
      request: undefined,
      mode: 'prepared',
      ...prepareContractWriteQuery.data,
    } as PrepareWriteContractResult,
  })
}
