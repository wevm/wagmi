import { CallOverrides } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { getProvider } from '../providers'
import { getContract } from './getContract'
import { getChains } from '../chains'
import { multicallInterface } from '../../constants'
import { ReadContractConfig } from './readContract'

export type MulticallArgs = {
  addressOrName: ReadContractConfig['addressOrName']
  /** Allows the contract read to fail silently */
  allowFailure?: boolean
  args?: ReadContractConfig['args']
  contractInterface: ReadContractConfig['contractInterface']
  functionName: ReadContractConfig['functionName']
}[]
export type MulticallConfig = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  /** Chain id to use for provider */
  chainId?: number
  /** Call overrides */
  overrides?: CallOverrides
}
export type MulticallResult = Result[]

type AggregateResult = {
  success: boolean
  returnData: string
}[]

export async function multicall(
  multicallArgs: MulticallArgs,
  {
    allowFailure: globalAllowFailure = true,
    chainId,
    overrides,
  }: MulticallConfig = {},
): Promise<MulticallResult> {
  const { chains } = getChains()
  const chain = chains.find((chain) => chain.id === chainId) || chains[0]
  if (!chain?.multicall) {
    throw new Error(`Chain "${chain.name}" does not support multicall.`)
  }
  if (
    typeof overrides?.blockTag === 'number' &&
    overrides?.blockTag < chain.multicall.blockCreated
  ) {
    throw new Error(
      `Chain "${chain.name}" does not support multicall on block ${overrides.blockTag}`,
    )
  }

  const provider = getProvider({ chainId })
  const multicallContract = getContract({
    addressOrName: chain.multicall.address,
    contractInterface: multicallInterface,
    signerOrProvider: provider,
  })
  const calls = multicallArgs.map(
    ({
      addressOrName,
      contractInterface,
      functionName,
      allowFailure,
      ...config
    }) => {
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
        allowFailure: allowFailure ?? globalAllowFailure,
        callData,
      }
    },
  )
  const params = [...[calls], ...(overrides ? [overrides] : [])]
  const results = (await multicallContract.aggregate3(
    ...params,
  )) as AggregateResult
  return results.map(({ returnData, success }, i) => {
    if (!success) return undefined
    const { addressOrName, contractInterface, functionName } = multicallArgs[i]
    const contract = getContract({
      addressOrName,
      contractInterface,
    })
    const result = contract.interface.decodeFunctionResult(
      functionName,
      returnData,
    )
    return Array.isArray(result) ? result[0] : result
  })
}
