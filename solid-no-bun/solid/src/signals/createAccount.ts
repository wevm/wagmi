import {
  type Config,
  type GetAccountReturnType,
  type ResolvedRegister,
  getAccount,
  watchAccount,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.js'
import { onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createConfig } from './createConfig.js'
import type { FunctionedParams } from '@tanstack/solid-query'

export type CreateAccountParameters<config extends Config = Config> =
FunctionedParams<ConfigParameter<config>>

export type CreateAccountReturnType<config extends Config = Config> =
  { account: GetAccountReturnType<config> }

/** https://wagmi.sh/react/api/hooks/useAccount */
export function createAccount<config extends Config = ResolvedRegister['config']>(
  parameters: CreateAccountParameters<config> = ()=>({}),
): CreateAccountReturnType<config> {
  const _config = createConfig(parameters)

  const [account, setAccount] = createStore(getAccount(_config))

  function onChange(_account: GetAccountReturnType){
    setAccount(_account)
  }

  const unsubscribe = watchAccount(_config, { onChange })

  onCleanup(unsubscribe)

  return { account }
}
