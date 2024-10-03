import type { QueryClient } from '@tanstack/solid-query'
import type { Config } from '@wagmi/solid'
import { createContext, useContext } from 'solid-js'

import type { Devtools } from './main.js'

export const DevtoolsContext = createContext<Devtools.Props>({
  config: undefined as unknown as Config,
  framework: '',
  queryClient: undefined as unknown as QueryClient,
  shadowDOMTarget: undefined,
  version: '',
})

export function useDevtoolsContext() {
  return useContext(DevtoolsContext)
}
