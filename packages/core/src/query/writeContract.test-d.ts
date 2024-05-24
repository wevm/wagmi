import { http } from 'viem'
import { writeContract } from 'viem/actions'
import { base } from 'viem/chains'
import { test } from 'vitest'

import { createConfig } from '../createConfig.js'
import type { WriteContractMutate } from './writeContract.js'

// https://github.com/wevm/wagmi/issues/3981
test('gh#3981', () => {
  const config = createConfig({
    chains: [base],
    transports: {
      [base.id]: http(),
    },
  })

  const abi = [
    {
      type: 'function',
      name: 'example1',
      inputs: [
        { name: 'exampleName', type: 'address', internalType: 'address' },
      ],
      outputs: [],
      stateMutability: 'payable',
    },
    {
      type: 'function',
      name: 'example2',
      inputs: [
        { name: 'exampleName', type: 'address', internalType: 'address' },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
  ] as const

  const write: WriteContractMutate<typeof config> = () => {}
  write({
    abi,
    address: '0x...',
    functionName: 'example1',
    args: ['0x...'],
    value: 123n,
  })
  write({
    abi: [
      {
        type: 'function',
        name: 'example1',
        inputs: [
          { name: 'exampleName', type: 'address', internalType: 'address' },
        ],
        outputs: [],
        stateMutability: 'payable',
      },
      {
        type: 'function',
        name: 'example2',
        inputs: [
          { name: 'exampleName', type: 'address', internalType: 'address' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
      },
    ] as const,
    address: '0x...',
    functionName: 'example1',
    args: ['0x...'],
    value: 123n,
  })

  write({
    abi,
    address: '0x...',
    functionName: 'example2',
    args: ['0x...'],
    // @ts-expect-error
    value: 123n,
  })
  write({
    abi: [
      {
        type: 'function',
        name: 'example1',
        inputs: [
          { name: 'exampleName', type: 'address', internalType: 'address' },
        ],
        outputs: [],
        stateMutability: 'payable',
      },
      {
        type: 'function',
        name: 'example2',
        inputs: [
          { name: 'exampleName', type: 'address', internalType: 'address' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
      },
    ],
    address: '0x...',
    functionName: 'example1',
    args: ['0x...'],
    value: 123n,
  })

  const client = config.getClient({ chainId: base.id })
  writeContract(client, {
    abi,
    address: '0x...',
    account: '0x...',
    functionName: 'example1',
    args: ['0x...'],
    value: 123n,
  })
  writeContract(client, {
    abi: [
      {
        type: 'function',
        name: 'example1',
        inputs: [
          { name: 'exampleName', type: 'address', internalType: 'address' },
        ],
        outputs: [],
        stateMutability: 'payable',
      },
      {
        type: 'function',
        name: 'example2',
        inputs: [
          { name: 'exampleName', type: 'address', internalType: 'address' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
      },
    ] as const,
    address: '0x...',
    account: '0x...',
    functionName: 'example1',
    args: ['0x...'],
    value: 123n,
  })
})
