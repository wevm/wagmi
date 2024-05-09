import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { ref } from 'vue'
import { testClient } from '../../../test/src/clients.js'
import { useBlockNumber } from './useBlockNumber.js'

test('default', async () => {
  const [blockNumberQuery] = renderComposable(() => useBlockNumber())

  await waitFor(blockNumberQuery.status, (status) => status === 'success')

  expect(blockNumberQuery.data.value).toMatchInlineSnapshot('19258213n')
})

test('parameters: watch', async () => {
  const [blockNumberQuery] = renderComposable(() =>
    useBlockNumber({ watch: true }),
  )

  await waitFor(blockNumberQuery.status, (status) => status === 'success')

  const blockNumber = blockNumberQuery.data.value!

  await testClient.mainnet.mine({ blocks: 1 })

  await waitFor(blockNumberQuery.data, (data) => data === blockNumber + 1n)
})

test('parameters: watch (reactive)', async () => {
  const watch = ref(true)

  const [blockNumberQuery] = renderComposable(() => useBlockNumber({ watch }))

  await waitFor(blockNumberQuery.status, (status) => status === 'success')

  const blockNumber = blockNumberQuery.data.value!

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(blockNumberQuery.data, (data) => data === blockNumber + 1n)

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(blockNumberQuery.data, (data) => data === blockNumber + 2n)

  watch.value = false

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(blockNumberQuery.data, (data) => data === blockNumber + 2n, {
    timeout: 1_000,
  })
})

test('parameters: watch (reactive)', async () => {
  const enabled = ref(true)

  const [blockNumberQuery] = renderComposable(() =>
    useBlockNumber({
      watch: {
        enabled,
      },
    }),
  )

  await waitFor(blockNumberQuery.status, (status) => status === 'success')

  const blockNumber = blockNumberQuery.data.value!

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(blockNumberQuery.data, (data) => data === blockNumber + 1n)

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(blockNumberQuery.data, (data) => data === blockNumber + 2n)

  enabled.value = false

  await testClient.mainnet.mine({ blocks: 1 })
  await waitFor(blockNumberQuery.data, (data) => data === blockNumber + 2n, {
    timeout: 1_000,
  })
})
