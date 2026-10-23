import fs from 'node:fs/promises'
import { createFixture } from 'fs-fixture'
import { dirname, resolve } from 'pathe'
import { afterEach, expect, test, vi } from 'vitest'

import { foundry } from './foundry.js'

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

test('forge not installed', async () => {
  const dir = await createTempDir()
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
  const dir = await createTempDir()
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
  const dir = await createTempDir()
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
  const dir = await createTempDir()
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

test('deployments support multiple named contracts sharing one artifact ABI', async () => {
  const dir = await createTempDir()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const artifactsDir = resolve(dir, 'out')
  await fs.mkdir(artifactsDir, { recursive: true })
  const erc20Artifact = {
    abi: [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  }
  await fs.writeFile(
    resolve(artifactsDir, 'ERC20.json'),
    JSON.stringify(erc20Artifact, null, 2),
  )

  const result = await foundry({
    deployments: {
      DAI: {
        artifact: 'ERC20',
        address: { 1: '0x6b175474e89094c44da98b954eedeac495271d0' },
      },
      WETH: {
        artifact: 'ERC20',
        address: { 1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' },
      },
    },
  }).contracts?.()

  const dai = result?.find((c) => c.name === 'DAI')
  expect(dai?.address).toEqual({
    '1': '0x6b175474e89094c44da98b954eedeac495271d0',
  })
  expect(dai?.abi).toEqual(erc20Artifact.abi)

  const weth = result?.find((c) => c.name === 'WETH')
  expect(weth?.address).toEqual({
    '1': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  })
  expect(weth?.abi).toEqual(erc20Artifact.abi)

  // base artifact-named contract is still emitted (no address, since `ERC20` key
  // wasn't given its own plain-address entry in `deployments`)
  const erc20 = result?.find((c) => c.name === 'ERC20')
  expect(erc20?.address).toBeUndefined()
  expect(erc20?.abi).toEqual(erc20Artifact.abi)
})

test('deployments still support a plain address for the artifact itself', async () => {
  const dir = await createTempDir()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

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

  const result = await foundry({
    deployments: {
      Counter: '0x1234567890123456789012345678901234567890',
    },
  }).contracts?.()

  expect(result).toEqual([
    {
      abi: counterArtifact.abi,
      address: '0x1234567890123456789012345678901234567890',
      name: 'Counter',
    },
  ])
})

test('watch callbacks use broadcast deployments', async () => {
  const dir = await createTempDir()
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
