import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setup } from '@ark/attest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function () {
  return setup({
    benchErrorOnThresholdExceeded: true,
    formatCmd: 'pnpm check',
    tsconfig: resolve(__dirname, '../../core/tsconfig.json'),
  })
}
