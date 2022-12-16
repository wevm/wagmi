import dedent from 'dedent'
import fixtures from 'fixturez'
import { default as fse } from 'fs-extra'
import { resolve } from 'pathe'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { defaultConfig } from '../config'
import { findConfig } from './findConfig'
import { resolveConfig } from './resolveConfig'

const f = fixtures(__dirname)
const wagmiCLIPath = resolve(process.cwd(), 'packages/cli/src/index.ts')

describe('resolveConfig', () => {
  beforeAll(() => {
    vi.mock('@wagmi/cli', async () => {
      return vi.importActual(wagmiCLIPath)
    })
  })

  afterAll(() => {
    vi.resetAllMocks()
  })

  it('finds config file', async () => {
    const temp = f.temp()

    const config = `${temp}/wagmi.config.ts`
    const content = dedent(`
      import { defineConfig } from '@wagmi/cli'
      
      export default defineConfig(${JSON.stringify(defaultConfig)})
    `)
    fse.writeFile(config, content)

    const configPath = await findConfig({ config })
    await expect(resolveConfig({ configPath: configPath! })).resolves
      .toMatchInlineSnapshot(`
      {
        "contracts": [],
        "out": "src/generated/wagmi.ts",
        "plugins": [],
      }
    `)
  })
})
