import fixtures from 'fixturez'
import { dirname } from 'pathe'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { hardhat } from './hardhat'

const f = fixtures(__dirname)

describe('hardhat', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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
      const dir = f.temp()
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)

      try {
        await hardhat({ project: '../path/to/project' }).validate()
      } catch (error) {
        expect(
          (error as Error).message.replace(dirname(dir), '..'),
        ).toMatchInlineSnapshot(
          '"Hardhat project ../path/to/project not found."',
        )
      }
    })
  })

  describe.todo('contracts')
})
