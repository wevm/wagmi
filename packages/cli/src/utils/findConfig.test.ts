import { afterEach, describe, expect, it, vi } from 'vitest'

import { createFixture } from '../../test'
import { findConfig } from './findConfig'

describe('findConfig', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('finds config file', async () => {
    const { dir, paths } = await createFixture({
      files: {
        'wagmi.config.ts': '',
      },
    })
    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => dir)

    await expect(findConfig()).resolves.toBe(paths['wagmi.config.ts'])
  })

  it('finds config file at location', async () => {
    const { dir, paths } = await createFixture({
      files: {
        'wagmi.config.ts': '',
      },
    })
    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => dir)

    await expect(
      findConfig({ config: paths['wagmi.config.ts'] }),
    ).resolves.toBe(paths['wagmi.config.ts'])
  })

  it('finds config file at root', async () => {
    const { dir, paths } = await createFixture({
      files: {
        'wagmi.config.ts': '',
      },
    })
    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => dir)

    await expect(findConfig({ root: dir })).resolves.toBe(
      paths['wagmi.config.ts'],
    )
  })
})
