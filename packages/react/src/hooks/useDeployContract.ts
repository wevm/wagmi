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
  type DeployContractOptions,
  type DeployContractVariables,
  deployContractMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseDeployContractParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & DeployContractOptions<config, context>>

export type UseDeployContractReturnType<
  config extends Config = Config,
  context = unknown,
> = UseMutationReturnType<
  DeployContractData,
  DeployContractErrorType,
  DeployContractVariables<Abi, config, config['chains'][number]['id']>,
  context,
  DeployContractMutate<config, context>,
  DeployContractMutateAsync<config, context>
> & {
  /** @deprecated use `mutate` instead */
  deployContract: DeployContractMutate<config, context>
  /** @deprecated use `mutateAsync` instead */
  deployContractAsync: DeployContractMutateAsync<config, context>
}

/** https://wagmi.sh/react/api/hooks/useDeployContract */
export function useDeployContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseDeployContractParameters<config, context> = {},
): UseDeployContractReturnType<config, context> {
  const config = useConfig(parameters)
  const options = deployContractMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseDeployContractReturnType<config, context>
  return {
    ...(mutation as Return),
    deployContract: mutation.mutate as Return['mutate'],
    deployContractAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
