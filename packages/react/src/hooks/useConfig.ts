import * as React from 'react'

import { WagmiContext } from '../context.js'
import { WagmiConfigNotFoundError } from '../errors/context.js'

export function useConfig() {
  const config = React.useContext(WagmiContext)
  if (!config) throw new WagmiConfigNotFoundError()
  return config
}
