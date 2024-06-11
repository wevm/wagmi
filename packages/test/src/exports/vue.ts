import { VueQueryPlugin } from '@tanstack/vue-query'
import { WagmiPlugin } from '@wagmi/vue'
import { type App, type Ref, createApp, watch } from 'vue'

import { config } from '../config.js'

export type RenderComposableReturnType<composable extends () => unknown> = [
  ReturnType<composable>,
  App,
]

export function renderComposable<composable extends () => unknown>(
  composable: composable,
  options: { attach?: (app: App) => void } | undefined = {
    attach(app) {
      app
        .use(WagmiPlugin, {
          config,
          reconnectOnMount: false,
        })
        .use(VueQueryPlugin, {})
    },
  },
): RenderComposableReturnType<composable> {
  let result = undefined
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    },
  })

  options.attach?.(app)
  app.mount(document.createElement('div'))

  return [result, app] as unknown as RenderComposableReturnType<composable>
}

export type WaitForOptions = {
  timeout?: number
}

export function waitFor<ref extends Ref>(
  ref: ref,
  predicate: (value: ref['value']) => boolean = (value) => value,
  options: WaitForOptions = {},
) {
  const { timeout = 10_000 } = options
  return new Promise<void>((resolve, reject) => {
    const timer = timeout
      ? setTimeout(() => {
          _unwatch()
          if (predicate(ref.value)) resolve()
          else reject(new Error(`\`waitFor\` timed out in ${timeout}ms.`))
        }, timeout)
      : undefined

    const _unwatch = watch(ref, (value) => {
      if (predicate(value)) {
        if (timer) clearTimeout(timer)
        _unwatch()
        resolve()
      }
    })
  })
}
