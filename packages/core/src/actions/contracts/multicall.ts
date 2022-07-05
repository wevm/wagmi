import { CallOverrides } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { getProvider } from '../providers'
import { getContract } from './getContract'
import { multicallInterface } from '../../constants'
import { ReadContractConfig } from './readContract'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ProviderChainsNotFound,
} from '../../errors'

type MulticallContract = {
  addressOrName: ReadContractConfig['addressOrName']
  args?: ReadContractConfig['args']
  contractInterface: ReadContractConfig['contractInterface']
  functionName: ReadContractConfig['functionName']
}

export type MulticallConfig = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  /** Chain id to use for provider */
  chainId?: number
  contracts: MulticallContract[]
  /** Call overrides */
  overrides?: CallOverrides
}
export type MulticallResult<Data extends any[] = Result[]> = Data

type AggregateResult = {
  success: boolean
  returnData: string
}[]

export async function multicall<Data extends any[] = Result[]>({
  allowFailure = true,
  chainId,
  contracts,
  overrides,
}: MulticallConfig): Promise<MulticallResult<Data>> {
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
    contractInterface: multicallInterface,
    signerOrProvider: provider,
  })
  const calls = contracts.map(
    ({ addressOrName, contractInterface, functionName, ...config }) => {
      const { args } = config || {}
      const contract = getContract({
        addressOrName,
        contractInterface,
      })
      const params = Array.isArray(args) ? args : args ? [args] : []
      const callData = contract.interface.encodeFunctionData(
        functionName,
        params,
      )
      if (!contract[functionName])
        console.warn(
          `"${functionName}" is not in the interface for contract "${addressOrName}"`,
        )
      return {
        target: addressOrName,
        allowFailure,
        callData,
      }
    },
  )
  const params = [...[calls], ...(overrides ? [overrides] : [])]
  const results = (await multicallContract.aggregate3(
    ...params,
  )) as AggregateResult
  return results.map(({ returnData, success }, i) => {
    if (!success) return null
    const { addressOrName, contractInterface, functionName } = <
      MulticallContract
    >contracts[i]

    if (returnData === '0x') {
      const err = new ContractMethodNoResultError({
        addressOrName,
        blockExplorer: chain.blockExplorers?.default,
        functionName,
      })
      if (!allowFailure) throw err
      console.warn(err.message)
      return null
    }

    const contract = getContract({
      addressOrName,
      contractInterface,
    })
    try {
      const result = contract.interface.decodeFunctionResult(
        functionName,
        returnData,
      )
      return Array.isArray(result) && result.length === 1 ? result[0] : result
    } catch (err) {
      if (!allowFailure) throw err
      return null
    }
  }) as Data
}
