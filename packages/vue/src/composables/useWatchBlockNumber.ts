import {
  type Config,
  type ResolvedRegister,
  type WatchBlockNumberParameters,
  watchBlockNumber,
} from '@wagmi/core'
import type { UnionEvaluate, UnionPartial } from '@wagmi/core/internal'
import { computed, watchEffect } from 'vue'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = DeepMaybeRef<
  UnionEvaluate<
    UnionPartial<WatchBlockNumberParameters<config, chainId>> &
      ConfigParameter<config> &
      EnabledParameter
  >
>

export type UseWatchBlockNumberReturnType = void

/** https://wagmi.sh/vue/api/composables/useWatchBlockNumber */
export function useWatchBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters_: UseWatchBlockNumberParameters<config, chainId> = {} as any,
): UseWatchBlockNumberReturnType {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  watchEffect((onCleanup) => {
    const {
      chainId = configChainId.value,
      enabled = true,
      onBlockNumber,
      config: _,
      ...rest
    } = parameters.value

    if (!enabled) return
    if (!onBlockNumber) return

    const unwatch = watchBlockNumber(config, {
      ...(rest as any),
      chainId,
      onBlockNumber,
      emitOnBegin: true,
    })
    onCleanup(unwatch)
  })
}
