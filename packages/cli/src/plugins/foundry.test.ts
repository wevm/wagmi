import fixtures from 'fixturez'
import { describe, expect, it } from 'vitest'

import { foundry } from './foundry'

const f = fixtures(__dirname)

describe('foundry', () => {
  describe('validate', async () => {
    it('forge not installed', async () => {
      const temp = f.temp()
      await expect(
        foundry({
          project: temp,
          forge: {
            path: '/path/to/forge',
          },
        }).validate(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "forge must be installed to use Foundry plugin.
        To install, follow the instructions at https://book.getfoundry.sh/getting-started/installation"
      `)
    })

    it('project does not exist', async () => {
      await expect(
        foundry({
          project: '../path/to/project',
        }).validate(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Project \\"../path/to/project\\" not found."',
      )
    })
  })
})
