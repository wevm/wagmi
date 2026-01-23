import {
  type Config,
  type ResolvedRegister,
  type WatchBlockNumberParameters,
  watchBlockNumber,
} from '@wagmi/core'
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'
import { type Accessor, createEffect, onCleanup } from 'solid-js'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type SolidWatchBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = UnionCompute<
  UnionExactPartial<WatchBlockNumberParameters<config, chainId>> &
    ConfigParameter<config> &
    EnabledParameter
>

export type UseWatchBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Accessor<SolidWatchBlockNumberParameters<config, chainId>>

export type UseWatchBlockNumberReturnType = void

/** https://wagmi.sh/solid/api/hooks/useWatchBlockNumber */
export function useWatchBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: UseWatchBlockNumberParameters<config, chainId> = () =>
    ({}) as any,
): UseWatchBlockNumberReturnType {
  const config = useConfig(parameters)
  const configChainId = useChainId(() => ({ config: config() }))

  createEffect(() => {
    const {
      chainId = configChainId(),
      enabled = true,
      onBlockNumber,
      config: _,
      ...rest
    } = parameters()

    if (!enabled) return
    if (!onBlockNumber) return

    const unwatch = watchBlockNumber(config(), {
      ...(rest as any),
      chainId,
      onBlockNumber,
    })

    onCleanup(() => unwatch())
  })
}
