import { Abi } from 'abitype'
import { CallOverrides } from 'ethers/lib/ethers'

import { multicallABI } from '../../constants'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
} from '../../errors'
import {
  ContractConfig,
  ContractsConfig,
  ContractsResult,
} from '../../types/contracts'
import { logWarn, normalizeFunctionName } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

export type MulticallConfig<TContracts extends unknown[]> = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  /** Chain id to use for provider */
  chainId?: number
  /** Contracts to query */
  contracts: readonly [...ContractsConfig<TContracts>]
  /** Call overrides */
  overrides?: CallOverrides
}

export type MulticallResult<TContracts extends unknown[]> =
  ContractsResult<TContracts>

export async function multicall<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends { contractInterface: TAbi; functionName: TFunctionName }[],
>({
  allowFailure = true,
  chainId,
  contracts,
  overrides,
}: MulticallConfig<TContracts>): Promise<MulticallResult<TContracts>> {
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
    contractInterface: multicallABI,
    signerOrProvider: provider,
  })
  const calls = (<ContractConfig[]>(<unknown>contracts)).map(
    ({ addressOrName, contractInterface, functionName, ...config }) => {
      const { args } = config || {}
      const contract = getContract({
        addressOrName,
        contractInterface,
      })
      const params = args ?? []
      const normalizedFunctionName = normalizeFunctionName({
        contract,
        functionName,
        args,
      })
      try {
        const contractFunction = contract[normalizedFunctionName]
        if (!contractFunction)
          logWarn(
            `"${normalizedFunctionName}" is not in the interface for contract "${addressOrName}"`,
          )
        const callData = contract.interface.encodeFunctionData(
          normalizedFunctionName,
          params,
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

  type AggregateResult = {
    success: boolean
    returnData: string
  }[]
  const params = [...[calls], ...(overrides ? [overrides] : [])]
  const results = (await multicallContract.aggregate3(
    ...params,
  )) as AggregateResult
  return results.map(({ returnData, success }, i) => {
    const { addressOrName, contractInterface, functionName, args } = contracts[
      i
    ] as ContractConfig

    const contract = getContract({
      addressOrName,
      contractInterface,
    })
    const normalizedFunctionName = normalizeFunctionName({
      contract,
      functionName,
      args,
    })

    if (!success) {
      let error
      try {
        contract.interface.decodeFunctionResult(
          normalizedFunctionName,
          returnData,
        )
      } catch (err) {
        error = new ContractMethodRevertedError({
          addressOrName,
          args,
          chainId: chain.id,
          functionName: normalizedFunctionName,
          errorMessage: (<Error>err).message,
        })
        if (!allowFailure) throw error
        logWarn(error.message)
      }
      return null
    }

    if (returnData === '0x') {
      const error = new ContractMethodNoResultError({
        addressOrName,
        args,
        chainId: chain.id,
        functionName: normalizedFunctionName,
      })
      if (!allowFailure) throw error
      logWarn(error.message)
      return null
    }

    try {
      const result = contract.interface.decodeFunctionResult(
        normalizedFunctionName,
        returnData,
      )
      return Array.isArray(result) && result.length === 1 ? result[0] : result
    } catch (err) {
      const error = new ContractResultDecodeError({
        addressOrName,
        args,
        chainId: chain.id,
        functionName: normalizedFunctionName,
        errorMessage: (<Error>err).message,
      })
      if (!allowFailure) throw error
      logWarn(error.message)
      return null
    }
  }) as MulticallResult<TContracts>
}
