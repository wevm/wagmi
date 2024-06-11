import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { defineNuxtPlugin } from 'nuxt/app'

import { config } from '../wagmi'

// TODO: Move to @wagmi/vue/nuxt nitro plugin
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(WagmiPlugin, { config }).use(VueQueryPlugin, {})
})
