'use client'

import { hydrate, type ResolvedRegister, type State } from '@wagmi/core'
import { type ReactElement, useEffect, useRef } from 'react'

export type HydrateProps = {
  config: ResolvedRegister['config']
  initialState?: State | undefined
  reconnectOnMount?: boolean | undefined
}

export function Hydrate(parameters: React.PropsWithChildren<HydrateProps>) {
  const { children, config, initialState, reconnectOnMount = true } = parameters

  const { onMount } = hydrate(config, {
    initialState,
    reconnectOnMount,
  })

  // Hydrate for non-SSR, once per config. Running `onMount` on every render
  // would reconnect again and re-attach connector listeners each time.
  const hydratedConfig = useRef<HydrateProps['config'] | undefined>(undefined)
  if (!config._internal.ssr && hydratedConfig.current !== config) {
    hydratedConfig.current = config
    onMount()
  }

  // Hydrate for SSR
  const active = useRef(true)
  // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required
  useEffect(() => {
    if (!active.current) return
    if (!config._internal.ssr) return
    onMount()
    return () => {
      active.current = false
    }
  }, [])

  return children as ReactElement
}
