import type { Abi, Address, ExtractAbiFunction } from 'abitype'
import type { PopulatedTransaction } from 'ethers'

import {
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
} from '../../errors'
import type { Signer } from '../../types'
import type {
  DefaultOptions,
  GetConfig,
  GetOverridesForAbiStateMutability,
  Options,
} from '../../types/contracts'
import {
  assertActiveChain,
  minimizeContractInterface,
  normalizeFunctionName,
} from '../../utils'
import { fetchSigner } from '../accounts'
import { getContract } from './getContract'

export type PrepareWriteContractConfig<
  TAbi = Abi,
  TFunctionName = string,
  TSigner extends Signer = Signer,
  TOptions extends Options = DefaultOptions,
> = GetConfig<
  {
    abi: TAbi
    functionName: TFunctionName
    /** Chain id to use for provider */
    chainId?: number
    /** Overrides */
    overrides?: GetOverridesForAbiStateMutability<
      [TAbi, TFunctionName] extends [
        infer TAbi_ extends Abi,
        infer TFunctionName_ extends string,
      ]
        ? ExtractAbiFunction<TAbi_, TFunctionName_>['stateMutability']
        : 'nonpayable' | 'payable'
    >
    /** Custom signer */
    signer?: TSigner | null
  },
  'nonpayable' | 'payable',
  TOptions
>

export type PrepareWriteContractResult<
  TAbi = Abi,
  TFunctionName extends string = string,
> = {
  abi: TAbi extends Abi ? [ExtractAbiFunction<TAbi, TFunctionName>] : TAbi
  address: string
  chainId?: number
  functionName: TFunctionName
  mode: 'prepared'
  request: PopulatedTransaction & {
    to: Address
    gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
  }
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
  TSigner extends Signer = Signer,
>({
  abi,
  address,
  args,
  chainId,
  functionName,
  overrides,
  signer: signer_,
}: PrepareWriteContractConfig<TAbi, TFunctionName, TSigner>): Promise<
  PrepareWriteContractResult<TAbi, TFunctionName>
> {
  const signer = signer_ ?? (await fetchSigner({ chainId }))
  if (!signer) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId, signer })

  const contract = getContract({
    address,
    abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
    signerOrProvider: signer,
  })
  const normalizedFunctionName = normalizeFunctionName({
    contract,
    functionName,
    args,
  })
  const populateTransactionFn =
    contract.populateTransaction[normalizedFunctionName]
  if (!populateTransactionFn)
    throw new ContractMethodDoesNotExistError({
      address,
      functionName: normalizedFunctionName,
    })

  const params = [...(args ?? []), ...(overrides ? [overrides] : [])]
  const unsignedTransaction = (await populateTransactionFn(
    ...params,
  )) as PopulatedTransaction & {
    to: Address
  }
  const gasLimit =
    unsignedTransaction.gasLimit ||
    (await signer.estimateGas(unsignedTransaction))

  const minimizedAbi = minimizeContractInterface({
    abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
    functionName,
  }) as TAbi extends Abi ? [ExtractAbiFunction<TAbi, TFunctionName>] : TAbi
  return {
    abi: minimizedAbi,
    address,
    chainId,
    // TODO: Remove cast
    functionName: functionName as TFunctionName,
    mode: 'prepared',
    request: {
      ...unsignedTransaction,
      gasLimit,
    },
  }
}
