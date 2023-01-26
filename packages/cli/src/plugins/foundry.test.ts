import fixtures from 'fixturez'
import { dirname } from 'pathe'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { foundry } from './foundry'

const f = fixtures(__dirname)

describe('foundry', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('validate', async () => {
    it('forge not installed', async () => {
      const dir = f.temp()
      await expect(
        foundry({
          project: dir,
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
      const dir = f.temp()
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)

      try {
        await foundry({ project: '../path/to/project' }).validate()
      } catch (error) {
        expect(
          (error as Error).message.replace(dirname(dir), '..'),
        ).toMatchInlineSnapshot(
          '"Foundry project ../path/to/project not found."',
        )
      }
    })
  })

  describe.todo('contracts')
})
