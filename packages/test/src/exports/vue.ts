import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { createApp } from 'vue'

import { config } from '../config.js'

export function renderComposable<composable extends () => unknown>(
  composable: composable,
) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    },
  })
    .use(WagmiPlugin, {
      config,
      reconnectOnMount: false,
    })
    .use(VueQueryPlugin, {})
    .mount(document.createElement('div'))

  return [result, app]
}
