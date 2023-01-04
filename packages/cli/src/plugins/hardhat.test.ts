import { describe, expect, it } from 'vitest'

import { hardhat } from './hardhat'

describe('react', () => {
  it('validate', async () => {
    await expect(hardhat({ project: '../hello_hardhat' }).validate()).rejects
      .toThrowErrorMatchingInlineSnapshot(`
      "hardhat must be installed to use Hardhat plugin.
      To install, run: pnpm add hardhat"
    `)
  })
})
