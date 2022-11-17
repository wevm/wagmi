import { expect, test } from 'vitest'

import type { Config } from './config'
import { defineConfig } from './config'

test('defineConfig', () => {
  const config: Config = {
    contracts: [],
    plugins: [],
  }
  expect(defineConfig(config)).toEqual(config)
})
