import { resolve } from 'pathe'
import { vi } from 'vitest'

const wagmiCLIPath = resolve(process.cwd(), 'packages/cli/src/')

vi.mock('@wagmi/cli', async () => {
  return vi.importActual(wagmiCLIPath)
})
