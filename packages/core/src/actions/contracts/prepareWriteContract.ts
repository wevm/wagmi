import type { Abi } from 'abitype'
import type {
  SimulateContractParameters,
  SimulateContractReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import type { WalletClient } from '../../types'
import { assertActiveChain, getCallParameters } from '../../utils'
import { getPublicClient, getWalletClient } from '../viem'

export type PrepareWriteContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChainId extends number = number,
  TWalletClient extends WalletClient = WalletClient,
> = Omit<
  SimulateContractParameters<TAbi, TFunctionName>,
  'account' | 'chain'
> & {
  /** Chain id to use for Public Client. */
  chainId?: TChainId | number
  /** Custom Wallet Client. */
  walletClient?: TWalletClient | null
}

export type PrepareWriteContractResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChainId extends number = number,
> = Omit<SimulateContractReturnType<TAbi, TFunctionName>, 'request'> & {
  request: SimulateContractReturnType<TAbi, TFunctionName>['request'] & {
    chainId?: TChainId
  }
  mode: 'prepared'
}

/**
 * @description Prepares the parameters required for a contract write transaction.
 *
 * Returns config to be passed through to `writeContract`.
 *
 * @example
 * import { prepareWriteContract, writeContract } from '@wagmi/core'
 *
 * const config = await prepareWriteContract({
 *  address: '0x...',
 *  abi: wagmiAbi,
 *  functionName: 'mint',
 * })
 * const result = await writeContract(config)
 */
export async function prepareWriteContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TChainId extends number,
  TWalletClient extends WalletClient = WalletClient,
>({
  abi,
  address,
  args,
  chainId,
  functionName,
  walletClient: walletClient_,
  ...config
}: PrepareWriteContractConfig<
  TAbi,
  TFunctionName,
  TChainId,
  TWalletClient
>): Promise<PrepareWriteContractResult<TAbi, TFunctionName, TChainId>> {
  const publicClient = getPublicClient({ chainId })
  const walletClient = walletClient_ ?? (await getWalletClient({ chainId }))
  if (!walletClient) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId, walletClient })

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

  const { result, request } = await publicClient.simulateContract({
    abi,
    address,
    functionName,
    args,
    account: walletClient.account,
    accessList,
    blockNumber,
    blockTag,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    value,
  } as SimulateContractParameters)

  const minimizedAbi = (abi as Abi).filter(
    (abiItem) => 'name' in abiItem && abiItem.name === functionName,
  )

  return {
    mode: 'prepared',
    request: {
      ...request,
      abi: minimizedAbi,
      chainId: chainId as TChainId,
    },
    result,
  } as unknown as PrepareWriteContractResult<TAbi, TFunctionName, TChainId>
}
