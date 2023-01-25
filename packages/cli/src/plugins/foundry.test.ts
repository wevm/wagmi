import fixtures from 'fixturez'
import { describe, expect, it } from 'vitest'

import { foundry } from './foundry'

const f = fixtures(__dirname)

describe('foundry', () => {
  describe('validate', async () => {
    it('forge not installed', async () => {
      const temp = f.copy('foundry-project')
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
          artifacts: 'out',
        }).validate(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Foundry project ../path/to/project not found."',
      )
    })

    it('artifacts not found', async () => {
      const temp = f.temp()
      expect(() =>
        foundry({
          project: temp,
        }),
      ).toThrowErrorMatchingInlineSnapshot(
        '"Unable to read foundry.toml in project"',
      )
    })
  })
})
