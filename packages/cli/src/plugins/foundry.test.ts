import fixtures from 'fixturez'
import { dirname, resolve } from 'pathe'
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

    it('validates without project', async () => {
      const dir = resolve(__dirname, '__fixtures__/foundry/')
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)

      await expect(foundry().validate()).resolves.toBeUndefined()
    })
  })

  it('contracts', async () => {
    await expect(
      foundry({
        project: resolve(__dirname, '__fixtures__/foundry/'),
      }).contracts(),
    ).resolves.toMatchInlineSnapshot(`
      [
        {
          "abi": [
            {
              "inputs": [],
              "name": "increment",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
            {
              "inputs": [],
              "name": "number",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "newNumber",
                  "type": "uint256",
                },
              ],
              "name": "setNumber",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "address": undefined,
          "name": "Counter",
        },
      ]
    `)
  })

  it('contracts without project', async () => {
    const dir = resolve(__dirname, '__fixtures__/foundry/')
    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => dir)

    await expect(foundry().contracts()).resolves.toMatchInlineSnapshot(`
      [
        {
          "abi": [
            {
              "inputs": [],
              "name": "increment",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
            {
              "inputs": [],
              "name": "number",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256",
                },
              ],
              "stateMutability": "view",
              "type": "function",
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "newNumber",
                  "type": "uint256",
                },
              ],
              "name": "setNumber",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function",
            },
          ],
          "address": undefined,
          "name": "Counter",
        },
      ]
    `)
  })
})
