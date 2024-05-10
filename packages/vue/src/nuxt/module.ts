import { fileURLToPath } from 'node:url'
import { defineNuxtModule } from 'nuxt/kit'

// TODO: createConfig parameters to options?
export type WagmiModuleOptions = {}

export default defineNuxtModule<WagmiModuleOptions>({
  meta: {
    name: '@wagmi/vue',
    configKey: 'wagmi',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(_options, nuxt) {
    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // TODO: Add client and server plugins
    // TODO: Auto import composables
  },
})
