import { base, mainnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { type Config } from '../createConfig.js'
import { type WriteContractVariables } from './writeContract.js'

// https://github.com/wevm/wagmi/issues/3981
test('gh#3981', () => {
  const _abi = [
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

  type abi = typeof abi
  type config = Config<[typeof base, typeof mainnet]>
  type result = WriteContractVariables<
    abi,
    'example1',
    ['0x...'],
    config,
    config['chains'][number]['id']
  >['value']
  expectTypeOf<bigint | undefined>().toMatchTypeOf<result>()

  type result2 = WriteContractVariables<
    abi,
    'example1',
    ['0x...'],
    config,
    typeof mainnet['id']
  >['value']
  expectTypeOf<bigint | undefined>().toMatchTypeOf<result2>()

  type result3 = WriteContractVariables<
    abi,
    'example1',
    ['0x...'],
    config,
    typeof base['id']
  >['value']
  expectTypeOf<bigint | undefined>().toMatchTypeOf<result3>()

  type result4 = WriteContractVariables<
    abi,
    'example2',
    ['0x...'],
    config,
    typeof base['id']
  >['value']
  expectTypeOf<undefined>().toMatchTypeOf<result4>()
})
