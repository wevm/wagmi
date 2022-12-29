import type {
  FetchSignerResult,
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  Signer,
} from '@wagmi/core'
import { prepareWriteContract } from '@wagmi/core'
import type { Abi } from 'abitype'
import type { providers } from 'ethers'

import type { PartialBy, QueryConfig, QueryFunctionArgs } from '../../types'
import { useNetwork, useSigner } from '../accounts'
import { useQuery } from '../utils'

export type UsePrepareContractWriteConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TSigner extends Signer = Signer,
> = PartialBy<
  PrepareWriteContractConfig<TAbi, TFunctionName, TSigner>,
  'abi' | 'address' | 'args' | 'functionName'
> &
  QueryConfig<PrepareWriteContractResult<TAbi, TFunctionName>, Error>

type QueryKeyArgs = Omit<PrepareWriteContractConfig, 'abi'>
type QueryKeyConfig = Pick<UsePrepareContractWriteConfig, 'scopeKey'> & {
  activeChainId?: number
  signerAddress?: string
}

function queryKey({
  activeChainId,
  args,
  address,
  chainId,
  functionName,
  overrides,
  signerAddress,
}: QueryKeyArgs & QueryKeyConfig) {
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
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
      args,
      address,
      chainId,
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
    scopeKey,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  }: UsePrepareContractWriteConfig<TAbi, TFunctionName> = {} as any,
) {
  const { chain: activeChain } = useNetwork()
  const { data: signer } = useSigner<providers.JsonRpcSigner>({ chainId })

  const prepareContractWriteQuery = useQuery(
    queryKey({
      activeChainId: activeChain?.id,
      address,
      args,
      chainId,
      functionName,
      scopeKey,
      signerAddress: signer?._address,
      overrides,
    } as Omit<PrepareWriteContractConfig, 'abi'>),
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
