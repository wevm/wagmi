/** @jsxImportSource solid-js */

import { type QueryClient, useQueryClient } from '@tanstack/solid-query'
import { Devtools, version } from '@wagmi/devtools-ui'
import { type Config, useConfig } from '@wagmi/solid'
import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  sharedConfig,
  splitProps,
  untrack,
} from 'solid-js'
import type { Component, ComponentProps, JSX } from 'solid-js'
import { isServer } from 'solid-js/web'

export function WagmiDevtools(props: WagmiDevtools.Props): JSX.Element {
  const wagmi_config = useConfig()
  const config = createMemo(() => props.config || wagmi_config)
  const queryClient = useQueryClient(props.queryClient)

  let ref!: HTMLDivElement
  const devtools = new Devtools({
    config: config(),
    framework: 'solid',
    queryClient,
    version,
  })

  createEffect(() => {
    devtools.setConfig(config())
  })

  createEffect(() => {
    devtools.setQueryClient(queryClient)
  })

  onMount(() => {
    devtools.mount(ref)
    onCleanup(() => devtools.unmount())
  })

  return <div id="wagmi-devtools-root" ref={ref} />
}

export declare namespace WagmiDevtools {
  type Props = {
    config?: Config | undefined
    queryClient?: QueryClient | undefined
  }
}

/*
  This function has been taken from solid-start's codebase
  This allows the devtools to be loaded only on the client and bypasses any server side rendering
  https://github.com/solidjs/solid-start/blob/2967fc2db3f0df826f061020231dbdafdfa0746b/packages/start/islands/clientOnly.tsx
*/
export function clientOnly<T extends Component<any>>(
  fn: () => Promise<{
    default: T
  }>,
) {
  if (isServer)
    return (props: ComponentProps<T> & { fallback?: JSX.Element }) =>
      props.fallback

  const [comp, setComp] = createSignal<T>()
  fn().then((m) => setComp(() => m.default))
  return (props: ComponentProps<T>) => {
    let Comp: T | undefined
    let m: boolean
    const [, rest] = splitProps(props, ['fallback'])
    // biome-ignore lint/suspicious/noAssignInExpressions:
    if ((Comp = comp()) && !sharedConfig.context) return Comp(rest)
    const [mounted, setMounted] = createSignal(!sharedConfig.context)
    onMount(() => setMounted(true))
    return createMemo(
      () =>
        (
          // biome-ignore lint/suspicious/noAssignInExpressions:
          (Comp = comp()),
          // biome-ignore lint/suspicious/noAssignInExpressions:
          // biome-ignore lint/style/noCommaOperator:
          (m = mounted()),
          untrack(() => (Comp && m ? Comp(rest) : props.fallback))
        ),
    )
  }
}
