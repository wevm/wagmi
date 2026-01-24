import { abi, config } from '@wagmi/test'
import { type Address, http } from 'viem'
import { celo, mainnet } from 'viem/chains'
import { assertType, expectTypeOf, test } from 'vitest'
import { createConfig } from '../createConfig.js'
import {
  type SimulateContractOptions,
  simulateContractQueryOptions,
} from './simulateContract.js'

const context = {} as any

test('default', async () => {
  const options = simulateContractQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    chainId: 1,
  })
  const response = await options.queryFn(context)

  expectTypeOf(response).toMatchTypeOf<{
    result: boolean
    request: {
      chainId: 1
      abi: readonly [
        {
          readonly name: 'transferFrom'
          readonly type: 'function'
          readonly stateMutability: 'nonpayable'
          readonly inputs: readonly [
            { readonly type: 'address'; readonly name: 'sender' },
            { readonly type: 'address'; readonly name: 'recipient' },
            { readonly type: 'uint256'; readonly name: 'amount' },
          ]
          readonly outputs: readonly [{ type: 'bool' }]
        },
      ]
      functionName: 'transferFrom'
      args: readonly [Address, Address, bigint]
    }
  }>()
})

test('chain formatters', () => {
  const config = createConfig({
    chains: [mainnet, celo],
    transports: { [celo.id]: http(), [mainnet.id]: http() },
  })

  type Result = SimulateContractOptions<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    (typeof config)['chains'][number]['id']
  >
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof celo.id | typeof mainnet.id | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  simulateContractQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feeCurrency: '0x',
  })

  type Result2 = SimulateContractOptions<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof celo.id
  >
  expectTypeOf<Result2>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  simulateContractQueryOptions(config, {
    chainId: celo.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feeCurrency: '0x',
  })

  type Result3 = SimulateContractOptions<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result3>().toMatchTypeOf<{
    functionName?: 'approve' | 'transfer' | 'transferFrom' | undefined
    args?: readonly [Address, Address, bigint] | undefined
  }>()
  expectTypeOf<Result3>().not.toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  simulateContractQueryOptions(config, {
    chainId: mainnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    // @ts-expect-error
    feeCurrency: '0x',
  })
})

test('overloads', async () => {
  {
    const options = simulateContractQueryOptions(config, {
      address: '0x',
      abi: abi.writeOverloads,
      functionName: 'foo',
    })
    const result = await options.queryFn(context)
    assertType<number>(result.result)
  }
  {
    const options = simulateContractQueryOptions(config, {
      address: '0x',
      abi: abi.writeOverloads,
      functionName: 'foo',
      args: [],
    })
    const result = await options.queryFn(context)
    assertType<number>(result.result)
  }
  {
    const options = simulateContractQueryOptions(config, {
      address: '0x',
      abi: abi.writeOverloads,
      functionName: 'foo',
      args: ['0x'],
    })
    const result = await options.queryFn(context)
    assertType<string>(result.result)
  }
  {
    const options = simulateContractQueryOptions(config, {
      address: '0x',
      abi: abi.writeOverloads,
      functionName: 'foo',
      args: ['0x', '0x'],
      //^?
    })
    const result = await options.queryFn(context)
    assertType<{
      foo: `0x${string}`
      bar: `0x${string}`
    }>(result.result)
  }
})
