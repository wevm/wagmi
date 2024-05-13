import type { NuxtModule } from '@nuxt/schema'
import { addImports, createResolver, defineNuxtModule } from 'nuxt/kit'

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
      const { resolve } = createResolver(import.meta.url)

      // Add types
      nuxt.hook('prepare:types', ({ references }) => {
        references.push({ types: '@wagmi/vue/nuxt' })
      })

      // Add auto imports
      const composables = resolve('./runtime/composables')
      const names = [
        'useAccount',
        'useAccountEffect',
        'useBlockNumber',
        'useChainId',
        'useChains',
        'useClient',
        'useConfig',
        'useConnect',
        'useConnections',
        'useConnectorClient',
        'useConnectors',
        'useDisconnect',
        'useReadContract',
        'useReconnect',
        'useSwitchAccount',
        'useSwitchChain',
        'useWaitForTransactionReceipt',
        'useWatchBlockNumber',
        'useWriteContract',
      ]
      addImports(names.map((name) => ({ from: composables, name })))
    },
  })
