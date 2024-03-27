import { type ResolvedRegister, type State, hydrate } from '@wagmi/core'
import { type JSX, type ParentProps, onMount } from "solid-js"

export type HydrateProps = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function Hydrate(parameters: ParentProps<HydrateProps>) {
  const { children, config, initialState, reconnectOnMount = true } = parameters

  const { onMount: hydrateOnMount } = hydrate(config, {
    initialState,
    reconnectOnMount,
  })

  // Hydrate for non-SSR
  if (!config._internal.ssr) hydrateOnMount()

  onMount(() => {
    if (!config._internal.ssr) return
    hydrateOnMount()
  })

  return children as JSX.Element
}
