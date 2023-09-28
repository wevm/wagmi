import { compose } from '../../../src/hooks'
import {
  promptAndInjectProjectId,
  selectAndInjectProviders,
} from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  default: true,
  title: 'Default',
  description: 'Vite (React) wagmi project',
  hooks: compose([
    selectAndInjectProviders({
      envNamespace: 'import.meta.env',
      envPrefix: 'VITE_',
    }),
    promptAndInjectProjectId(),
  ]),
})
