import { expect, test, vi } from 'vitest'

import { type Config, defineConfig } from './config.js'

test('object', () => {
  const config: Config = {
    contracts: [],
    out: 'wagmi.ts',
    plugins: [],
  }
  expect(defineConfig(config)).toEqual(config)
})

test('array', () => {
  const config: Config = {
    contracts: [],
    out: 'wagmi.ts',
    plugins: [],
  }
  expect(defineConfig([config, config])).toEqual([config, config])
})

test('function', () => {
  const config = vi.fn().mockImplementation(() => ({
    contracts: [],
    out: 'wagmi.ts',
    plugins: [],
  }))
  expect(defineConfig(config)).toEqual(config)
})

test('async function', () => {
  const config = vi.fn().mockImplementation(async () => ({
    contracts: [],
    out: 'wagmi.ts',
    plugins: [],
  }))
  expect(defineConfig(config)).toEqual(config)
})
