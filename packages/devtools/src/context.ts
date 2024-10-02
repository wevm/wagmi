import type { Config } from '@wagmi/core'
import { createContext, useContext } from 'solid-js'

import type { Devtools } from './main.js'

export const DevtoolsContext = createContext<Devtools.Props>({
  config: undefined as unknown as Config,
  framework: '',
  shadowDOMTarget: undefined,
  version: '',
})

export function useDevtoolsContext() {
  return useContext(DevtoolsContext)
}
