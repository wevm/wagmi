import {
  FetchSignerResult,
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  prepareWriteContract,
} from '@wagmi/core'
import { Abi } from 'abitype'
import { Signer, providers } from 'ethers'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useChainId, useQuery } from '../utils'

export type UsePrepareContractWriteConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TSigner extends Signer = Signer,
> = PrepareWriteContractConfig<
  TAbi,
  TFunctionName,
  TSigner,
  {
    isAbiOptional: true
    isAddressOptional: true
    isArgsOptional: true
    isFunctionNameOptional: true
  }
> &
  QueryConfig<PrepareWriteContractResult, Error>

function queryKey(
  {
    args,
    address,
    chainId,
    functionName,
    overrides,
  }: Omit<PrepareWriteContractConfig, 'abi'>,
  {
    activeChainId,
    signerAddress,
  }: { activeChainId?: number; signerAddress?: string },
) {
  return [
    {
      entity: 'prepareContractTransaction',
      activeChainId,
      address,
      args,
      chainId,
      functionName,
      overrides,
      signerAddress,
    },
  ] as const
}

function queryFn({
  abi,
  signer,
}: {
  abi?: Abi | readonly unknown[]
  signer?: FetchSignerResult
}) {
  return ({
    queryKey: [{ args, address, chainId, functionName, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!abi) throw new Error('abi is required')
    return prepareWriteContract({
      args,
      address,
      chainId,
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
      functionName,
      overrides,
      signer,
    })
  }
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
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
export function usePrepareContractWrite<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  {
    address,
    abi,
    functionName,
    chainId,
    args,
    overrides,
    cacheTime,
    enabled = true,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  }: UsePrepareContractWriteConfig<TAbi, TFunctionName> = {} as any,
) {
  const activeChainId = useChainId()
  const { data: signer } = useSigner<providers.JsonRpcSigner>({
    chainId: chainId ?? activeChainId,
  })

  const prepareContractWriteQuery = useQuery(
    queryKey(
      {
        address,
        functionName,
        chainId,
        args,
        overrides,
      } as Omit<PrepareWriteContractConfig, 'abi'>,
      { activeChainId, signerAddress: signer?._address },
    ),
    queryFn({
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
      signer,
    }),
    {
      cacheTime,
      enabled: Boolean(enabled && abi && address && functionName && signer),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
  return Object.assign(prepareContractWriteQuery, {
    config: {
      abi,
      address,
      args,
      functionName,
      mode: 'prepared',
      overrides,
      request: undefined,
      ...prepareContractWriteQuery.data,
    } as unknown as PrepareWriteContractResult<TAbi, TFunctionName>,
  })
}
