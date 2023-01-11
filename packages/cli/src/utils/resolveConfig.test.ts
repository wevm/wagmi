import { describe, expect, it } from 'vitest'

import { createFixture } from '../../test'
import { defaultConfig } from '../config'
import { findConfig } from './findConfig'
import { resolveConfig } from './resolveConfig'

describe('resolveConfig', () => {
  it('resolves config', async () => {
    const { filePaths } = await createFixture({
      files: {
        'wagmi.config.ts': `
        import { defineConfig } from '@wagmi/cli'

        export default defineConfig(${JSON.stringify(defaultConfig)})
        `,
      },
    })

    const configPath = await findConfig({
      config: filePaths['wagmi.config.ts'],
    })
    await expect(resolveConfig({ configPath: configPath! })).resolves
      .toMatchInlineSnapshot(`
      {
        "contracts": [],
        "out": "src/generated.ts",
        "plugins": [],
      }
    `)
  })

  it('resolves function config', async () => {
    const { filePaths } = await createFixture({
      files: {
        'wagmi.config.ts': `
        import { defineConfig } from '@wagmi/cli'

        export default defineConfig(() => (${JSON.stringify(defaultConfig)}))
        `,
      },
    })

    const configPath = await findConfig({
      config: filePaths['wagmi.config.ts'],
    })
    await expect(resolveConfig({ configPath: configPath! })).resolves
      .toMatchInlineSnapshot(`
      {
        "contracts": [],
        "out": "src/generated.ts",
        "plugins": [],
      }
    `)
  })
})
