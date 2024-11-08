import {
  type Config,
  type ResolvedRegister,
  type WatchContractEventParameters,
  watchContractEvent,
} from '@wagmi/core'
import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'
import type { Abi, ContractEventName } from 'viem'
import { computed, watchEffect } from 'vue'

import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchContractEventParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> = ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = DeepMaybeRef<
  UnionCompute<
    UnionExactPartial<
      WatchContractEventParameters<abi, eventName, strict, config, chainId>
    > &
      ConfigParameter<config> &
      EnabledParameter
  >
>

export type UseWatchContractEventReturnType = void

/** https://wagmi.sh/vue/api/composables/useWatchContractEvent */
export function useWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters: UseWatchContractEventParameters<
    abi,
    eventName,
    strict,
    config,
    chainId
  > = {} as any,
): UseWatchContractEventReturnType {
  const parameters_ = computed(() => deepUnref(parameters))

  const config = useConfig(parameters_)
  const configChainId = useChainId({ config })

  watchEffect((onCleanup) => {
    const {
      chainId = configChainId.value,
      enabled = true,
      onLogs,
      config: _,
      ...rest
    } = parameters_.value

    if (!enabled) return
    if (!onLogs) return

    const unwatch = watchContractEvent(config, {
      ...(rest as any),
      chainId,
      onLogs,
    })
    onCleanup(unwatch)
  })
}
