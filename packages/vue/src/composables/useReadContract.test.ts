import { abi, address, bytecode, chain, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { ref } from 'vue'

import { useReadContract } from './useReadContract.js'

test('default', async () => {
  const [result] = renderComposable(() =>
    useReadContract({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  )

  await waitFor(result.isSuccess)

  expect(result.data.value).toBe(10n)
  expect(result.queryKey).toMatchInlineSnapshot(`
    [
      "readContract",
      {
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "args": [
          "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        ],
        "chainId": 1,
        "functionName": "balanceOf",
      },
    ]
  `)
})

test('parameters: chainId', async () => {
  const [result] = renderComposable(() =>
    useReadContract({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      chainId: chain.mainnet2.id,
    }),
  )

  await waitFor(result.isSuccess)

  expect(result.data.value).toBe(10n)
  expect(result.queryKey).toMatchInlineSnapshot(`
    [
      "readContract",
      {
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "args": [
          "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        ],
        "chainId": 456,
        "functionName": "balanceOf",
      },
    ]
  `)
})

test('parameters: deployless read (bytecode)', async () => {
  const [result] = renderComposable(() =>
    useReadContract({
      abi: abi.wagmiMintExample,
      functionName: 'name',
      code: bytecode.wagmiMintExample,
    }),
  )

  await waitFor(result.isSuccess)

  expect(result.data.value).toMatchInlineSnapshot(`"wagmi"`)
})

test.skip('behavior: disabled when missing properties', async () => {
  const addressRef = ref()
  const abiRef = ref()
  const functionNameRef = ref()

  const [result] = renderComposable(() =>
    useReadContract({
      abi: abiRef,
      address: addressRef,
      functionName: functionNameRef,
    }),
  )

  await wait(100)
  expect(result.fetchStatus.value).toBe('idle')

  addressRef.value = '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'

  await wait(100)
  expect(result.fetchStatus.value).toBe('idle')

  abiRef.value = abi.wagmiMintExample
  functionNameRef.value = 'totalSupply'

  await wait(100)
  expect(result.fetchStatus.value).toBe('fetching')
})
