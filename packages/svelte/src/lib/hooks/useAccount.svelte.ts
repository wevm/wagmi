import type {
  ConfigParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'
import {
  type Config,
  type GetAccountReturnType,
  type ResolvedRegister,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { useConfig } from './useConfig.svelte.js'

export type UseAccountParameters<config extends Config = Config> =
  RuneParameters<ConfigParameter<config>>

export type UseAccountReturnType<config extends Config = Config> =
  RuneReturnType<GetAccountReturnType<config>>

/** https://wagmi.sh/react/api/hooks/useAccount */
export function useAccount<config extends Config = ResolvedRegister['config']>(
  parameters: UseAccountParameters<config> = () => ({}),
): UseAccountReturnType<config> {
  const config = $derived.by(useConfig(parameters))

  let account = $state(getAccount(config))

  $effect(() => {
    account = getAccount(config)

    return watchAccount(config, {
      onChange(newAccount) {
        account = newAccount
      },
    })
  })

  return () => account
}
