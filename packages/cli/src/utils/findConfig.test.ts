import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createFixture, mockCwd } from '../../test'
import { findConfig } from './findConfig'

describe('findConfig', () => {
  let dir: string
  beforeEach(() => {
    dir = mockCwd()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('finds config file', async () => {
    const { filePaths } = await createFixture({
      dir,
      files: {
        'wagmi.config.ts': '',
      },
    })
    await expect(findConfig()).resolves.toBe(filePaths['wagmi.config.ts'])
  })

  it('finds config file at location', async () => {
    const { filePaths } = await createFixture({
      dir,
      files: {
        'wagmi.config.ts': '',
      },
    })
    await expect(
      findConfig({ config: filePaths['wagmi.config.ts'] }),
    ).resolves.toBe(filePaths['wagmi.config.ts'])
  })

  it('finds config file at root', async () => {
    const { projectDir, filePaths } = await createFixture({
      dir,
      files: {
        'wagmi.config.ts': '',
      },
    })
    await expect(findConfig({ root: projectDir })).resolves.toBe(
      filePaths['wagmi.config.ts'],
    )
  })
})
