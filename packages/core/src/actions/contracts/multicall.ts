import { CallOverrides } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { multicallInterface } from '../../constants'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
} from '../../errors'
import { getProvider } from '../providers'
import { getContract } from './getContract'
import { ReadContractConfig } from './readContract'

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
      try {
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
  const params = [...[calls], ...(overrides ? [overrides] : [])]
  const results = (await multicallContract.aggregate3(
    ...params,
  )) as AggregateResult
  return results.map(({ returnData, success }, i) => {
    const { addressOrName, contractInterface, functionName, args } = contracts[
      i
    ] as MulticallContract

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
        console.warn(error.message)
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
      console.warn(error.message)
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
      console.warn(error.message)
      return null
    }
  }) as Data
}
