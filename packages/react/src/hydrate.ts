'use client'

import { type ResolvedRegister, type State, hydrate } from '@wagmi/core'
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

  // Hydrate for non-SSR
  if (!config._internal.ssr) onMount()

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
