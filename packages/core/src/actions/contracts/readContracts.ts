import { CallOverrides } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { mainnet } from '../../chains'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
} from '../../errors'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { multicall } from './multicall'
import { ReadContractConfig, readContract } from './readContract'

export type ReadContractsContract = {
  addressOrName: ReadContractConfig['addressOrName']
  args?: ReadContractConfig['args']
  chainId?: ReadContractConfig['chainId']
  contractInterface: ReadContractConfig['contractInterface']
  functionName: ReadContractConfig['functionName']
}

export type ReadContractsConfig = {
  /** Failures will fail silently */
  allowFailure?: boolean
  contracts: ReadContractsContract[]
  /** Call overrides */
  overrides?: CallOverrides
}
export type ReadContractsResult<Data extends any[] = Result[]> = Data

export async function readContracts<Data extends any[] = Result[]>({
  allowFailure = true,
  contracts,
  overrides,
}: ReadContractsConfig): Promise<ReadContractsResult<Data>> {
  try {
    const provider = getProvider()

    // We want to group the contracts by chain id so we can send it off
    // in batch to the multicall contract.
    // We also want to preserve the positions (index) of the `contracts` argument
    // so we can reorder it later.
    const contractsByChainId = contracts.reduce<{
      [chainId: number]: {
        contract: ReadContractsContract
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
        multicall<Data>({
          allowFailure,
          chainId: parseInt(chainId),
          contracts: contracts.map(({ contract }) => contract),
          overrides,
        }),
      )

    let results: Data
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
        .flat() as Data
    } else {
      results = (await Promise.all(promises())).flat() as Data
    }

    // Reorder the contract results back to the order they were
    // provided in.
    const resultIndexes = Object.values(contractsByChainId)
      .map((contracts) => contracts.map(({ index }) => index))
      .flat()
    return results.reduce((results, result, i) => {
      results[resultIndexes[i]!] = result
      return results
    }, [])
  } catch (err) {
    if (err instanceof ContractResultDecodeError) throw err
    if (err instanceof ContractMethodNoResultError) throw err
    if (err instanceof ContractMethodRevertedError) throw err

    const promises = () =>
      contracts.map((contract) => readContract({ ...contract, overrides }))
    if (allowFailure) {
      return (await Promise.allSettled(promises())).map((result, i) => {
        if (result.status === 'fulfilled') return result.value
        const { addressOrName, functionName, chainId, args } = contracts[
          i
        ] as ReadContractsContract
        const error = new ContractMethodRevertedError({
          addressOrName,
          functionName,
          chainId: chainId ?? mainnet.id,
          args,
          errorMessage: result.reason,
        })
        logWarn(error.message)
        return null
      }) as Data
    }
    return (await Promise.all(promises())) as Data
  }
}
