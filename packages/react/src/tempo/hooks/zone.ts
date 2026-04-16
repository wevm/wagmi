import type { UseMutationResult } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import type { ConfigParameter, ExactPartial } from '@wagmi/core/internal'
import { Actions } from '@wagmi/core/tempo'
import { useChainId } from '../../hooks/useChainId.js'
import { useConfig } from '../../hooks/useConfig.js'
import {
  type UseMutationParameters,
  type UseQueryReturnType,
  useMutation,
  useQuery,
} from '../../utils/query.js'
import type { QueryParameter } from '../utils.js'

/**
 * Hook for getting information about the current zone authorization token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { data, isLoading } = Hooks.zone.useAuthorizationTokenInfo({
 *     chainId: zoneChain.id,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Expires At: {data?.expiresAt.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the current authorization token info.
 */
export function useAuthorizationTokenInfo<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.zone.getAuthorizationTokenInfo.ReturnValue,
>(
  parameters: useAuthorizationTokenInfo.Parameters<config, selectData> = {},
): useAuthorizationTokenInfo.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.zone.getAuthorizationTokenInfo.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useAuthorizationTokenInfo {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.zone.getAuthorizationTokenInfo.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.zone.getAuthorizationTokenInfo.ReturnValue,
      Actions.zone.getAuthorizationTokenInfo.ErrorType,
      selectData,
      Actions.zone.getAuthorizationTokenInfo.QueryKey<config>
    > &
    ExactPartial<Actions.zone.getAuthorizationTokenInfo.Parameters<config>>

  export type ReturnValue<
    selectData = Actions.zone.getAuthorizationTokenInfo.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting deposit processing status for a Tempo block number.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { data, isLoading } = Hooks.zone.useDepositStatus({
 *     chainId: zoneChain.id,
 *     tempoBlockNumber: 42n,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Processed: {String(data?.processed)}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the current deposit status.
 */
export function useDepositStatus<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.zone.getDepositStatus.ReturnValue,
>(
  parameters: useDepositStatus.Parameters<config, selectData> = {},
): useDepositStatus.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.zone.getDepositStatus.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useDepositStatus {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.zone.getDepositStatus.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.zone.getDepositStatus.ReturnValue,
      Actions.zone.getDepositStatus.ErrorType,
      selectData,
      Actions.zone.getDepositStatus.QueryKey<config>
    > &
    ExactPartial<Actions.zone.getDepositStatus.Parameters<config>>

  export type ReturnValue<
    selectData = Actions.zone.getDepositStatus.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the withdrawal fee for a given gas limit.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { data, isLoading } = Hooks.zone.useWithdrawalFee({
 *     chainId: zoneChain.id,
 *     gas: 21_000n,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Fee: {data?.toString()}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the withdrawal fee.
 */
export function useWithdrawalFee<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.zone.getWithdrawalFee.ReturnValue,
>(
  parameters: useWithdrawalFee.Parameters<config, selectData> = {},
): useWithdrawalFee.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.zone.getWithdrawalFee.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useWithdrawalFee {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.zone.getWithdrawalFee.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.zone.getWithdrawalFee.ReturnValue,
      Actions.zone.getWithdrawalFee.ErrorType,
      selectData,
      Actions.zone.getWithdrawalFee.QueryKey<config>
    > &
    ExactPartial<Actions.zone.getWithdrawalFee.Parameters<config>>

  export type ReturnValue<
    selectData = Actions.zone.getWithdrawalFee.ReturnValue,
  > = UseQueryReturnType<selectData, Error>
}

/**
 * Hook for getting the current zone metadata.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { data, isLoading } = Hooks.zone.useZoneInfo({
 *     chainId: zoneChain.id,
 *   })
 *
 *   if (isLoading) return <div>Loading...</div>
 *   return <div>Zone ID: {data?.zoneId}</div>
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Query result with the current zone metadata.
 */
export function useZoneInfo<
  config extends Config = ResolvedRegister['config'],
  selectData = Actions.zone.getZoneInfo.ReturnValue,
>(
  parameters: useZoneInfo.Parameters<config, selectData> = {},
): useZoneInfo.ReturnValue<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = Actions.zone.getZoneInfo.queryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  } as never)
  return useQuery(options) as never
}

export declare namespace useZoneInfo {
  export type Parameters<
    config extends Config = ResolvedRegister['config'],
    selectData = Actions.zone.getZoneInfo.ReturnValue,
  > = ConfigParameter<config> &
    QueryParameter<
      Actions.zone.getZoneInfo.ReturnValue,
      Actions.zone.getZoneInfo.ErrorType,
      selectData,
      Actions.zone.getZoneInfo.QueryKey<config>
    > &
    ExactPartial<Actions.zone.getZoneInfo.Parameters<config>>

  export type ReturnValue<selectData = Actions.zone.getZoneInfo.ReturnValue> =
    UseQueryReturnType<selectData, Error>
}

/**
 * Hook for signing and storing a zone authorization token.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useSignAuthorizationToken()
 *
 *   return (
 *     <button
 *       onClick={() => mutate({ chainId: zoneChain.id })}
 *       disabled={isPending}
 *     >
 *       Sign Zone Token
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useSignAuthorizationToken<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSignAuthorizationToken.Parameters<config, context> = {},
): useSignAuthorizationToken.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.signAuthorizationToken(config, variables)
    },
    mutationKey: ['signAuthorizationToken'],
  })
}

export declare namespace useSignAuthorizationToken {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.signAuthorizationToken.ReturnValue,
          Actions.zone.signAuthorizationToken.ErrorType,
          Actions.zone.signAuthorizationToken.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.signAuthorizationToken.ReturnValue,
    Actions.zone.signAuthorizationToken.ErrorType,
    Actions.zone.signAuthorizationToken.Parameters<config>,
    context
  >
}

/**
 * Hook for depositing tokens into a zone on the parent Tempo chain.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useDeposit()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           token: '0x20c0000000000000000000000000000000000001',
 *           zoneId: 7,
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
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.deposit(config, variables)
    },
    mutationKey: ['deposit'],
  })
}

export declare namespace useDeposit {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.deposit.ReturnValue,
          Actions.zone.deposit.ErrorType,
          Actions.zone.deposit.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.deposit.ReturnValue,
    Actions.zone.deposit.ErrorType,
    Actions.zone.deposit.Parameters<config>,
    context
  >
}

/**
 * Hook for depositing tokens into a zone on the parent Tempo chain.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useDepositSync()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           token: '0x20c0000000000000000000000000000000000001',
 *           zoneId: 7,
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
export function useDepositSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useDepositSync.Parameters<config, context> = {},
): useDepositSync.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.depositSync(config, variables)
    },
    mutationKey: ['depositSync'],
  })
}

export declare namespace useDepositSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.depositSync.ReturnValue,
          Actions.zone.depositSync.ErrorType,
          Actions.zone.depositSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.depositSync.ReturnValue,
    Actions.zone.depositSync.ErrorType,
    Actions.zone.depositSync.Parameters<config>,
    context
  >
}

/**
 * Hook for depositing tokens into a zone on the parent Tempo chain with an
 * encrypted recipient and memo.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useEncryptedDeposit()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           token: '0x20c0000000000000000000000000000000000001',
 *           zoneId: 7,
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Encrypted Deposit
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useEncryptedDeposit<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useEncryptedDeposit.Parameters<config, context> = {},
): useEncryptedDeposit.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.encryptedDeposit(config, variables)
    },
    mutationKey: ['encryptedDeposit'],
  })
}

export declare namespace useEncryptedDeposit {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.encryptedDeposit.ReturnValue,
          Actions.zone.encryptedDeposit.ErrorType,
          Actions.zone.encryptedDeposit.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.encryptedDeposit.ReturnValue,
    Actions.zone.encryptedDeposit.ErrorType,
    Actions.zone.encryptedDeposit.Parameters<config>,
    context
  >
}

/**
 * Hook for depositing tokens into a zone on the parent Tempo chain with an
 * encrypted recipient and memo.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useEncryptedDepositSync()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           token: '0x20c0000000000000000000000000000000000001',
 *           zoneId: 7,
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Encrypted Deposit
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useEncryptedDepositSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useEncryptedDepositSync.Parameters<config, context> = {},
): useEncryptedDepositSync.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.encryptedDepositSync(config, variables)
    },
    mutationKey: ['encryptedDepositSync'],
  })
}

export declare namespace useEncryptedDepositSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.encryptedDepositSync.ReturnValue,
          Actions.zone.encryptedDepositSync.ErrorType,
          Actions.zone.encryptedDepositSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.encryptedDepositSync.ReturnValue,
    Actions.zone.encryptedDepositSync.ErrorType,
    Actions.zone.encryptedDepositSync.Parameters<config>,
    context
  >
}

/**
 * Hook for requesting a withdrawal from a zone to the parent Tempo chain.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useRequestWithdrawal()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           chainId: zoneChain.id,
 *           token: '0x20c0000000000000000000000000000000000001',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Request Withdrawal
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRequestWithdrawal<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRequestWithdrawal.Parameters<config, context> = {},
): useRequestWithdrawal.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.requestWithdrawal(config, variables)
    },
    mutationKey: ['requestWithdrawal'],
  })
}

export declare namespace useRequestWithdrawal {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.requestWithdrawal.ReturnValue,
          Actions.zone.requestWithdrawal.ErrorType,
          Actions.zone.requestWithdrawal.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.requestWithdrawal.ReturnValue,
    Actions.zone.requestWithdrawal.ErrorType,
    Actions.zone.requestWithdrawal.Parameters<config>,
    context
  >
}

/**
 * Hook for requesting a withdrawal from a zone to the parent Tempo chain.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useRequestWithdrawalSync()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           chainId: zoneChain.id,
 *           token: '0x20c0000000000000000000000000000000000001',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Request Withdrawal
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRequestWithdrawalSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRequestWithdrawalSync.Parameters<config, context> = {},
): useRequestWithdrawalSync.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.requestWithdrawalSync(config, variables)
    },
    mutationKey: ['requestWithdrawalSync'],
  })
}

export declare namespace useRequestWithdrawalSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.requestWithdrawalSync.ReturnValue,
          Actions.zone.requestWithdrawalSync.ErrorType,
          Actions.zone.requestWithdrawalSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.requestWithdrawalSync.ReturnValue,
    Actions.zone.requestWithdrawalSync.ErrorType,
    Actions.zone.requestWithdrawalSync.Parameters<config>,
    context
  >
}

/**
 * Hook for requesting a verifiable withdrawal from a zone to the parent Tempo
 * chain.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useRequestVerifiableWithdrawal()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           chainId: zoneChain.id,
 *           revealTo:
 *             '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
 *           token: '0x20c0000000000000000000000000000000000001',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Request Verifiable Withdrawal
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRequestVerifiableWithdrawal<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRequestVerifiableWithdrawal.Parameters<config, context> = {},
): useRequestVerifiableWithdrawal.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.requestVerifiableWithdrawal(config, variables)
    },
    mutationKey: ['requestVerifiableWithdrawal'],
  })
}

export declare namespace useRequestVerifiableWithdrawal {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.requestVerifiableWithdrawal.ReturnValue,
          Actions.zone.requestVerifiableWithdrawal.ErrorType,
          Actions.zone.requestVerifiableWithdrawal.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.requestVerifiableWithdrawal.ReturnValue,
    Actions.zone.requestVerifiableWithdrawal.ErrorType,
    Actions.zone.requestVerifiableWithdrawal.Parameters<config>,
    context
  >
}

/**
 * Hook for requesting a verifiable withdrawal from a zone to the parent Tempo
 * chain.
 *
 * Note: This is a synchronous hook that waits for the transaction
 * to be included on a block before returning a response.
 *
 * @example
 * ```tsx
 * import { Hooks } from 'wagmi/tempo'
 * import { zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 *
 * function App() {
 *   const { mutate, isPending } = Hooks.zone.useRequestVerifiableWithdrawalSync()
 *
 *   return (
 *     <button
 *       onClick={() =>
 *         mutate({
 *           amount: 1_000_000n,
 *           chainId: zoneChain.id,
 *           revealTo:
 *             '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
 *           token: '0x20c0000000000000000000000000000000000001',
 *         })
 *       }
 *       disabled={isPending}
 *     >
 *       Request Verifiable Withdrawal
 *     </button>
 *   )
 * }
 * ```
 *
 * @param parameters - Parameters.
 * @returns Mutation result.
 */
export function useRequestVerifiableWithdrawalSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useRequestVerifiableWithdrawalSync.Parameters<
    config,
    context
  > = {},
): useRequestVerifiableWithdrawalSync.ReturnType<config, context> {
  const { mutation = {} } = parameters
  const config = useConfig(parameters)
  return useMutation({
    ...mutation,
    async mutationFn(variables) {
      return Actions.zone.requestVerifiableWithdrawalSync(config, variables)
    },
    mutationKey: ['requestVerifiableWithdrawalSync'],
  })
}

export declare namespace useRequestVerifiableWithdrawalSync {
  type Parameters<
    config extends Config = Config,
    context = unknown,
  > = ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          Actions.zone.requestVerifiableWithdrawalSync.ReturnValue,
          Actions.zone.requestVerifiableWithdrawalSync.ErrorType,
          Actions.zone.requestVerifiableWithdrawalSync.Parameters<config>,
          context
        >
      | undefined
  }

  type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = UseMutationResult<
    Actions.zone.requestVerifiableWithdrawalSync.ReturnValue,
    Actions.zone.requestVerifiableWithdrawalSync.ErrorType,
    Actions.zone.requestVerifiableWithdrawalSync.Parameters<config>,
    context
  >
}
