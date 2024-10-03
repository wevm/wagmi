import { type ResolvedRegister, type State, hydrate } from '@wagmi/core'
import {
  type JSX,
  type ParentProps,
  children,
  createEffect,
  mergeProps,
  onCleanup,
} from 'solid-js'

export type HydrateProps = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function Hydrate(props: ParentProps<HydrateProps>): JSX.Element {
  const finalProps = mergeProps({ reconnectOnMount: true }, props)
  const safeChildren = children(() => finalProps.children)

  const { onMount } = hydrate(finalProps.config, {
    initialState: finalProps.initialState,
    reconnectOnMount: finalProps.reconnectOnMount,
  })

  // Hydrate for non-SSR
  if (!finalProps.config._internal.ssr) onMount()

  // Hydrate for SSR
  let active = true
  createEffect(() => {
    if (!active) return
    if (!finalProps.config._internal.ssr) return
    onMount()
    onCleanup(() => {
      active = false
    })
  })

  return safeChildren()
}
