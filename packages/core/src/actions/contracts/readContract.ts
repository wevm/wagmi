import type { Abi } from 'abitype'

import { ContractMethodDoesNotExistError } from '../../errors'
import type {
  DefaultOptions,
  GetConfig,
  GetOverridesForAbiStateMutability,
  GetReturnType,
  Options,
} from '../../types/contracts'
import { normalizeFunctionName } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

export type ReadContractConfig<
  TAbi = Abi,
  TFunctionName = string,
  TOptions extends Options = DefaultOptions,
> = GetConfig<
  {
    abi: TAbi
    functionName: TFunctionName
    /** Chain id to use for provider */
    chainId?: number
    /** Call overrides */
    overrides?: GetOverridesForAbiStateMutability<'pure' | 'view'>
  },
  'pure' | 'view',
  TOptions
>

export type ReadContractResult<
  TAbi = Abi,
  TFunctionName = string,
> = GetReturnType<{ abi: TAbi; functionName: TFunctionName }>

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  address,
  args,
  chainId,
  abi,
  functionName,
  overrides,
}: ReadContractConfig<TAbi, TFunctionName>): Promise<
  ReadContractResult<TAbi, TFunctionName>
> {
  const provider = getProvider({ chainId })
  const contract = getContract({
    address,
    abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
    signerOrProvider: provider,
  })

  const normalizedFunctionName = normalizeFunctionName({
    contract,
    functionName,
    args,
  })
  const contractFunction = contract[normalizedFunctionName]
  if (!contractFunction)
    throw new ContractMethodDoesNotExistError({
      address,
      functionName: normalizedFunctionName,
    })

  const params = [...(args ?? []), ...(overrides ? [overrides] : [])]
  return contractFunction?.(...params)
}
