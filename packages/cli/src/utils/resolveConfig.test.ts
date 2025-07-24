import { expect, test } from 'vitest'

import { createFixture } from '../../test/utils.js'
import { defaultConfig } from '../config.js'
import { findConfig } from './findConfig.js'
import { resolveConfig } from './resolveConfig.js'

test.skip('resolves config', async () => {
  const { paths } = await createFixture({
    files: {
      'wagmi.config.ts': `
        import { defineConfig } from '@wagmi/cli'

        export default defineConfig(${JSON.stringify(defaultConfig)})
        `,
    },
  })

  const configPath = await findConfig({
    config: paths['wagmi.config.ts'],
  })
  await expect(
    resolveConfig({ configPath: configPath! }),
  ).resolves.toMatchInlineSnapshot(`
      {
        "contracts": [],
        "out": "src/generated.ts",
        "plugins": [],
      }
    `)
})

test.skip('resolves function config', async () => {
  const { paths } = await createFixture({
    files: {
      'wagmi.config.ts': `
        import { defineConfig } from '@wagmi/cli'

        export default defineConfig(() => (${JSON.stringify(defaultConfig)}))
        `,
    },
  })

  const configPath = await findConfig({
    config: paths['wagmi.config.ts'],
  })
  await expect(
    resolveConfig({ configPath: configPath! }),
  ).resolves.toMatchInlineSnapshot(`
      {
        "contracts": [],
        "out": "src/generated.ts",
        "plugins": [],
      }
    `)
})

test.skip('resolves array config', async () => {
  const { paths } = await createFixture({
    files: {
      'wagmi.config.ts': `
        import { defineConfig } from '@wagmi/cli'

        export default defineConfig([${JSON.stringify(defaultConfig)}])
        `,
    },
  })

  const configPath = await findConfig({
    config: paths['wagmi.config.ts'],
  })
  await expect(
    resolveConfig({ configPath: configPath! }),
  ).resolves.toMatchInlineSnapshot(`
      [
        {
          "contracts": [],
          "out": "src/generated.ts",
          "plugins": [],
        },
      ]
    `)
})
