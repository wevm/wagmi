import type {
  GetProviderResult,
  Provider,
  WatchProviderCallback,
} from '@wagmi/core'
import { getClient } from '@wagmi/core'
import type { Accessor } from 'solid-js'
import { createEffect, createSignal, onCleanup } from 'solid-js'

export type GetProviderArgs = {
  chainId?: Accessor<number>
}

export type UseProviderArgs = Partial<GetProviderArgs>

function getProvider<TProvider extends Provider = Provider>(
  props: GetProviderArgs = {},
): GetProviderResult<TProvider> {
  const client = getClient<TProvider>()
  if (props?.chainId)
    return client.getProvider({ chainId: props?.chainId() }) || client.provider
  return client.provider
}

function watchProvider<TProvider extends Provider>(
  args: GetProviderArgs,
  callback: any,
) {
  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ provider }) => provider,
    callback(client.getProvider({ chainId: args.chainId?.() })),
  )
  return unsubscribe
}

export function useProvider<TProvider extends Provider>(
  props?: UseProviderArgs,
) {
  const [provider, setProvider] = createSignal<Provider>(getProvider())

  createEffect(() => {
    const unsubscribe = watchProvider<TProvider>(
      { chainId: props?.chainId },
      (provider: Provider) => {
        setProvider(provider)
      },
    )
    onCleanup(() => unsubscribe())
  })

  return provider
}
