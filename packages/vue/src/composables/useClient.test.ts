import { switchChain } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { ref } from 'vue-demi'

import { useClient } from './useClient.js'

test('default', async () => {
  const [client] = renderComposable(() => useClient())

  expect(client?.value?.chain.id).toEqual(1)

  await switchChain(config, { chainId: 456 })

  expect(client.value?.chain?.id).toEqual(456)
})

test('parameters: config', () => {
  const [chainId] = renderComposable(() => useClient({ config }), {
    attach() {},
  })
  expect(chainId.value).toBeDefined()
})

test('behavior: controlled chainId', async () => {
  const chainId = ref(456)

  const [client] = renderComposable(() => useClient({ chainId }))

  expect(client?.value?.chain.id).toEqual(456)

  chainId.value = 1

  await waitFor(client, (client) => client?.chain.id === 1)
})

test('behavior: unconfigured chain', () => {
  const [client] = renderComposable(() => useClient({ chainId: 123456 }))
  expect(client.value).toBeUndefined()
})
