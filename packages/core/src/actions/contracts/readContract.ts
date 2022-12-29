import type { Abi } from 'abitype'

import { ContractMethodDoesNotExistError } from '../../errors'
import type {
  GetConfig,
  GetOverridesForAbiStateMutability,
  GetReturnType,
} from '../../types/contracts'
import { normalizeFunctionName } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

type StateMutability = 'pure' | 'view'
export type ReadContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = GetConfig<TAbi, TFunctionName, StateMutability> & {
  /** Chain id to use for provider */
  chainId?: number
  /** Call overrides */
  overrides?: GetOverridesForAbiStateMutability<StateMutability>
}

export type ReadContractResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = GetReturnType<TAbi, TFunctionName>

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  address,
  chainId,
  abi,
  functionName,
  overrides,
  ...config
}: ReadContractConfig<TAbi, TFunctionName>): Promise<
  ReadContractResult<TAbi, TFunctionName>
> {
  const provider = getProvider({ chainId })
  const contract = getContract({
    address,
    abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
    signerOrProvider: provider,
  })

  const args = config.args as unknown[]
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
