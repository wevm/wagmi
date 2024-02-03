import {
  type Config,
  type GetClientParameters,
  type GetClientReturnType,
  type ResolvedRegister,
  getClient,
  watchClient,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'

import type { ConfigParameter } from '../types/properties.ts'
import { createConfig } from './createConfig.ts'
import { createSignal } from 'solid-js/types/server/reactive.js'
import { onCleanup } from 'solid-js'

export type UseClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Evaluate<GetClientParameters<config, chainId> & ConfigParameter<config>>

export type UseClientReturnType<
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
  parameters: UseClientParameters<config, chainId> = {},
): ()=> UseClientReturnType<config, chainId> {
  
  const config = createConfig(parameters)
  
  const [client, setClient] = createSignal(getClient(config))

  const unsubscribe = watchClient(config, { onChange: function(_client){
    if(client()?.uid === _client?.uid) return
    setClient(_client)
  }})
  
  onCleanup(unsubscribe)

  return client
}
