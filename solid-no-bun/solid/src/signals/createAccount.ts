import {
  type Config,
  type GetAccountReturnType,
  type ResolvedRegister,
  getAccount,
  watchAccount,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.ts'
import { onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createConfig } from './createConfig.ts'
import type { FunctionedParams } from '@tanstack/solid-query'

export type UseAccountParameters<config extends Config = Config> =
FunctionedParams<ConfigParameter<config>>

export type UseAccountReturnType<config extends Config = Config> =
  { account: GetAccountReturnType<config> }

/** https://wagmi.sh/react/api/hooks/useAccount */
export function createAccount<config extends Config = ResolvedRegister['config']>(
  parameters: UseAccountParameters<config> = ()=>({}),
): UseAccountReturnType<config> {
  const config = createConfig(parameters)

  const [account, setAccount] = createStore(getAccount(config))

  function onChange(_account: GetAccountReturnType){
    setAccount(_account)
  }

  const unsubscribe = watchAccount(config, { onChange })

  onCleanup(unsubscribe)

  return { account }
}
