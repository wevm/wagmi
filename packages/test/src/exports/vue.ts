import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { type App, createApp } from 'vue'

import { config } from '../config.js'

export type RenderComposableReturnType<composable extends () => unknown> = [
  ReturnType<composable>,
  App,
]

export function renderComposable<composable extends () => unknown>(
  composable: composable,
): RenderComposableReturnType<composable> {
  let result = undefined
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

  return [result, app] as unknown as RenderComposableReturnType<composable>
}
