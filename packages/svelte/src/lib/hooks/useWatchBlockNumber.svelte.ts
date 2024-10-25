import {
  type Config,
  type ResolvedRegister,
  type WatchBlockNumberParameters,
  watchBlockNumber,
} from '@wagmi/core'
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'

import { useChainId } from '$lib/hooks/useChainId.svelte.js'
import { useConfig } from '$lib/hooks/useConfig.svelte.js'
import type {
  ConfigParameter,
  EnabledParameter,
  RuneParameters,
} from '$lib/types.js'

export type UseWatchBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = RuneParameters<
  UnionCompute<
    UnionExactPartial<WatchBlockNumberParameters<config, chainId>> &
      ConfigParameter<config> &
      EnabledParameter
  >
>

export type UseWatchBlockNumberReturnType = void

/** https://wagmi.sh/react/api/hooks/useWatchBlockNumber */
export function useWatchBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: UseWatchBlockNumberParameters<config, chainId> = () =>
    ({}) as any,
): UseWatchBlockNumberReturnType {
  const {
    enabled = true,
    onBlockNumber,
    config: _,
    ...rest
  } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const configChainId = $derived.by(useChainId(parameters))
  const chainId = $derived(rest.chainId ?? configChainId)

  $effect(() => {
    ;[
      // deps
      chainId,
      config,
      enabled,
      onBlockNumber,
      rest.onError,
      rest.emitMissed,
      rest.emitOnBegin,
      rest.poll,
      rest.pollingInterval,
      rest.syncConnectedChain,
    ]
    if (!enabled) return
    if (!onBlockNumber) return

    const unsubscribe = watchBlockNumber(config, {
      ...(rest as any),
      chainId,
      onBlockNumber,
    })

    return unsubscribe
  })
}
