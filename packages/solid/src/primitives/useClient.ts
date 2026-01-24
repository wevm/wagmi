import {
  type Config,
  type GetClientParameters,
  type GetClientReturnType,
  getClient,
  type ResolvedRegister,
  watchClient,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import type { Accessor } from 'solid-js'
import { createEffect, createSignal, onCleanup } from 'solid-js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useClient */
export function useClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
>(
  parameters: useClient.Parameters<config, chainId> = () => ({}),
): useClient.ReturnType<config, chainId> {
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
  return client as unknown as useClient.ReturnType<config, chainId>
}

export namespace useClient {
  export type Parameters<
    config extends Config = Config,
    chainId extends config['chains'][number]['id'] | number | undefined =
      | config['chains'][number]['id']
      | undefined,
  > = Accessor<SolidParameters<config, chainId>>

  export type ReturnType<
    config extends Config = Config,
    chainId extends config['chains'][number]['id'] | number | undefined =
      | config['chains'][number]['id']
      | undefined,
  > = Accessor<SolidReturnType<config, chainId>>

  export type SolidParameters<
    config extends Config = Config,
    chainId extends config['chains'][number]['id'] | number | undefined =
      | config['chains'][number]['id']
      | undefined,
  > = Compute<GetClientParameters<config, chainId> & ConfigParameter<config>>

  export type SolidReturnType<
    config extends Config = Config,
    chainId extends config['chains'][number]['id'] | number | undefined =
      | config['chains'][number]['id']
      | undefined,
  > = GetClientReturnType<config, chainId>
}
