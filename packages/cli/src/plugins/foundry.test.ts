import fs from 'node:fs/promises'
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

test('broadcast deployments', async () => {
  const dir = f.temp()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const broadcastDir = resolve(dir, 'broadcast')
  const scriptDir = resolve(broadcastDir, 'Deploy.s.sol')
  const chainDir = resolve(scriptDir, '1')
  await fs.mkdir(chainDir, { recursive: true })
  const broadcastContent = {
    transactions: [
      {
        transactionType: 'CREATE',
        contractName: 'Counter',
        contractAddress: '0x1234567890123456789012345678901234567890',
        additionalContracts: [
          {
            contractName: 'Library',
            contractAddress: '0x0987654321098765432109876543210987654321',
          },
        ],
      },
    ],
  }
  await fs.writeFile(
    resolve(chainDir, 'run-latest.json'),
    JSON.stringify(broadcastContent, null, 2),
  )

  const artifactsDir = resolve(dir, 'out')
  await fs.mkdir(artifactsDir, { recursive: true })
  const counterArtifact = {
    abi: [
      {
        inputs: [],
        name: 'increment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  }
  const libraryArtifact = {
    abi: [
      {
        inputs: [],
        name: 'helper',
        outputs: [],
        stateMutability: 'pure',
        type: 'function',
      },
    ],
  }
  await fs.writeFile(
    resolve(artifactsDir, 'Counter.json'),
    JSON.stringify(counterArtifact, null, 2),
  )
  await fs.writeFile(
    resolve(artifactsDir, 'Library.json'),
    JSON.stringify(libraryArtifact, null, 2),
  )

  await expect(
    foundry({
      includeBroadcasts: true,
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
          ],
          "address": {
            "1": "0x1234567890123456789012345678901234567890",
          },
          "name": "Counter",
        },
        {
          "abi": [
            {
              "inputs": [],
              "name": "helper",
              "outputs": [],
              "stateMutability": "pure",
              "type": "function",
            },
          ],
          "address": {
            "1": "0x0987654321098765432109876543210987654321",
          },
          "name": "Library",
        },
      ]
    `)
})

test('broadcast deployments filters CALL transactions', async () => {
  const dir = f.temp()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const broadcastDir = resolve(dir, 'broadcast')
  const scriptDir = resolve(broadcastDir, 'Deploy.s.sol')
  const chainDir = resolve(scriptDir, '1')
  await fs.mkdir(chainDir, { recursive: true })
  const broadcastContent = {
    transactions: [
      {
        transactionType: 'CREATE',
        contractName: 'Counter',
        contractAddress: '0x1234567890123456789012345678901234567890',
        additionalContracts: [],
      },
      {
        transactionType: 'CALL',
        contractName: 'CalledContract',
        contractAddress: '0xCCCC000000000000000000000000000000000000',
        additionalContracts: [],
      },
      {
        transactionType: 'CREATE2',
        contractName: 'Factory',
        contractAddress: '0xFFFF000000000000000000000000000000000000',
        additionalContracts: [],
      },
    ],
  }
  await fs.writeFile(
    resolve(chainDir, 'run-latest.json'),
    JSON.stringify(broadcastContent, null, 2),
  )

  const artifactsDir = resolve(dir, 'out')
  await fs.mkdir(artifactsDir, { recursive: true })
  const counterArtifact = {
    abi: [
      {
        inputs: [],
        name: 'increment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  }
  const factoryArtifact = {
    abi: [
      {
        inputs: [],
        name: 'deploy',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  }
  await fs.writeFile(
    resolve(artifactsDir, 'Counter.json'),
    JSON.stringify(counterArtifact, null, 2),
  )
  await fs.writeFile(
    resolve(artifactsDir, 'Factory.json'),
    JSON.stringify(factoryArtifact, null, 2),
  )

  const result = await foundry({
    includeBroadcasts: true,
  }).contracts?.()

  const counter = result?.find((c) => c.name === 'Counter')
  expect(counter?.address).toEqual({
    '1': '0x1234567890123456789012345678901234567890',
  })

  const calledContract = result?.find((c) => c.name === 'CalledContract')
  expect(calledContract).toBeUndefined()

  const factory = result?.find((c) => c.name === 'Factory')
  expect(factory?.address).toEqual({
    '1': '0xFFFF000000000000000000000000000000000000',
  })
})

test('watch callbacks use broadcast deployments', async () => {
  const dir = f.temp()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const broadcastDir = resolve(dir, 'broadcast')
  const scriptDir = resolve(broadcastDir, 'Deploy.s.sol')
  const chainDir = resolve(scriptDir, '1')
  await fs.mkdir(chainDir, { recursive: true })
  const broadcastContent = {
    transactions: [
      {
        transactionType: 'CREATE',
        contractName: 'Counter',
        contractAddress: '0x1234567890123456789012345678901234567890',
        additionalContracts: [],
      },
    ],
  }
  await fs.writeFile(
    resolve(chainDir, 'run-latest.json'),
    JSON.stringify(broadcastContent, null, 2),
  )

  const artifactsDir = resolve(dir, 'out')
  await fs.mkdir(artifactsDir, { recursive: true })
  const counterArtifact = {
    abi: [
      {
        inputs: [],
        name: 'increment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  }
  await fs.writeFile(
    resolve(artifactsDir, 'Counter.json'),
    JSON.stringify(counterArtifact, null, 2),
  )

  const plugin = foundry({
    includeBroadcasts: true,
  })

  await plugin.contracts?.()

  const artifactPath = resolve(artifactsDir, 'Counter.json')
  const contract = await plugin.watch.onChange?.(artifactPath)

  expect(contract).toMatchObject({
    name: 'Counter',
    address: {
      '1': '0x1234567890123456789012345678901234567890',
    },
  })
})
