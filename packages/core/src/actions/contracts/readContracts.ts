import {
  Abi,
  AbiFunction,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'
import { CallOverrides } from 'ethers'

import { mainnet } from '../../chains'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
} from '../../errors'
import {
  GetArgs,
  GetResult as ReadContractsContractResult,
} from '../../types/utils'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { multicall } from './multicall'
import { readContract } from './readContract'

type ReadContractsContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> = {
  /** Contract address */
  addressOrName: Address
  /** Chain id to use for provider */
  chainId?: number
  /** Contract ABI */
  contractInterface: TAbi
  /** Function to invoke on the contract */
  functionName: [TFunctionName] extends [never] ? string : TFunctionName
} & GetArgs<TAbi, TFunction>

type GetConfig<T> = T extends {
  contractInterface: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? ReadContractsContractConfig<
      TAbi,
      ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>,
      ExtractAbiFunction<TAbi, TFunctionName>
    >
  : ReadContractsContractConfig

type GetResult<T> = T extends {
  contractInterface: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? ReadContractsContractResult<TAbi, TFunctionName>
  : ReadContractsContractResult

type MAXIMUM_DEPTH = 20
type ContractsConfig<
  TContracts extends unknown[],
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? ReadContractsContractConfig[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head]
  ? [...Result, GetConfig<Head>]
  : TContracts extends [infer Head, ...infer Tail]
  ? ContractsConfig<[...Tail], [...Result, GetConfig<Head>], [...Depth, 1]>
  : unknown[] extends TContracts
  ? TContracts
  : TContracts extends ReadContractsContractConfig<
      infer TAbi,
      infer TFunctionName
    >[]
  ? ReadContractsContractConfig<TAbi, TFunctionName>[]
  : ReadContractsContractConfig[]

export type ReadContractsConfig<T extends unknown[]> = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  contracts: readonly [...ContractsConfig<T>]
  /** Call overrides */
  overrides?: CallOverrides
}

export type ReadContractsResult<
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
  ? ReadContractsResult<[...Tail], [...Result, GetResult<Head>], [...Depth, 1]>
  : TContracts extends ReadContractsContractConfig<
      infer TAbi,
      infer TFunctionName
    >[]
  ? GetResult<{ contractInterface: TAbi; functionName: TFunctionName }>[]
  : any[]

export async function readContracts<TContracts extends unknown[]>({
  allowFailure = true,
  contracts,
  overrides,
}: ReadContractsConfig<TContracts>): Promise<ReadContractsResult<TContracts>> {
  type ContractConfig = {
    addressOrName: Address
    chainId?: number
    contractInterface: Abi
    functionName: string
    args: any[]
  }

  try {
    const provider = getProvider()
    const contractsByChainId = (<ContractConfig[]>(<unknown>contracts)).reduce<{
      [chainId: number]: ContractConfig[]
    }>((contracts, contract) => {
      const chainId = contract.chainId ?? provider.network.chainId
      return {
        ...contracts,
        [chainId]: [...(contracts[chainId] || []), contract],
      }
    }, {})
    const promises = () =>
      Object.entries(contractsByChainId).map(([chainId, contracts]) =>
        multicall({
          allowFailure,
          chainId: parseInt(chainId),
          contracts,
          overrides,
        }),
      )
    if (allowFailure)
      return (await Promise.allSettled(promises()))
        .map((result) => {
          if (result.status === 'fulfilled') return result.value
          if (result.reason instanceof ChainDoesNotSupportMulticallError) {
            logWarn(result.reason.message)
            throw result.reason
          }
          return null
        })
        .flat() as ReadContractsResult<TContracts>

    return (
      await Promise.all(promises())
    ).flat() as ReadContractsResult<TContracts>
  } catch (err) {
    if (err instanceof ContractResultDecodeError) throw err
    if (err instanceof ContractMethodNoResultError) throw err
    if (err instanceof ContractMethodRevertedError) throw err

    const promises = () =>
      (<ContractConfig[]>(<unknown>contracts)).map((contract) =>
        readContract({ ...contract, overrides }),
      )
    if (allowFailure)
      return (await Promise.allSettled(promises())).map((result, i) => {
        if (result.status === 'fulfilled') return result.value
        const { addressOrName, functionName, chainId, args } = <ContractConfig>(
          (<ContractConfig[]>(<unknown>contracts))[i]
        )
        const error = new ContractMethodRevertedError({
          addressOrName,
          functionName,
          chainId: chainId ?? mainnet.id,
          args,
          errorMessage: result.reason,
        })
        logWarn(error.message)
        return null
      }) as ReadContractsResult<TContracts>

    return (await Promise.all(promises())) as ReadContractsResult<TContracts>
  }
}
