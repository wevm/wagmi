import type { Config } from '@wagmi/core'
import { Devtools, version } from '@wagmi/devtools'
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

import { useConfig } from './hooks/useConfig.js'

export type WagmiDevtoolsProps = {
  buttonPosition?: Devtools.Props['buttonPosition'] | undefined
  config?: Config | undefined
  initialIsOpen?: boolean | undefined
  position?: Devtools.Props['position']
  shadowDOMTarget?: ShadowRoot | undefined
  styleNonce?: string | undefined
}

export function WagmiDevtools(props: WagmiDevtoolsProps): JSX.Element {
  const wagmiConfig = useConfig()
  const config = createMemo(() => props.config || wagmiConfig)
  let ref!: HTMLDivElement
  const devtools = new Devtools({
    buttonPosition: props.buttonPosition,
    config: config(),
    framework: 'solid',
    initialIsOpen: props.initialIsOpen,
    position: props.position,
    shadowDOMTarget: props.shadowDOMTarget,
    styleNonce: props.styleNonce,
    version,
  })

  createEffect(() => {
    devtools.setConfig(config())
  })

  createEffect(() => {
    const buttonPos = props.buttonPosition
    if (buttonPos) devtools.setButtonPosition(buttonPos)
  })

  createEffect(() => {
    const pos = props.position
    if (pos) devtools.setPosition(pos)
  })

  createEffect(() => {
    devtools.setInitialIsOpen(props.initialIsOpen || false)
  })

  onMount(() => {
    devtools.mount(ref)
    onCleanup(() => devtools.unmount())
  })

  return <div class="wd-parent-container" ref={ref} />
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
