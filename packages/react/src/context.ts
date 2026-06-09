'use client'

import type { ResolvedRegister } from '@wagmi/core'
import { createContext, createElement, type PropsWithChildren } from 'react'
import { Hydrate, type HydrateProps } from './hydrate.js'

export const WagmiContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type WagmiProviderProps = HydrateProps

export function WagmiProvider(
  parameters: PropsWithChildren<WagmiProviderProps>,
) {
  const { children, config } = parameters
  return createElement(
    Hydrate,
    parameters,
    createElement(WagmiContext.Provider, { value: config }, children),
  )
}
