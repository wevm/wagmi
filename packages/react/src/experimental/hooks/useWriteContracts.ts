'use client'

import { useMutation } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import {
  type WriteContractsData,
  type WriteContractsErrorType,
  type WriteContractsMutate,
  type WriteContractsMutateAsync,
  type WriteContractsVariables,
  writeContractsMutationOptions,
} from '@wagmi/core/experimental'
import type { Compute } from '@wagmi/core/internal'
import type { ContractFunctionParameters } from 'viem'

import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter } from '../../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../../utils/query.js'

export type UseWriteContractsParameters<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          WriteContractsData,
          WriteContractsErrorType,
          WriteContractsVariables<
            contracts,
            config,
            config['chains'][number]['id']
          >,
          context
        >
      | undefined
  }
>

export type UseWriteContractsReturnType<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    WriteContractsData,
    WriteContractsErrorType,
    WriteContractsVariables<contracts, config, config['chains'][number]['id']>,
    context
  > & {
    writeContracts: WriteContractsMutate<contracts, config, context>
    writeContractsAsync: WriteContractsMutateAsync<contracts, config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useWriteContracts */
export function useWriteContracts<
  const contracts extends
    readonly unknown[] = readonly ContractFunctionParameters[],
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteContractsParameters<contracts, config, context> = {},
): UseWriteContractsReturnType<contracts, config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = writeContractsMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseWriteContractsReturnType<contracts, config, context>
  return {
    ...result,
    writeContracts: mutate as Return['writeContracts'],
    writeContractsAsync: mutateAsync as Return['writeContractsAsync'],
  }
}
