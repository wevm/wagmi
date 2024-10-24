import type { ResolvedRegister } from '@wagmi/core'
import { getContext, setContext } from 'svelte'

type ContextConfig = ResolvedRegister['config']
const WAGMI_CONFIG_KEY = Symbol('WAGMI_CONFIG')

export const getWagmiConfig = (): ContextConfig => {
  const client = getContext<ContextConfig>(WAGMI_CONFIG_KEY)
  if (!client) {
    throw new Error(
      'No Wagmi context was found in Svelte context. Did you forget to wrap your component with WagmiProvider?',
    )
  }

  return client
}

export const setWagmiConfig = (config: ContextConfig) => {
  setContext(WAGMI_CONFIG_KEY, config)
}
