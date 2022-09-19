import {
  Abi,
  AbiFunction,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'
import { CallOverrides } from 'ethers/lib/ethers'

import { multicallABI } from '../../constants'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
} from '../../errors'
import {
  GetArgs,
  GetResult as MulticallContractResult,
} from '../../types/utils'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

type MulticallContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> = {
  /** Contract address */
  addressOrName: Address
  /** Contract ABI */
  contractInterface: TAbi
  /** Function to invoke on the contract */
  functionName: [TFunctionName] extends [never] ? string : TFunctionName
} & GetArgs<TAbi, TFunction>

type GetConfig<T> = T extends {
  contractInterface: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? MulticallContractConfig<
      TAbi,
      ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>,
      ExtractAbiFunction<TAbi, TFunctionName>
    >
  : MulticallContractConfig

type GetResult<T> = T extends {
  contractInterface: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? MulticallContractResult<TAbi, TFunctionName>
  : MulticallContractResult

type MAXIMUM_DEPTH = 20
type ContractsConfig<
  TContracts extends unknown[],
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? MulticallContractConfig[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head]
  ? [...Result, GetConfig<Head>]
  : TContracts extends [infer Head, ...infer Tail]
  ? ContractsConfig<[...Tail], [...Result, GetConfig<Head>], [...Depth, 1]>
  : unknown[] extends TContracts
  ? TContracts
  : TContracts extends MulticallContractConfig<
      infer TAbi,
      infer TFunctionName
    >[]
  ? MulticallContractConfig<TAbi, TFunctionName>[]
  : MulticallContractConfig[]

export type MulticallConfig<TContracts extends unknown[]> = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  /** Chain id to use for provider */
  chainId?: number
  contracts: readonly [...ContractsConfig<TContracts>]
  /** Call overrides */
  overrides?: CallOverrides
}

export type MulticallResult<
  TContracts extends unknown[],
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? any[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head]
  ? [...Result, GetResult<Head>]
  : TContracts extends [infer Head, ...infer Tail]
  ? MulticallResult<[...Tail], [...Result, GetResult<Head>], [...Depth, 1]>
  : TContracts extends MulticallContractConfig<
      infer TAbi,
      infer TFunctionName
    >[]
  ? GetResult<{ contractInterface: TAbi; functionName: TFunctionName }>[]
  : any[]

export async function multicall<TContracts extends unknown[]>({
  allowFailure = true,
  chainId,
  contracts,
  overrides,
}: MulticallConfig<TContracts>): Promise<MulticallResult<TContracts>> {
  const provider = getProvider({ chainId })
  if (!provider.chains) throw new ProviderChainsNotFound()

  const chain =
    provider.chains.find((chain) => chain.id === chainId) || provider.chains[0]
  if (!chain) throw new ProviderChainsNotFound()
  if (!chain?.multicall) throw new ChainDoesNotSupportMulticallError({ chain })

  if (
    typeof overrides?.blockTag === 'number' &&
    overrides?.blockTag < chain.multicall.blockCreated
  )
    throw new ChainDoesNotSupportMulticallError({
      blockNumber: overrides?.blockTag,
      chain,
    })

  const multicallContract = getContract({
    addressOrName: chain.multicall.address,
    contractInterface: multicallABI,
    signerOrProvider: provider,
  })
  const calls = (<MulticallContractConfig[]>(<unknown>contracts)).map(
    ({ addressOrName, contractInterface, functionName, ...config }) => {
      const { args } = config || {}
      const contract = getContract({
        addressOrName,
        contractInterface,
      })
      const params = args ?? []
      try {
        const callData = contract.interface.encodeFunctionData(
          functionName,
          params,
        )
        if (!contract[functionName])
          logWarn(
            `"${functionName}" is not in the interface for contract "${addressOrName}"`,
          )
        return {
          target: addressOrName,
          allowFailure,
          callData,
        }
      } catch (err) {
        if (!allowFailure) throw err
        return {
          target: addressOrName,
          allowFailure,
          callData: '0x',
        }
      }
    },
  )

  type AggregateResult = {
    success: boolean
    returnData: string
  }[]
  const params = [...[calls], ...(overrides ? [overrides] : [])]
  const results = (await multicallContract.aggregate3(
    ...params,
  )) as AggregateResult
  return results.map(({ returnData, success }, i) => {
    const { addressOrName, contractInterface, functionName, args } = contracts[
      i
    ] as MulticallContractConfig

    const contract = getContract({
      addressOrName,
      contractInterface,
    })

    if (!success) {
      let error
      try {
        contract.interface.decodeFunctionResult(functionName, returnData)
      } catch (err) {
        error = new ContractMethodRevertedError({
          addressOrName,
          args,
          chainId: chain.id,
          functionName,
          errorMessage: (<Error>err).message,
        })
        if (!allowFailure) throw error
        logWarn(error.message)
      }
      return null
    }

    if (returnData === '0x') {
      const error = new ContractMethodNoResultError({
        addressOrName,
        args,
        chainId: chain.id,
        functionName,
      })
      if (!allowFailure) throw error
      logWarn(error.message)
      return null
    }

    try {
      const result = contract.interface.decodeFunctionResult(
        functionName,
        returnData,
      )
      return Array.isArray(result) && result.length === 1 ? result[0] : result
    } catch (err) {
      const error = new ContractResultDecodeError({
        addressOrName,
        args,
        chainId: chain.id,
        functionName,
        errorMessage: (<Error>err).message,
      })
      if (!allowFailure) throw error
      logWarn(error.message)
      return null
    }
  }) as MulticallResult<TContracts>
}
