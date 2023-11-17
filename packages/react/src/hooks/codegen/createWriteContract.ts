import {
  type Config,
  type ResolvedRegister,
  type WriteContractErrorType,
} from '@wagmi/core'
import {
  type Abi,
  type Account,
  type Address,
  type Chain,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'
import { type WriteContractParameters as viem_WriteContractParameters } from 'viem/actions'

import {
  type WriteContractData,
  type WriteContractMutateAsync,
  type WriteContractVariables,
} from '@wagmi/core/query'
import { useCallback } from 'react'

import type { MutateOptions } from '@tanstack/react-query'
import type {
  ChainIdParameter,
  ConnectorParameter,
  Evaluate,
  SelectChains,
  UnionEvaluate,
  UnionOmit,
} from '@wagmi/core/internal'
import { useAccount } from '../useAccount.js'
import { useChainId } from '../useChainId.js'
import {
  type UseWriteContractParameters,
  type UseWriteContractReturnType as wagmi_UseWriteContractReturnType,
  useWriteContract,
} from '../useWriteContract.js'

export type CreateWriteContract<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi
  address?: address
}

export function createWriteContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(config: CreateWriteContract<abi, address>) {
  // const myConfig = config
  // TODO
  // - add chainId for multichain address
  // - remove abi and address properties from parameters

  type stateMutability = 'nonpayable' | 'payable'
  type omittedProperties =
    | 'abi'
    | (typeof config.address extends undefined ? never : 'address')

  type WriteContractParameters<
    abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, stateMutability>,
    args extends ContractFunctionArgs<abi, stateMutability, functionName>,
    config extends Config,
    chainId extends config['chains'][number]['id'],
    ///
    allFunctionNames = ContractFunctionName<abi, stateMutability>,
    chains extends readonly Chain[] = SelectChains<config, chainId>,
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
      Evaluate<ChainIdParameter<config, chainId>> &
      ConnectorParameter & { __mode?: 'prepared' }
  >

  type UseWriteContractReturnType<
    config extends Config,
    context,
  > = wagmi_UseWriteContractReturnType<config, context> & {
    writeContract: <
      const abi extends typeof config.abi,
      functionName extends ContractFunctionName<abi, stateMutability>,
      args extends ContractFunctionArgs<abi, stateMutability, functionName>,
      chainId extends config['chains'][number]['id'],
    >(
      variables: WriteContractParameters<
        abi,
        functionName,
        args,
        config,
        chainId
      >,
      options?:
        | MutateOptions<
            WriteContractData,
            WriteContractErrorType,
            WriteContractVariables<
              abi,
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
    writeContractAsync: WriteContractMutateAsync<config, context>
  }

  if (config.address !== undefined && typeof config.address === 'object')
    return <
      config extends Config = ResolvedRegister['config'],
      context = unknown,
    >(
      parameters?: UseWriteContractParameters<config, context>,
    ): UseWriteContractReturnType<config, context> => {
      const { writeContract, writeContractAsync, ...result } =
        useWriteContract(parameters)

      const configChainId = useChainId()
      const account = useAccount()

      type Return = UseWriteContractReturnType<config, context>
      return {
        ...result,
        writeContract: useCallback(
          (...parameters: Parameters<Return['writeContract']>) => {
            const [args, options] = parameters
            const chainId = args.chainId ?? account.chainId ?? configChainId
            const address = config.address![chainId]
            writeContract(
              { ...(args as any), abi: config.abi, address },
              options as any,
            )
          },
          [account.chainId, configChainId, writeContract],
        ) as Return['writeContract'],
        writeContractAsync: useCallback(
          (...parameters: Parameters<Return['writeContract']>) => {
            const [args, options] = parameters
            const chainId = args.chainId ?? account.chainId ?? configChainId
            const address = config.address![chainId]
            return writeContractAsync(
              { ...(args as any), abi: config.abi, address },
              options as any,
            )
          },
          [account.chainId, configChainId, writeContractAsync],
        ) as Return['writeContractAsync'],
      }
    }

  return <
    config extends Config = ResolvedRegister['config'],
    context = unknown,
  >(
    parameters?: UseWriteContractParameters<config, context>,
  ): UseWriteContractReturnType<config, context> => {
    const { writeContract, writeContractAsync, ...result } =
      useWriteContract(parameters)

    type Return = UseWriteContractReturnType<config, context>
    return {
      ...result,
      writeContract: useCallback(
        (...parameters: Parameters<Return['writeContract']>) => {
          const [args, options] = parameters
          const address = 'address' in args ? args.address : config.address
          writeContract(
            { ...(args as any), abi: config.abi, address },
            options as any,
          )
        },
        [writeContract],
      ) as Return['writeContract'],
      writeContractAsync: useCallback(
        (...parameters: Parameters<Return['writeContractAsync']>) => {
          const [args, options] = parameters
          const address = 'address' in args ? args.address : config.address
          return writeContractAsync(
            { ...(args as any), abi: config.abi, address },
            options as any,
          )
        },
        [writeContractAsync],
      ) as Return['writeContractAsync'],
    }
  }
}
