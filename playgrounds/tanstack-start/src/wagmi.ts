import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import {
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createStorage,
  http,
  serialize,
} from 'wagmi'
import { mainnet, optimism, sepolia } from 'wagmi/chains'
import { gemini, injected, metaMask } from 'wagmi/connectors'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, optimism],
    connectors: [injected(), metaMask(), gemini()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [optimism.id]: http(),
    },
  })
}

export const getWagmiStateSSR = createServerFn().handler(() => {
  const cookie = getRequestHeader('cookie')
  const initialState = cookieToInitialState(getConfig(), cookie)
  return serialize(initialState || {})
})

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
