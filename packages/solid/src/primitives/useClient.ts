import {
  type Config,
  type GetClientParameters,
  type GetClientReturnType,
  getClient,
  type ResolvedRegister,
  watchClient,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import type { Accessor } from 'solid-js'
import { createEffect, createSignal, onCleanup } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type SolidClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Compute<GetClientParameters<config, chainId> & ConfigParameter<config>>

export type UseClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Accessor<SolidClientParameters<config, chainId>>

export type SolidClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = GetClientReturnType<config, chainId>

export type UseClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Accessor<SolidClientReturnType<config, chainId>>

/** https://wagmi.sh/solid/api/primitives/useClient */
export function useClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
>(
  parameters: UseClientParameters<config, chainId> = () => ({}),
): UseClientReturnType<config, chainId> {
  const config = useConfig(parameters)

  const [client, setClient] = createSignal(getClient(config(), parameters()))

  createEffect(() => {
    const _config = config()
    setClient(() => getClient(_config, parameters()))

    const unsubscribe = watchClient(_config, {
      onChange(data) {
        if (client()?.uid === data?.uid) return
        setClient(() => data)
      },
    })
    onCleanup(() => unsubscribe())
  })

  return client as unknown as UseClientReturnType<config, chainId>
}
