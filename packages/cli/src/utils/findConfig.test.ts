import { rm, writeFile } from 'fs-extra'
import { describe, expect, it } from 'vitest'

import { findConfig } from './findConfig'

describe('findConfig', () => {
  it('default', async () => {
    const configPath = `wagmi.config.ts`
    writeFile(configPath, '')
    expect(await findConfig()).toContain(configPath)
    rm(configPath)
  })
})
