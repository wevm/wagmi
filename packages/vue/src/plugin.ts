import { type ResolvedRegister, type State, hydrate } from '@wagmi/core'
import type { Plugin } from 'vue'

export const configKey = Symbol()

export type WagmiPluginOptions = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export const WagmiPlugin = {
  install(app, options) {
    const { config, reconnectOnMount = true } = options
    app.provide(configKey, config)
    // TODO: check this works in SSR env.
    //       - reconnect on mount.
    //       - hydrate initial state.
    const { onMount } = hydrate(config, { ...options, reconnectOnMount })
    onMount()
  },
} satisfies Plugin<WagmiPluginOptions>
