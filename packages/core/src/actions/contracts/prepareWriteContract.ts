import type { Abi } from 'abitype'
import type {
  Chain,
  SimulateContractParameters,
  SimulateContractReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import type { Signer } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import { getProvider } from '../providers'

export type PrepareWriteContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChainId extends number = number,
  TSigner extends Signer = Signer,
> = Omit<
  SimulateContractParameters<TAbi, TFunctionName, Chain>,
  'account' | 'chain'
> & {
  /** Chain id to use for provider */
  chainId?: TChainId | number
  /** Custom signer */
  signer?: TSigner | null
}

export type PrepareWriteContractResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChainId extends number = number,
> = SimulateContractReturnType<TAbi, TFunctionName, Chain> & {
  chainId?: TChainId
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
  TSigner extends Signer = Signer,
>({
  abi,
  address,
  args,
  chainId,
  functionName,
  signer: signer_,
  ...config
}: PrepareWriteContractConfig<TAbi, TFunctionName, TChainId, TSigner>): Promise<
  PrepareWriteContractResult<TAbi, TFunctionName, TChainId>
> {
  const provider = getProvider({ chainId })
  const signer = signer_ ?? (await fetchSigner({ chainId }))
  if (!signer) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId, signer })

  const { result, request } = await provider.simulateContract({
    abi,
    address,
    functionName,
    args,
    account: signer.account.address,
    ...config,
  } as SimulateContractParameters)

  const minimizedAbi = (abi as Abi).filter(
    (abiItem) => 'name' in abiItem && abiItem.name === functionName,
  )

  return {
    chainId: chainId as TChainId,
    mode: 'prepared',
    request: {
      ...request,
      abi: minimizedAbi,
    },
    result,
  } as unknown as PrepareWriteContractResult<TAbi, TFunctionName, TChainId>
}
