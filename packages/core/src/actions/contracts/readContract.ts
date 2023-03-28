import type { Abi } from 'abitype'
import type { ReadContractParameters, ReadContractReturnType } from 'viem'

import { getProvider } from '../providers'

export type ReadContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = ReadContractParameters<TAbi, TFunctionName> & {
  /** Chain id to use for provider */
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
  const provider = getProvider({ chainId })
  return provider.readContract({
    abi,
    address,
    functionName,
    args,
    blockNumber,
    blockTag,
  } as unknown as ReadContractParameters<TAbi, TFunctionName>)
}
