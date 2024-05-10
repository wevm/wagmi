import { fileURLToPath } from 'node:url'
import type { NuxtModule } from '@nuxt/schema'
import { defineNuxtModule } from 'nuxt/kit'

// TODO: createConfig parameters to options?
export type WagmiModuleOptions = {}

export const wagmiModule: NuxtModule<WagmiModuleOptions> =
  defineNuxtModule<WagmiModuleOptions>({
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
