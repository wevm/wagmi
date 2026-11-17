import fs from 'node:fs/promises'
import { createFixture } from 'fs-fixture'
import { dirname, resolve } from 'pathe'
import { afterEach, expect, test, vi } from 'vitest'

import { hardhat } from './hardhat.js'

const fixtures: Awaited<ReturnType<typeof createFixture>>[] = []

async function createTempDir() {
  const fixture = await createFixture()
  fixtures.push(fixture)
  return fixture.path
}

afterEach(async () => {
  vi.restoreAllMocks()
  await Promise.all(fixtures.splice(0).map((fixture) => fixture.rm()))
})

test('validate', async () => {
  const temp = await createTempDir()
  await expect(
    hardhat({ project: temp }).validate?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: hardhat must be installed to use Hardhat plugin.]',
  )
})

test('project does not exist', async () => {
  const dir = await createTempDir()
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

test('deployments alias multiple contracts to one artifact', async () => {
  const dir = await createTempDir()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const artifactsDir = resolve(dir, 'artifacts')
  await fs.mkdir(artifactsDir, { recursive: true })
  const erc20Artifact = {
    contractName: 'ERC20',
    abi: [
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  }
  await fs.writeFile(
    resolve(artifactsDir, 'ERC20.json'),
    JSON.stringify(erc20Artifact, null, 2),
  )

  const result = await hardhat({
    project: dir,
    commands: { build: false, clean: false, rebuild: false },
    deployments: {
      dai: {
        artifact: 'ERC20',
        address: { 31337: '0x1111111111111111111111111111111111111111' },
      },
      weth: {
        artifact: 'ERC20',
        address: { 31337: '0x2222222222222222222222222222222222222222' },
      },
    },
    include: ['ERC20.json'],
  }).contracts?.()

  const names = (result ?? []).map((c) => c.name).sort()
  expect(names).toEqual(['ERC20', 'dai', 'weth'])

  const dai = result?.find((c) => c.name === 'dai')
  expect(dai?.abi).toEqual(erc20Artifact.abi)
  expect(dai?.address).toEqual({
    '31337': '0x1111111111111111111111111111111111111111',
  })

  const weth = result?.find((c) => c.name === 'weth')
  expect(weth?.abi).toEqual(erc20Artifact.abi)
  expect(weth?.address).toEqual({
    '31337': '0x2222222222222222222222222222222222222222',
  })
})
