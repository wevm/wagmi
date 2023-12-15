import type { MutateOptions } from '@tanstack/react-query'
import {
  type Config,
  type ResolvedRegister,
  type WriteContractErrorType,
} from '@wagmi/core'
import type {
  ChainIdParameter,
  ConnectorParameter,
  Evaluate,
  SelectChains,
  UnionEvaluate,
  UnionOmit,
} from '@wagmi/core/internal'
import {
  type WriteContractData,
  type WriteContractVariables,
} from '@wagmi/core/query'
import { useCallback } from 'react'
import {
  type Abi,
  type Account,
  type Address,
  type Chain,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'
import { type WriteContractParameters as viem_WriteContractParameters } from 'viem/actions'

import { useAccount } from '../useAccount.js'
import { useChainId } from '../useChainId.js'
import {
  type UseWriteContractParameters,
  type UseWriteContractReturnType as wagmi_UseWriteContractReturnType,
  useWriteContract,
} from '../useWriteContract.js'

type stateMutability = 'nonpayable' | 'payable'

export type CreateWriteContractParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
}

export type CreateWriteContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
> = <config extends Config = ResolvedRegister['config'], context = unknown>(
  parameters?: UseWriteContractParameters<config, context>,
) => Evaluate<
  Omit<
    wagmi_UseWriteContractReturnType<config, context>,
    'writeContract' | 'writeContractAsync'
  > & {
    writeContract: <
      const abi2 extends abi,
      functionName extends ContractFunctionName<abi2, stateMutability>,
      args extends ContractFunctionArgs<abi2, stateMutability, functionName>,
      chainId extends config['chains'][number]['id'],
    >(
      variables: Variables<abi2, functionName, args, config, chainId, address>,
      options?:
        | MutateOptions<
            WriteContractData,
            WriteContractErrorType,
            WriteContractVariables<
              abi2,
              functionName,
              args,
              config,
              chainId,
              // use `functionName` to make sure it's not union of all possible function names
              functionName
            >,
            context
          >
        | undefined,
    ) => void
    writeContractAsync: <
      const abi2 extends abi,
      functionName extends ContractFunctionName<abi2, stateMutability>,
      args extends ContractFunctionArgs<abi2, stateMutability, functionName>,
      chainId extends config['chains'][number]['id'],
    >(
      variables: Variables<abi2, functionName, args, config, chainId, address>,
      options?:
        | MutateOptions<
            WriteContractData,
            WriteContractErrorType,
            WriteContractVariables<
              abi2,
              functionName,
              args,
              config,
              chainId,
              // use `functionName` to make sure it's not union of all possible function names
              functionName
            >,
            context
          >
        | undefined,
    ) => Promise<WriteContractData>
  }
>

export function createWriteContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(
  config: CreateWriteContractParameters<abi, address>,
): CreateWriteContractReturnType<abi, address> {
  if (config.address !== undefined && typeof config.address === 'object')
    return (parameters) => {
      const result = useWriteContract(parameters)
      const configChainId = useChainId()
      const account = useAccount()
      type Args = Parameters<wagmi_UseWriteContractReturnType['writeContract']>
      return {
        ...(result as any),
        writeContract: useCallback(
          (...args: Args) => {
            let chainId
            if (args[0].chainId) chainId = args[0].chainId
            else if (args[0].account && args[0].account === account.address)
              chainId = account.chainId
            else if (args[0].account === undefined) chainId = account.chainId
            else chainId = configChainId

            const address = chainId ? config.address?.[chainId] : undefined
            const variables = { ...(args[0] as any), ...config, address }
            result.writeContract(variables, args[1] as any)
          },
          [
            account.address,
            account.chainId,
            config,
            configChainId,
            result.writeContract,
          ],
        ),
        writeContractAsync: useCallback(
          (...args: Args) => {
            let chainId
            if (args[0].chainId) chainId = args[0].chainId
            else if (args[0].account && args[0].account === account.address)
              chainId = account.chainId
            else if (args[0].account === undefined) chainId = account.chainId
            else chainId = configChainId

            const address = chainId ? config.address?.[chainId] : undefined
            const variables = { ...(args[0] as any), ...config, address }
            return result.writeContractAsync(variables, args[1] as any)
          },
          [
            account.address,
            account.chainId,
            config,
            configChainId,
            result.writeContractAsync,
          ],
        ),
      }
    }

  return (parameters) => {
    const result = useWriteContract(parameters)
    type Args = Parameters<wagmi_UseWriteContractReturnType['writeContract']>
    return {
      ...(result as any),
      writeContract: useCallback(
        (...args: Args) => {
          const address = config.address ?? args[0].address
          const variables = { ...(args[0] as any), ...config, address }
          result.writeContract(variables, args[1] as any)
        },
        [config, result.writeContract],
      ),
      writeContractAsync: useCallback(
        (...args: Args) => {
          const address = config.address ?? args[0].address
          const variables = { ...(args[0] as any), ...config, address }
          return result.writeContractAsync(variables, args[1] as any)
        },
        [config, result.writeContractAsync],
      ),
    }
  }
}

type Variables<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, functionName>,
  config extends Config,
  chainId extends config['chains'][number]['id'],
  address extends Address | Record<number, Address> | undefined,
  ///
  allFunctionNames = ContractFunctionName<abi, stateMutability>,
  chains extends readonly Chain[] = SelectChains<config, chainId>,
  omittedProperties extends 'abi' | 'address' =
    | 'abi'
    | (address extends undefined ? never : 'address'),
> = UnionEvaluate<
  {
    [key in keyof chains]: UnionOmit<
      viem_WriteContractParameters<
        abi,
        functionName,
        args,
        chains[key],
        Account,
        chains[key],
        allFunctionNames
      >,
      omittedProperties | 'chain'
    >
  }[number] &
    (address extends Record<number, Address>
      ? {
          chainId?:
            | keyof address
            | (chainId extends keyof address ? chainId : never)
            | undefined
        }
      : Evaluate<ChainIdParameter<config, chainId>>) &
    ConnectorParameter & { __mode?: 'prepared' }
>
