import type {
  MulticallContract,
  MulticallParameters as viem_MulticallParameters,
  MulticallReturnType as viem_MulticallReturnType,
} from 'viem'
import { ContractFunctionExecutionError } from 'viem'

import { type Config } from '../config.js'
import { type ChainIdParameter } from '../types/properties.js'
import { multicall } from './multicall.js'
import { readContract } from './readContract.js'

export type ReadContractsParameters<
  config extends Config = Config,
  contracts extends readonly unknown[] = readonly MulticallContract[],
  allowFailure extends boolean = true,
> = viem_MulticallParameters<
  contracts,
  allowFailure,
  { properties: ChainIdParameter<config> }
>

export type ReadContractsReturnType<
  contracts extends readonly unknown[] = readonly MulticallContract[],
  allowFailure extends boolean = true,
> = viem_MulticallReturnType<contracts, allowFailure>

export type ReadContractsError = Error

export async function readContracts<
  config extends Config,
  const contracts extends readonly MulticallContract[],
  allowFailure extends boolean = true,
>(
  config: config,
  parameters: ReadContractsParameters<config, contracts, allowFailure>,
): Promise<ReadContractsReturnType<contracts, allowFailure>> {
  const { allowFailure = true, blockNumber, blockTag, ...rest } = parameters
  const contracts = parameters.contracts as (MulticallContract & {
    chainId?: number | undefined
  })[]

  try {
    const contractsByChainId = contracts.reduce(
      (contracts, contract, index) => {
        const chainId = contract.chainId ?? config.state.chainId
        return {
          ...contracts,
          [chainId]: [...(contracts[chainId] || []), { contract, index }],
        }
      },
      {} as {
        [chainId: number]: { contract: MulticallContract; index: number }[]
      },
    )
    const promises = () =>
      Object.entries(contractsByChainId).map(([chainId, contracts]) =>
        multicall(config, {
          ...rest,
          allowFailure,
          chainId: parseInt(chainId),
          contracts: contracts.map(({ contract }) => contract),
        }),
      )

    const multicallResults = (await Promise.all(promises())).flat()
    // Reorder the contract results back to the order they were
    // provided in.
    const resultIndexes = Object.values(contractsByChainId).flatMap(
      (contracts) => contracts.map(({ index }) => index),
    )
    return multicallResults.reduce((results, result, index) => {
      if (results) results[resultIndexes[index]!] = result
      return results
    }, [] as unknown[]) as ReadContractsReturnType<contracts, allowFailure>
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) throw error

    const promises = () =>
      contracts.map((contract) =>
        readContract(config, { ...contract, blockNumber, blockTag }),
      )
    if (allowFailure)
      return (await Promise.allSettled(promises())).map((result) => {
        if (result.status === 'fulfilled')
          return { result: result.value, status: 'success' }
        return { error: result.reason, result: undefined, status: 'failure' }
      }) as ReadContractsReturnType<contracts, allowFailure>

    return (await Promise.all(promises())) as ReadContractsReturnType<
      contracts,
      allowFailure
    >
  }
}
