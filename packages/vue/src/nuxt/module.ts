import type { NuxtModule } from '@nuxt/schema'
import {
  addImports,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
} from 'nuxt/kit'

// biome-ignore lint/complexity/noBannedTypes: allowed
export type WagmiModuleOptions = {}

export const wagmiModule: NuxtModule<WagmiModuleOptions> =
  defineNuxtModule<WagmiModuleOptions>({
    meta: {
      name: '@wagmi/vue',
      configKey: 'wagmi',
      compatibility: {
        nuxt: '^3.0.0 || ^4.0.0',
      },
    },
    setup(_options, nuxt) {
      const { resolve } = createResolver(import.meta.url)

      // Add types
      nuxt.hook('prepare:types', ({ references }) => {
        references.push({ types: '@wagmi/vue/nuxt' })
      })

      // Ensure CJS dependencies are pre-bundled for ESM compatibility
      extendViteConfig((config) => {
        config.optimizeDeps ??= {}
        config.optimizeDeps.include ??= []
        config.optimizeDeps.include.push('eventemitter3')
      })

      // Add auto imports
      const composables = resolve('./runtime/composables')
      const names = [
        'useAccount' /** @deprecated */,
        'useAccountEffect' /** @deprecated */,
        'useBalance',
        'useBlockNumber',
        'useChainId',
        'useChains',
        'useClient',
        'useConfig',
        'useConnect',
        'useConnection',
        'useConnectionEffect',
        'useConnections',
        'useConnectorClient',
        'useConnectors',
        'useDisconnect',
        'useEnsAddress',
        'useEnsAvatar',
        'useEnsName',
        'useEstimateGas',
        'useReadContract',
        'useReconnect',
        'useSendTransaction',
        'useSignMessage',
        'useSignTypedData',
        'useSimulateContract',
        'useSwitchAccount' /** @deprecated */,
        'useSwitchChain',
        'useSwitchConnection',
        'useTransaction',
        'useTransactionReceipt',
        'useWaitForTransactionReceipt',
        'useWatchBlockNumber',
        'useWriteContract',
      ]
      addImports(names.map((name) => ({ from: composables, name })))
    },
  })
