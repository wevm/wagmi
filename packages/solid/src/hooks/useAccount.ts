import {
  type Config,
  type GetAccountReturnType,
  type ResolvedRegister,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UseAccountParameters<config extends Config = Config> =
  ConfigParameter<config>

export type UseAccountReturnType<config extends Config = Config> =
  GetAccountReturnType<config>

export function useAccount<config extends Config = ResolvedRegister['config']>(
  parameters: UseAccountParameters<config> = {},
): UseAccountReturnType<config> {
  const config = useConfig(parameters)

  const [account, setAccount] = createStore<GetAccountReturnType>(
    getAccount(config),
  )

  const unsubscribe = watchAccount(config, {
    onChange: () => setAccount(getAccount(config)),
  })

  onCleanup(() => {
    unsubscribe()
  })

  return account
}
