import fixtures from 'fixturez'
import { dirname, resolve } from 'pathe'
import { afterEach, expect, test, vi } from 'vitest'

import { hardhat } from './hardhat.js'

const f = fixtures(__dirname)

afterEach(() => {
  vi.restoreAllMocks()
})

test('validate', async () => {
  const temp = f.temp()
  await expect(
    hardhat({ project: temp }).validate?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: hardhat must be installed to use Hardhat plugin.]',
  )
})

test('project does not exist', async () => {
  const dir = f.temp()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  try {
    await hardhat({ project: '../path/to/project' }).validate?.()
  } catch (error) {
    expect(
      (error as Error).message.replace(dirname(dir), '..'),
    ).toMatchInlineSnapshot('"Hardhat project ../path/to/project not found."')
  }
})

test('contracts', async () => {
  await expect(
    hardhat({
      project: resolve(__dirname, '__fixtures__/hardhat/'),
      exclude: ['Foo.sol/**'],
    }).contracts?.(),
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
}, 10_000)
