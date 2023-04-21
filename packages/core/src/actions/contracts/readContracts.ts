import type { Narrow } from 'abitype'
import type {
  ContractFunctionConfig,
  MulticallContracts,
  MulticallParameters,
} from 'viem'
import { ContractFunctionExecutionError } from 'viem'

import { getPublicClient } from '../viem'
import type { MulticallConfig, MulticallResult } from './multicall'
import { multicall } from './multicall'
import { readContract } from './readContract'

export type ReadContractsConfig<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = Omit<
  MulticallConfig<TContracts, TAllowFailure>,
  'contracts' | 'chainId'
> & {
  /** Contracts to query */
  contracts: Narrow<
    readonly [
      ...MulticallContracts<
        TContracts,
        {
          /** Chain id to use for Public Client. */
          chainId?: number
        }
      >,
    ]
  >
}

export type ReadContractsResult<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = MulticallResult<TContracts, TAllowFailure>

export async function readContracts<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
>({
  contracts,
  blockNumber,
  blockTag,
  ...args
}: ReadContractsConfig<TContracts, TAllowFailure>): Promise<
  ReadContractsResult<TContracts, TAllowFailure>
> {
  type ContractConfig = TContracts[number] & {
    chainId?: number
  }

  const { allowFailure = true } = args

  try {
    const publicClient = getPublicClient()
    const contractsByChainId = (
      contracts as unknown as ContractConfig[]
    ).reduce<{
      [chainId: number]: {
        contract: ContractConfig
        index: number
      }[]
    }>((contracts, contract, index) => {
      const chainId = contract.chainId ?? publicClient.chain.id
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
          contracts: contracts.map(
            ({ contract }) => contract,
          ) as MulticallParameters['contracts'],
          blockNumber,
          blockTag,
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
    }, [] as unknown[]) as ReadContractsResult<TContracts, TAllowFailure>
  } catch (err) {
    if (err instanceof ContractFunctionExecutionError) throw err

    const promises = () =>
      (contracts as unknown as ContractConfig[]).map((contract) =>
        readContract({ ...contract, blockNumber, blockTag }),
      )
    if (allowFailure)
      return (await Promise.allSettled(promises())).map((result) => {
        if (result.status === 'fulfilled')
          return { result: result.value, status: 'success' }
        return { error: result.reason, result: undefined, status: 'failure' }
      }) as ReadContractsResult<TContracts, TAllowFailure>

    return (await Promise.all(promises())) as ReadContractsResult<
      TContracts,
      TAllowFailure
    >
  }
}
