import { QueryClient } from '@tanstack/vue-query'
// import {
//   RenderHookOptions,
//   renderHook as defaultRenderHook,
//   waitFor,
// } from '@testing-library/react'
// import * as React from 'react'

// import { WagmiConfig } from '../src'
// import { Client } from '../src/client'
// import { setupClient } from './utils'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent Jest from garbage collecting cache
      cacheTime: Infinity,
      // Turn off retries to prevent timeouts
      retry: false,
    },
  },
  logger: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
    log: console.log,
    warn: console.warn,
  },
})

// export { act, cleanup } from '@testing-library/react'
export {
  setupClient,
  actConnect,
  actDisconnect,
  actSwitchNetwork,
  useAccount,
  // useNetwork,
} from './utils'
export {
  expectType,
  getCrowdfundArgs,
  getProvider,
  getSigners,
  getRandomTokenId,
  getWebSocketProvider,
  mirrorCrowdfundContractConfig,
  mlootContractConfig,
  wagmiContractConfig,
  wagmigotchiContractConfig,
} from '../../core/test'
