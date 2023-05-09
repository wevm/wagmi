import type { Abi } from 'abitype'
import type { ReadContractParameters, ReadContractReturnType } from 'viem'

import { getPublicClient } from '../viem'

export type ReadContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = ReadContractParameters<TAbi, TFunctionName> & {
  /** Chain id to use for Public Client. */
  chainId?: number
}

export type ReadContractResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = ReadContractReturnType<TAbi, TFunctionName>

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  address,
  chainId,
  abi,
  args,
  functionName,
  blockNumber,
  blockTag,
}: ReadContractConfig<TAbi, TFunctionName>): Promise<
  ReadContractResult<TAbi, TFunctionName>
> {
  const publicClient = getPublicClient({ chainId })
  return publicClient.readContract({
    abi,
    address,
    functionName,
    args,
    blockNumber,
    blockTag,
  } as unknown as ReadContractParameters<TAbi, TFunctionName>)
}
