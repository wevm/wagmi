import {
  type Config,
  type GetClientParameters,
  type GetClientReturnType,
  type ResolvedRegister,
  getClient,
  watchClient,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'

import type { ConfigParameter } from '../types/properties.js'
import { createConfig } from './createConfig.js'
import { createSignal } from 'solid-js'
import { onCleanup } from 'solid-js'
import type { FunctionedParams } from '@tanstack/solid-query'

export type CreateClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = FunctionedParams<Evaluate<GetClientParameters<config, chainId> & ConfigParameter<config>>>

export type CreateClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = GetClientReturnType<config, chainId>

/** https://wagmi.sh/react/api/hooks/useClient */
export function createClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
>(
  parameters: CreateClientParameters<config, chainId> = ()=>({}),
): { client: FunctionedParams<CreateClientReturnType<config, chainId>> } {
  
  const _config = createConfig(parameters)
  
  const [client, setClient] = createSignal<GetClientReturnType<config, chainId>>(getClient(_config))

  const unsubscribe = watchClient(_config, { onChange: function(_client){
    if(client()?.uid === _client?.uid) return
    //@ts-ignore TODO: fix type error
    setClient(_client)
  }})
  
  onCleanup(unsubscribe)

  return { client }
}
