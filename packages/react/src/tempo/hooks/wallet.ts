import type { UseMutationResult } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import { Actions } from '@wagmi/core/tempo'
import { useConfig } from '../../hooks/useConfig.js'
import { type UseMutationParameters, useMutation } from '../../utils/query.js'

/**
 * Hook for opening the wallet send flow with optional pre-filled send fields.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.wallet.useSend()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           to: '0x...',
 *           token: '0x...',
 *           value: '1.5',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Send
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSend<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSend.Parameters<config, context> = {},
): useSend.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.wallet.send(config, variables)
    },
    mutationKey: ['wallet', 'send'],
  })
}

export declare namespace useSend {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.wallet.send.ReturnValue,
          Actions.wallet.send.ErrorType,
          Actions.wallet.send.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.wallet.send.ReturnValue,
    Actions.wallet.send.ErrorType,
    Actions.wallet.send.Parameters<config>,
    context
  >
}

/**
 * Hook for opening the wallet swap flow with optional pre-filled swap fields.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.wallet.useSwap()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: '1.5',
 *           token: '0x...',
 *           type: 'sell',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Swap
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSwap<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSwap.Parameters<config, context> = {},
): useSwap.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.wallet.swap(config, variables)
    },
    mutationKey: ['wallet', 'swap'],
  })
}

export declare namespace useSwap {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.wallet.swap.ReturnValue,
          Actions.wallet.swap.ErrorType,
          Actions.wallet.swap.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.wallet.swap.ReturnValue,
    Actions.wallet.swap.ErrorType,
    Actions.wallet.swap.Parameters<config>,
    context
  >
}

/**
 * Hook for opening the wallet deposit flow with optional pre-filled deposit fields.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.wallet.useDeposit()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           token: '0x...',
 *           value: '1.5',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Deposit
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useDeposit<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useDeposit.Parameters<config, context> = {},
): useDeposit.ReturnType<config, context> {
  const { mutation } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.wallet.deposit(config, variables)
    },
    mutationKey: ['wallet', 'deposit'],
  })
}

export declare namespace useDeposit {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.wallet.deposit.ReturnValue,
          Actions.wallet.deposit.ErrorType,
          Actions.wallet.deposit.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.wallet.deposit.ReturnValue,
    Actions.wallet.deposit.ErrorType,
    Actions.wallet.deposit.Parameters<config>,
    context
  >
}
