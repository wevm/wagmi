import { type ResolvedRegister, type State } from '@wagmi/core'
import type { Plugin } from 'vue'

export const configKey = Symbol()

export type WagmiPluginOptions = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export const WagmiPlugin = {
  install(app, options) {
    const { config } = options
    app.provide(configKey, config)
    // TODO: reconnect on mount
    // TODO: hydrate initial state
  },
} satisfies Plugin<WagmiPluginOptions>
