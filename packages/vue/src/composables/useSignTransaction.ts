import { useMutation } from '@tanstack/vue-query'
import type {
  Config,
  ResolvedRegister,
  SelectChains,
  SignTransactionErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SignTransactionData,
  type SignTransactionMutate,
  type SignTransactionMutateAsync,
  type SignTransactionOptions,
  type SignTransactionVariables,
  signTransactionMutationOptions,
} from '@wagmi/core/query'
import type { SignTransactionRequest as viem_SignTransactionRequest } from 'viem'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSignTransactionParameters<
  config extends Config = Config,
  request extends viem_SignTransactionRequest<
    SelectChains<config, config['chains'][number]['id']>[0],
    SelectChains<config, config['chains'][number]['id']>[0]
  > = viem_SignTransactionRequest<
    SelectChains<config, config['chains'][number]['id']>[0],
    SelectChains<config, config['chains'][number]['id']>[0]
  >,
  context = unknown,
> = Compute<
  ConfigParameter<config> &
    SignTransactionOptions<
      config,
      config['chains'][number]['id'],
      request,
      context
    >
>

export type UseSignTransactionReturnType<
  config extends Config = Config,
  request extends viem_SignTransactionRequest<
    SelectChains<config, config['chains'][number]['id']>[0],
    SelectChains<config, config['chains'][number]['id']>[0]
  > = viem_SignTransactionRequest<
    SelectChains<config, config['chains'][number]['id']>[0],
    SelectChains<config, config['chains'][number]['id']>[0]
  >,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SignTransactionData<config, config['chains'][number]['id'], request>,
    SignTransactionErrorType,
    SignTransactionVariables<config, config['chains'][number]['id'], request>,
    context,
    SignTransactionMutate<config, context>,
    SignTransactionMutateAsync<config, context>
  > & {
    /** @deprecated use `mutate` instead */
    signTransaction: SignTransactionMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    signTransactionAsync: SignTransactionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/vue/api/composables/useSignTransaction */
export function useSignTransaction<
  config extends Config = ResolvedRegister['config'],
  request extends viem_SignTransactionRequest<
    SelectChains<config, config['chains'][number]['id']>[0],
    SelectChains<config, config['chains'][number]['id']>[0]
  > = viem_SignTransactionRequest<
    SelectChains<config, config['chains'][number]['id']>[0],
    SelectChains<config, config['chains'][number]['id']>[0]
  >,
  context = unknown,
>(
  parameters: UseSignTransactionParameters<config, request, context> = {},
): UseSignTransactionReturnType<config, request, context> {
  const config = useConfig(parameters)
  const options = signTransactionMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSignTransactionReturnType<config, request, context>
  return {
    ...(mutation as unknown as Return),
    signTransaction: mutation.mutate as Return['mutate'],
    signTransactionAsync:
      mutation.mutateAsync as unknown as Return['mutateAsync'],
  }
}
