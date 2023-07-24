import type {
  ContractFunctionConfig,
  MulticallContracts,
  MulticallParameters as viem_MulticallParameters,
  Narrow,
} from 'viem'
import { ContractFunctionExecutionError } from 'viem'

import { type Config } from '../config.js'
import { type ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import type { MulticallParameters, MulticallReturnType } from './multicall.js'
import { multicall } from './multicall.js'
import { readContract } from './readContract.js'

export type ReadContractsParameters<
  config extends Config = Config,
  contracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  allowFailure extends boolean = true,
> = Omit<
  MulticallParameters<config, contracts, allowFailure>,
  'contracts' | 'chainId'
> & {
  /** Contracts to query */
  contracts: Narrow<
    readonly [...MulticallContracts<contracts, ChainIdParameter<config>>]
  >
}

export type ReadContractsReturnType<
  contracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  allowFailure extends boolean = true,
> = Evaluate<MulticallReturnType<contracts, allowFailure>>

export async function readContracts<
  config extends Config,
  const contracts extends ContractFunctionConfig[],
  allowFailure extends boolean = true,
>(
  config: config,
  parameters: ReadContractsParameters<config, contracts, allowFailure>,
): Promise<ReadContractsReturnType<contracts, allowFailure>> {
  const {
    allowFailure = true,
    contracts,
    blockNumber,
    blockTag,
    ...rest
  } = parameters

  type Contract = contracts[number] & { chainId?: number | undefined }

  try {
    const contractsByChainId = (contracts as unknown as Contract[]).reduce<{
      [chainId: number]: {
        contract: Contract
        index: number
      }[]
    }>((contracts, contract, index) => {
      const chainId = contract.chainId ?? config.state.chainId
      return {
        ...contracts,
        [chainId]: [...(contracts[chainId] || []), { contract, index }],
      }
    }, {})
    const promises = () =>
      Object.entries(contractsByChainId).map(([chainId, contracts]) =>
        multicall(config, {
          ...rest,
          allowFailure,
          chainId: parseInt(chainId),
          contracts: contracts.map(
            ({ contract }) => contract,
          ) as viem_MulticallParameters['contracts'],
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
      (contracts as unknown as Contract[]).map((contract) =>
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
