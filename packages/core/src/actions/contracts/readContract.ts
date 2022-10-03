import { Abi } from 'abitype'
import { CallOverrides } from 'ethers/lib/ethers'

import { ContractMethodDoesNotExistError } from '../../errors'

import {
  DefaultOptions,
  GetConfig,
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
    contractInterface: TAbi
    functionName: TFunctionName
    /** Chain id to use for provider */
    chainId?: number
    /** Call overrides */
    overrides?: CallOverrides
  },
  'pure' | 'view',
  TOptions
>

export type ReadContractResult<
  TAbi = Abi,
  TFunctionName = string,
> = GetReturnType<{ contractInterface: TAbi; functionName: TFunctionName }>

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
}: ReadContractConfig<TAbi, TFunctionName>): Promise<
  ReadContractResult<TAbi, TFunctionName>
> {
  const provider = getProvider({ chainId })
  const contract = getContract({
    addressOrName,
    contractInterface,
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
      addressOrName,
      functionName: normalizedFunctionName,
    })

  const params = [...(args ?? []), ...(overrides ? [overrides] : [])]
  return await contractFunction?.(...params)
}
