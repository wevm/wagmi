import { Abi } from 'abitype'

import { mainnet } from '../../chains'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
} from '../../errors'
import {
  ContractsConfig,
  ContractsResult,
  DefaultOptions,
  GetOverridesForAbiStateMutability,
  Options as Options_,
} from '../../types/contracts'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { multicall } from './multicall'
import { readContract } from './readContract'

type Options = Options_ & { isContractsOptional?: boolean }

export type ReadContractsConfig<
  TContracts extends unknown[],
  TOptions extends Options = DefaultOptions,
  _Contracts = readonly [
    ...ContractsConfig<
      TContracts,
      {
        /** Chain id to use for provider */
        chainId?: number
      },
      TOptions
    >,
  ],
> = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  /** Call overrides */
  overrides?: GetOverridesForAbiStateMutability<'pure' | 'view'>
} & (TOptions['isContractsOptional'] extends true
  ? {
      /** Contracts to query */
      contracts?: _Contracts
    }
  : {
      /** Contracts to query */
      contracts: _Contracts
    })

export type ReadContractsResult<TContracts extends unknown[]> =
  ContractsResult<TContracts>

export async function readContracts<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends { abi: TAbi; functionName: TFunctionName }[],
>({
  allowFailure = true,
  contracts,
  overrides,
}: ReadContractsConfig<TContracts>): Promise<ReadContractsResult<TContracts>> {
  type ContractConfig = {
    abi: Abi
    address: string
    args: unknown[]
    chainId?: number
    functionName: string
  }

  try {
    const provider = getProvider()
    const contractsByChainId = (
      contracts as unknown as ContractConfig[]
    ).reduce<{
      [chainId: number]: {
        contract: ContractConfig
        index: number
      }[]
    }>((contracts, contract, index) => {
      const chainId = contract.chainId ?? provider.network.chainId
      return {
        ...contracts,
        [chainId]: [...(contracts[chainId] || []), { contract, index }],
      }
    }, {})
    const promises = () =>
      Object.entries(contractsByChainId).map(([chainId, contracts]) =>
        multicall({
          allowFailure,
          chainId: parseInt(chainId),
          contracts: contracts.map(({ contract }) => contract),
          overrides,
        }),
      )

    let results
    if (allowFailure) {
      results = (await Promise.allSettled(promises()))
        .map((result) => {
          if (result.status === 'fulfilled') return result.value
          if (result.reason instanceof ChainDoesNotSupportMulticallError) {
            logWarn(result.reason.message)
            throw result.reason
          }
          return null
        })
        .flat()
    } else {
      results = (await Promise.all(promises())).flat()
    }

    // Reorder the contract results back to the order they were
    // provided in.
    const resultIndexes = Object.values(contractsByChainId)
      .map((contracts) => contracts.map(({ index }) => index))
      .flat()
    return results.reduce((results, result, index) => {
      results[resultIndexes[index]!] = result
      return results
    }, [] as unknown[]) as ReadContractsResult<TContracts>
  } catch (err) {
    if (err instanceof ContractResultDecodeError) throw err
    if (err instanceof ContractMethodNoResultError) throw err
    if (err instanceof ContractMethodRevertedError) throw err

    const promises = () =>
      (contracts as unknown as ContractConfig[]).map((contract) =>
        readContract({ ...contract, overrides }),
      )
    if (allowFailure)
      return (await Promise.allSettled(promises())).map((result, i) => {
        if (result.status === 'fulfilled') return result.value
        const { address, args, chainId, functionName } = contracts[i]
        const error = new ContractMethodRevertedError({
          address,
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
