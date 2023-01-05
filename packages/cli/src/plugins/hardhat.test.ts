import fixtures from 'fixturez'
import { describe, expect, it } from 'vitest'

import { hardhat } from './hardhat'

const f = fixtures(__dirname)

describe('react', () => {
  describe('validate', async () => {
    it('validate', async () => {
      const temp = f.temp()
      await expect(hardhat({ project: temp }).validate()).rejects
        .toThrowErrorMatchingInlineSnapshot(`
        "hardhat must be installed to use Hardhat plugin.
        To install, run: pnpm add hardhat"
      `)
    })

    it('project does not exist', async () => {
      await expect(
        hardhat({
          project: '../path/to/project',
        }).validate(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Project \\"../path/to/project\\" not found."',
      )
    })
  })
})
