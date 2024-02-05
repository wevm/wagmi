import type { Config } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from './createConfig.js'

test('default', async () => {
  const { config } = createConfig()
  expectTypeOf(config).toEqualTypeOf<Config>()
})

test('parameters: config', async () => {
  const { config: _config } = createConfig(()=>({ config }))
  expectTypeOf(_config).not.toEqualTypeOf<Config>()
  expectTypeOf(_config).toEqualTypeOf<typeof config>()
})
