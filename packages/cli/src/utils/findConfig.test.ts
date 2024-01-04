import { afterEach, expect, test, vi } from 'vitest'

import { createFixture } from '../../test/utils.js'
import { findConfig } from './findConfig.js'

afterEach(() => {
  vi.restoreAllMocks()
})

test('finds config file', async () => {
  const { dir, paths } = await createFixture({
    files: { 'wagmi.config.ts': '' },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  await expect(findConfig()).resolves.toBe(paths['wagmi.config.ts'])
})

test('finds config file at location', async () => {
  const { dir, paths } = await createFixture({
    files: { 'wagmi.config.ts': '' },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  await expect(findConfig({ config: paths['wagmi.config.ts'] })).resolves.toBe(
    paths['wagmi.config.ts'],
  )
})

test('finds config file at root', async () => {
  const { dir, paths } = await createFixture({
    files: { 'wagmi.config.ts': '' },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  await expect(findConfig({ root: dir })).resolves.toBe(
    paths['wagmi.config.ts'],
  )
})
