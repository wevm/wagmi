import {
  type Config,
  type ResolvedRegister,
  type WatchBlockNumberParameters,
  watchBlockNumber,
} from '@wagmi/core'
import type {
  ConfigParameter,
  EnabledParameter,
  UnionCompute,
  UnionExactPartial,
} from '@wagmi/core/internal'
import { type Accessor, createEffect, onCleanup } from 'solid-js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/hooks/useWatchBlockNumber */
export function useWatchBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: useWatchBlockNumber.Parameters<config, chainId> = () =>
    ({}) as any,
): useWatchBlockNumber.ReturnType {
  const config = useConfig(parameters)
  const configChainId = useChainId(() => ({ config: config() }))
  createEffect(() => {
    const {
      config: _,
      chainId = configChainId(),
      enabled = true,
      onBlockNumber,
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

export namespace useWatchBlockNumber {
  export type Parameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
  > = Accessor<SolidParameters<config, chainId>>

  export type ReturnType = void

  export type SolidParameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
  > = UnionCompute<
    UnionExactPartial<WatchBlockNumberParameters<config, chainId>> &
      ConfigParameter<config> &
      EnabledParameter
  >
}
