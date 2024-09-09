import { watchContractEvent } from '@wagmi/core'
import type {
  Config,
  ResolvedRegister,
  WatchContractEventParameters,
  WatchContractEventReturnType,
} from '@wagmi/core'
import type { Abi, Address, ContractEventName, Log } from 'viem'

import type { UnionCompute, UnionExactPartial } from '@wagmi/core/internal'
import { computed, watchEffect } from 'vue'
import type { ConfigParameter, EnabledParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWatchContractEventParameters<
  abi extends Abi | readonly unknown[] = unknown[],
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

/** To eventually be added to https://wagmi.sh/vue/api/composables/useWatchContractEvent */
export function useWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = 1,
>(
  parameters_: UseWatchContractEventParameters<
    abi,
    eventName,
    strict,
    config,
    chainId
  >,
): UseWatchContractEventReturnType {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  watchEffect((onCleanup) => {
    // console.log('Watching', JSON.stringify(parameters.value))
    const {
      chainId = configChainId.value,
      enabled = true,
      config: _,
      ...rest
    } = parameters.value

    if (!enabled) return

    const unwatch = watchContractEvent(config, {
      ...rest,
      chainId,
      emitOnBegin: true,
    })
    onCleanup(unwatch)
  })
}
