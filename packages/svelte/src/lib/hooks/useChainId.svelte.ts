import {
    type Config,
    type GetChainIdReturnType,
    type ResolvedRegister,
    getChainId,
    watchChainId,
} from '@wagmi/core'

import { useConfig } from '$lib/hooks/useConfig.svelte.js'
import {
    type ConfigParameter,
    type RuneParameters,
    type RuneReturnType,
} from '$lib/types.js'

export type UseChainIdParameters<config extends Config = Config> =
    RuneParameters<ConfigParameter<config>>

export type UseChainIdReturnType<config extends Config = Config> =
    RuneReturnType<GetChainIdReturnType<config>>

/** https://wagmi.sh/react/api/hooks/useChainId */
export function useChainId<config extends Config = ResolvedRegister['config']>(
    parameters: UseChainIdParameters<config> = {},
): UseChainIdReturnType<config> {
    const config = $derived.by(useConfig(parameters));
    let chainId = $state(getChainId(config))

    $effect(() => {
        chainId = getChainId(config)
        const unsubscribe = watchChainId(config, {
            onChange: (newChainId) => {
                chainId = newChainId
            },
        })

        return unsubscribe
    })

    return (() => chainId)
}