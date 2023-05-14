import * as React from 'react'

import { WagmiContext } from '../context.js'

export function useConfig() {
  const config = React.useContext(WagmiContext)
  if (!config) throw new Error('`useConfig` must be used within `WagmiConfig`.')
  return config
}
