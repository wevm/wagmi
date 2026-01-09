import type { UseMutationResult } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import { Actions } from '@wagmi/core/tempo'
import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter } from '../../types/properties.js'
import { type UseMutationParameters, useMutation } from '../../utils/query.js'

/**
 * Hook for funding an account with an initial amount of set token(s)
 * on Tempo's testnet.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.faucet.useFund()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ account: '0xdeadbeef...' })}
 *       disabled={isPending}
 *     >
 *       Fund Account
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useFund<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useFund.Parameters<config, context> = {},
): useFund.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.faucet.fund(config, variables)
    },
    mutationKey: ['fund'],
  })
}

export declare namespace useFund {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.faucet.fund.ReturnValue,
          Actions.faucet.fund.ErrorType,
          Actions.faucet.fund.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.faucet.fund.ReturnValue,
    Actions.faucet.fund.ErrorType,
    Actions.faucet.fund.Parameters<config>,
    context
  >
}

/**
 * Hook for funding an account with an initial amount of set token(s)
 * on Tempo's testnet. Returns the transaction receipts.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.faucet.useFundSync()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ account: '0xdeadbeef...' })}
 *       disabled={isPending}
 *     >
 *       Fund Account
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useFundSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useFundSync.Parameters<config, context> = {},
): useFundSync.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.faucet.fundSync(config, variables)
    },
    mutationKey: ['fundSync'],
  })
}

export declare namespace useFundSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.faucet.fundSync.ReturnValue,
          Actions.faucet.fundSync.ErrorType,
          Actions.faucet.fundSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.faucet.fundSync.ReturnValue,
    Actions.faucet.fundSync.ErrorType,
    Actions.faucet.fundSync.Parameters<config>,
    context
  >
}
