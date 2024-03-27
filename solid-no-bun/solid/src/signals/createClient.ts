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
import { onCleanup } from 'solid-js'
import type { FunctionedParams } from '@tanstack/solid-query'
import { createStore } from 'solid-js/store'

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
> = { data: { client: GetClientReturnType<config, chainId> } }

/** https://wagmi.sh/react/api/hooks/useClient */
export function createClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
>(
  parameters: CreateClientParameters<config, chainId> = ()=>({}),
): CreateClientReturnType<config, chainId> {
  
  const { config: _config } = createConfig(parameters)
  
  const [data, setData] = createStore({ client: getClient(_config) })

  const unsubscribe = watchClient(_config, { onChange: function(_client){
    if(data.client?.uid === _client?.uid) return
    //@ts-ignore TODO: fix type error
    setData({ client: _client })
  }})
  
  onCleanup(unsubscribe)

    //@ts-ignore TODO: fix type error
  return { data }
}
