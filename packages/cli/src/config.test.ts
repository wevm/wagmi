import { expect, test } from 'vitest'

import { Config, defineConfig } from './config'

test('defineConfig', () => {
  const config: Config = {
    contracts: [],
    plugins: [],
  }
  expect(defineConfig(config)).toEqual(config)
})
