import { config, testClient } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test, vi } from 'vitest'
import { ref } from 'vue'
import { useBlockNumber } from './useBlockNumber.js'

test('default', async () => {
  await testClient.mainnet.resetFork()

  const [blockNumberQuery] = renderComposable(() => useBlockNumber())

  await vi.waitFor(blockNumberQuery.status, (status) => status === 'success')

  expect(blockNumberQuery.data.value).toMatchInlineSnapshot('19258213n')
})

test('parameters: chainId', async () => {
  config.setState((state) => ({ ...state, chainId: config.chains[0].id }))

  const [blockNumberQuery] = renderComposable(() => useBlockNumber())

  await vi.waitFor(blockNumberQuery.status, (status) => status === 'success')
  expect(blockNumberQuery.data.value).toBeTypeOf('bigint')

  config.setState((state) => ({ ...state, chainId: config.chains[2].id }))

  await vi.waitFor(blockNumberQuery.status, (status) => status === 'success')
  expect(blockNumberQuery.data.value).toBeTypeOf('bigint')
})

test('parameters: watch', async () => {
  const [blockNumberQuery] = renderComposable(() =>
    useBlockNumber({ watch: true }),
  )

  await vi.waitFor(blockNumberQuery.status, (status) => status === 'success')

  const blockNumber = blockNumberQuery.data.value!
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitFor(blockNumberQuery.data, (data) => data === blockNumber + 1n)
})

test('parameters: watch (reactive)', async () => {
  const watch = ref(true)

  const [blockNumberQuery] = renderComposable(() => useBlockNumber({ watch }))

  await vi.waitFor(blockNumberQuery.status, (status) => status === 'success')

  const blockNumber = blockNumberQuery.data.value!

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitFor(blockNumberQuery.data, (data) => data === blockNumber + 1n)

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitFor(blockNumberQuery.data, (data) => data === blockNumber + 2n)

  watch.value = false

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitFor(blockNumberQuery.data, (data) => data === blockNumber + 2n, {
    timeout: 1_000,
  })
})
