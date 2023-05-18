import type {
  GetWalletClientResult,
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  WalletClient,
} from '@wagmi/core'
import { prepareWriteContract } from '@wagmi/core'
import { getCallParameters } from '@wagmi/core/internal'
import type { Abi } from 'abitype'
import type { GetFunctionArgs } from 'viem'

import type { PartialBy, QueryConfig, QueryFunctionArgs } from '../../types'
import { useNetwork } from '../accounts'
import { useQuery } from '../utils'
import { useWalletClient } from '../viem'

export type UsePrepareContractWriteConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChainId extends number = number,
  TWalletClient extends WalletClient = WalletClient,
> = PartialBy<
  Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName, TChainId, TWalletClient>,
    'args'
  >,
  'abi' | 'address' | 'functionName'
> &
  Partial<GetFunctionArgs<TAbi, TFunctionName>> &
  QueryConfig<PrepareWriteContractResult<TAbi, TFunctionName, TChainId>, Error>

type QueryKeyArgs = Partial<Omit<PrepareWriteContractConfig, 'abi'>>
type QueryKeyConfig = Pick<UsePrepareContractWriteConfig, 'scopeKey'> & {
  activeChainId?: number
  walletClientAddress?: string
}

function queryKey({
  accessList,
  activeChainId,
  args,
  address,
  blockNumber,
  blockTag,
  chainId,
  functionName,
  gas,
  gasPrice,
  maxFeePerGas,
  maxPriorityFeePerGas,
  nonce,
  scopeKey,
  walletClientAddress,
  value,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'prepareContractTransaction',
      accessList,
      activeChainId,
      address,
      args,
      blockNumber,
      blockTag,
      chainId,
      functionName,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      scopeKey,
      walletClientAddress,
      value,
    },
  ] as const
}

function queryFn({
  abi,
  walletClient,
}: {
  abi?: Abi | readonly unknown[]
  walletClient?: GetWalletClientResult
}) {
  return ({
    queryKey: [
      {
        accessList,
        args,
        address,
        blockNumber,
        blockTag,
        chainId,
        functionName,
        gas,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value,
      },
    ],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!abi) throw new Error('abi is required')
    if (!address) throw new Error('address is required')
    if (!functionName) throw new Error('functionName is required')
    return prepareWriteContract({
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
      accessList,
      args,
      address,
      blockNumber,
      blockTag,
      chainId,
      functionName,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      walletClient,
      value,
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
  TChainId extends number,
>(
  {
    address,
    abi,
    functionName,
    chainId,
    args,
    cacheTime,
    enabled = true,
    scopeKey,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
    ...config
  }: UsePrepareContractWriteConfig<TAbi, TFunctionName, TChainId> = {} as any,
) {
  const { chain: activeChain } = useNetwork()
  const { data: walletClient } = useWalletClient({ chainId })

  const {
    accessList,
    blockNumber,
    blockTag,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    value,
  } = getCallParameters(config)

  const prepareContractWriteQuery = useQuery(
    queryKey({
      accessList,
      activeChainId: activeChain?.id,
      address,
      args: args as readonly unknown[],
      blockNumber,
      blockTag,
      chainId,
      functionName,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      scopeKey,
      walletClientAddress: walletClient?.account.address,
      value,
    } as QueryKeyArgs & QueryKeyConfig),
    queryFn({
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi as Abi,
      walletClient,
    }),
    {
      cacheTime,
      enabled: Boolean(
        enabled && abi && address && functionName && walletClient,
      ),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )

  return Object.assign(prepareContractWriteQuery, {
    config: {
      chainId,
      mode: 'prepared',
      request: undefined,
      ...prepareContractWriteQuery.data,
    } as PrepareWriteContractResult<TAbi, TFunctionName, TChainId>,
  })
}
