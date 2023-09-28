import { compose } from '../../../src/hooks'
import {
  promptAndInjectProjectId,
  selectAndInjectProviders,
} from '../../../src/hooks/common'
import { createTemplate } from '../../../src/utils'

export default createTemplate({
  default: true,
  title: 'Default',
  description: 'Next.js wagmi project',
  hooks: compose([
    selectAndInjectProviders({
      envNamespace: 'process.env',
      envPrefix: 'NEXT_PUBLIC_',
    }),
    promptAndInjectProjectId(),
  ]),
})
