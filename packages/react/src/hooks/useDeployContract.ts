'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  DeployContractErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type DeployContractData,
  type DeployContractMutate,
  type DeployContractMutateAsync,
  type DeployContractVariables,
  deployContractMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseDeployContractParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          DeployContractData,
          DeployContractErrorType,
          DeployContractVariables<Abi, config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseDeployContractReturnType<
  config extends Config = Config,
  context = unknown,
> = UseMutationReturnType<
  DeployContractData,
  DeployContractErrorType,
  DeployContractVariables<Abi, config, config['chains'][number]['id']>,
  context
> & {
  deployContract: DeployContractMutate<config, context>
  deployContractAsync: DeployContractMutateAsync<config, context>
}

/** https://wagmi.sh/react/api/hooks/useDeployContract */
export function useDeployContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseDeployContractParameters<config, context> = {},
): UseDeployContractReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = deployContractMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseDeployContractReturnType<config, context>
  return {
    ...result,
    deployContract: mutate as Return['deployContract'],
    deployContractAsync: mutateAsync as Return['deployContractAsync'],
  }
}
