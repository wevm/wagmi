import { abi, address, config } from '@wagmi/test'
import * as viem_actions from 'viem/actions'
import { expect, test, vi } from 'vitest'

import { getAction } from './getAction.js'

test('uses tree-shakable action', async () => {
  const client = config.getClient({ chainId: 1 })

  const name = 'getBlockNumber'
  const actions = { ...viem_actions }
  const spy = vi.spyOn(actions, name)
  const action = getAction(client, actions[name], name)

  await action({})
  expect(spy).toBeCalledWith(client, {})
})

test('uses client action', async () => {
  const client = config
    .getClient({ chainId: 1 })
    .extend(() => ({ getBlockNumber: async () => 69n }))

  const name = 'getBlockNumber'
  const spy = vi.spyOn(client, name)
  const action = getAction(client, client[name], name)

  await action({})
  expect(spy).toBeCalledWith({})
})

test('internal call', async () => {
  const client = config.getClient({ chainId: 1 }).extend(() => ({
    async call() {
      return {
        data: '0x0000000000000000000000000000000000000000000000000000000000000045',
      }
    },
  }))

  await expect(
    viem_actions.readContract(client, {
      address: address.wagmiMintExample,
      abi: abi.erc20,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  ).resolves.toEqual(69n)
})
