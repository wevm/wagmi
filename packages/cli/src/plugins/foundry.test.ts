import fixtures from 'fixturez'
import { dirname, resolve } from 'pathe'
import { afterEach, expect, test, vi } from 'vitest'

import { foundry } from './foundry.js'

const f = fixtures(__dirname)

afterEach(() => {
  vi.restoreAllMocks()
})

test('forge not installed', async () => {
  const dir = f.temp()
  await expect(
    foundry({
      project: dir,
      forge: {
        path: '/path/to/forge',
      },
    }).validate?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [Error: forge must be installed to use Foundry plugin.
    To install, follow the instructions at https://book.getfoundry.sh/getting-started/installation]
  `)
})

test('project does not exist', async () => {
  const dir = f.temp()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  try {
    await foundry({ project: '../path/to/project' }).validate?.()
  } catch (error) {
    expect(
      (error as Error).message.replace(dirname(dir), '..'),
    ).toMatchInlineSnapshot('"Foundry project ../path/to/project not found."')
  }
})

test('validates without project', async () => {
  const dir = resolve(__dirname, '__fixtures__/foundry/')
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  await expect(foundry().validate?.()).resolves.toBeUndefined()
})

test('contracts', async () => {
  await expect(
    foundry({
      project: resolve(__dirname, '__fixtures__/foundry/'),
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
})

test('contracts without project', async () => {
  const dir = resolve(__dirname, '__fixtures__/foundry/')
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  await expect(
    foundry({
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
})
