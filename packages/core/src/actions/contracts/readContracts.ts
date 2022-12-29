import type { Abi, Address } from 'abitype'

import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
} from '../../errors'
import type {
  Contract,
  ContractsConfig,
  ContractsResult,
  GetOverridesForAbiStateMutability,
} from '../../types/contracts'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { multicall } from './multicall'
import { readContract } from './readContract'

export type ReadContractsConfig<TContracts extends Contract[]> = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  /** Contracts to query */
  contracts: readonly [
    ...ContractsConfig<
      TContracts,
      {
        /** Chain id to use for provider */
        chainId?: number
      }
    >,
  ]
  /** Call overrides */
  overrides?: GetOverridesForAbiStateMutability<'pure' | 'view'>
}

export type ReadContractsResult<TContracts extends Contract[]> =
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
    address: Address
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

    let multicallResults
    if (allowFailure) {
      multicallResults = (await Promise.allSettled(promises()))
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
      multicallResults = (await Promise.all(promises())).flat()
    }

    // Reorder the contract results back to the order they were
    // provided in.
    const resultIndexes = Object.values(contractsByChainId)
      .map((contracts) => contracts.map(({ index }) => index))
      .flat()
    return multicallResults.reduce((results, result, index) => {
      if (results)
        (results as Record<string | number, unknown> & readonly unknown[])[
          resultIndexes[index]!
        ] = result
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
          chainId: chainId ?? 1,
          args,
          errorMessage: result.reason,
        })
        logWarn(error.message)
        return null
      }) as ReadContractsResult<TContracts>

    return (await Promise.all(promises())) as ReadContractsResult<TContracts>
  }
}
