import { accounts, chain, testClient, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { ref } from 'vue'
import { useBalance } from './useBalance.js'

const address = accounts[0]

beforeEach(async () => {
  await testClient.mainnet.setBalance({ address, value: parseEther('10000') })
  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet2.setBalance({ address, value: parseEther('69') })
  await testClient.mainnet2.mine({ blocks: 1 })
})

test('default', async () => {
  const [query] = renderComposable(() => useBalance({ address }))

  await waitFor(query.isSuccess)

  expect(query.data.value).toMatchObject(
    expect.objectContaining({
      decimals: expect.any(Number),
      formatted: expect.any(String),
      symbol: expect.any(String),
      value: expect.any(BigInt),
    }),
  )
})

test('parameters: chainId', async () => {
  const [query] = renderComposable(() =>
    useBalance({ address, chainId: chain.mainnet2.id }),
  )

  await waitFor(query.isSuccess)

  expect(query.data.value).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "69",
      "symbol": "WAG",
      "value": 69000000000000000000n,
    }
  `)
})

test('parameters: token', async () => {
  const [query] = renderComposable(() =>
    useBalance({
      address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
      token: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    }),
  )

  await waitFor(query.isSuccess)

  expect(query.data.value).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "0.559062564299199392",
      "symbol": "DAI",
      "value": 559062564299199392n,
    }
  `)
})

test('parameters: unit', async () => {
  const [query] = renderComposable(() =>
    useBalance({
      address,
      chainId: chain.mainnet2.id,
      unit: 'wei',
    }),
  )

  await waitFor(query.isSuccess)

  expect(query.data.value).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "69000000000000000000",
      "symbol": "WAG",
      "value": 69000000000000000000n,
    }
  `)
})

test('behavior: address: undefined -> defined', async () => {
  const address = ref()

  const [query] = renderComposable(() => useBalance({ address }))

  await wait(100)
  expect(query.fetchStatus.value).toMatchInlineSnapshot(`"idle"`)

  address.value = accounts[0]

  await waitFor(query.isSuccess)

  expect(query.data.value).toMatchInlineSnapshot(`
    {
      "decimals": 18,
      "formatted": "10000",
      "symbol": "ETH",
      "value": 10000000000000000000000n,
    }
  `)
})

test('behavior: disabled when properties missing', async () => {
  const [query] = renderComposable(() => useBalance({ address }))

  await wait(100)

  expect(query.fetchStatus.value).toMatchInlineSnapshot(`"idle"`)
})
