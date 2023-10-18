'use client'

import { type ResolvedRegister, hydrate } from '@wagmi/core'
import { useEffect, useRef } from 'react'

export type HydrateProps = {
  config: ResolvedRegister['config']
  reconnectOnMount?: boolean | undefined
}

export function Hydrate(parameters: React.PropsWithChildren<HydrateProps>) {
  const { children, config, reconnectOnMount = true } = parameters

  // Hydrate for non-SSR
  if (!config._internal.ssr) hydrate(config, { reconnect: reconnectOnMount })

  // Hydrate for SSR
  const active = useRef(true)
  // biome-ignore lint/nursery/useExhaustiveDependencies:
  useEffect(() => {
    if (!active.current) return
    if (!config._internal.ssr) return
    hydrate(config, { reconnect: reconnectOnMount })
    return () => {
      active.current = false
    }
  }, [])

  return children
}
