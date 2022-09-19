import {
  FetchSignerResult,
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  prepareWriteContract,
} from '@wagmi/core'
import { Abi, ExtractAbiFunctionNames } from 'abitype'
import { Signer, providers } from 'ethers'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useSigner } from '../accounts'
import { useChainId, useQuery } from '../utils'

export type UsePrepareContractWriteConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TSigner extends Signer = Signer,
> = PrepareWriteContractConfig<TAbi, TFunctionName, TSigner> &
  QueryConfig<PrepareWriteContractResult, Error>

function queryKey(
  {
    args,
    addressOrName,
    chainId,
    functionName,
    overrides,
  }: Omit<PrepareWriteContractConfig, 'contractInterface'>,
  {
    activeChainId,
    signerAddress,
  }: { activeChainId?: number; signerAddress?: string },
) {
  return [
    {
      entity: 'prepareContractTransaction',
      activeChainId,
      addressOrName,
      args,
      chainId,
      functionName,
      overrides,
      signerAddress,
    },
  ] as const
}

function queryFn({
  contractInterface,
  signer,
}: {
  contractInterface: Abi | readonly unknown[]
  signer?: FetchSignerResult
}) {
  return ({
    queryKey: [{ args, addressOrName, chainId, functionName, overrides }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    return prepareWriteContract({
      args,
      addressOrName,
      chainId,
      contractInterface,
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
 *  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  contractInterface: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
export function usePrepareContractWrite<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'payable' | 'nonpayable'>
    : string,
>({
  addressOrName,
  contractInterface,
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
}: UsePrepareContractWriteConfig<TAbi, TFunctionName>) {
  const activeChainId = useChainId()
  const { data: signer } = useSigner<providers.JsonRpcSigner>({
    chainId: chainId ?? activeChainId,
  })

  const prepareContractWriteQuery = useQuery(
    queryKey(
      {
        addressOrName,
        functionName,
        chainId,
        args,
        overrides,
      } as Omit<PrepareWriteContractConfig, 'contractInterface'>,
      { activeChainId, signerAddress: signer?._address },
    ),
    queryFn({ contractInterface, signer }),
    {
      cacheTime,
      enabled: Boolean(enabled && signer),
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
