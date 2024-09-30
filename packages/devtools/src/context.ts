import type { Config } from '@wagmi/core'
import { createContext, useContext } from 'solid-js'

import type { DevtoolsProps } from './devtools.js'

export const DevtoolsContext = createContext<DevtoolsProps>({
  config: undefined as unknown as Config,
  framework: '',
  shadowDOMTarget: undefined,
  version: '',
})

export function useDevtoolsContext() {
  return useContext(DevtoolsContext)
}
