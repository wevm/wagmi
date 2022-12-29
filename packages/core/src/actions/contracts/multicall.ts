import type { Abi } from 'abitype'

import { multicallABI } from '../../constants'
import {
  ChainDoesNotSupportMulticallError,
  ContractMethodNoResultError,
  ContractMethodRevertedError,
  ContractResultDecodeError,
  ProviderChainsNotFound,
} from '../../errors'
import type {
  Contract,
  ContractsConfig,
  ContractsResult,
  GetConfig,
  GetOverridesForAbiStateMutability,
} from '../../types/contracts'
import { logWarn, normalizeFunctionName } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

export type MulticallConfig<TContracts extends Contract[]> = {
  /** Failures in the multicall will fail silently */
  allowFailure?: boolean
  /** Chain id to use for provider */
  chainId?: number
  /** Contracts to query */
  contracts: readonly [...ContractsConfig<TContracts>]
  /** Call overrides */
  overrides?: GetOverridesForAbiStateMutability<'pure' | 'view'>
}

export type MulticallResult<TContracts extends Contract[]> =
  ContractsResult<TContracts>

export async function multicall<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TContracts extends { abi: TAbi; functionName: TFunctionName }[],
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
  if (!chain?.contracts?.multicall3)
    throw new ChainDoesNotSupportMulticallError({ chain })

  if (
    typeof overrides?.blockTag === 'number' &&
    overrides?.blockTag < (chain.contracts.multicall3.blockCreated ?? 0)
  )
    throw new ChainDoesNotSupportMulticallError({
      blockNumber: overrides?.blockTag,
      chain,
    })

  const multicallContract = getContract({
    address: chain.contracts.multicall3.address,
    abi: multicallABI,
    signerOrProvider: provider,
  })
  const calls = (contracts as unknown as GetConfig[]).map(
    ({ address, abi, functionName, ...config }) => {
      const { args } = config || {}
      const contract = getContract({ address, abi })
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
            `"${normalizedFunctionName}" is not in the interface for contract "${address}"`,
          )
        const callData = contract.interface.encodeFunctionData(
          normalizedFunctionName,
          params,
        )
        return {
          target: address,
          allowFailure,
          callData,
        }
      } catch (err) {
        if (!allowFailure) throw err
        return {
          target: address,
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
  const params: any = [...[calls], ...(overrides ? [overrides] : [])]
  const results = (await multicallContract.aggregate3(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...params,
  )) as AggregateResult
  return results.map(({ returnData, success }, i) => {
    const { address, abi, functionName, ...rest } = contracts[i]

    const contract = getContract({
      address,
      abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
    })
    const args = rest.args as unknown[]
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
          address,
          args,
          chainId: chain.id,
          functionName: normalizedFunctionName,
          errorMessage: (err as Error).message,
        })
        if (!allowFailure) throw error
        logWarn(error.message)
      }
      return null
    }

    if (returnData === '0x') {
      const error = new ContractMethodNoResultError({
        address,
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
        address,
        args,
        chainId: chain.id,
        functionName: normalizedFunctionName,
        errorMessage: (err as Error).message,
      })
      if (!allowFailure) throw error
      logWarn(error.message)
      return null
    }
  }) as MulticallResult<TContracts>
}
