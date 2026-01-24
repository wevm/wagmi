import { switchChain } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { createSignal } from 'solid-js'
import { expect, test, vi } from 'vitest'
import { useClient } from './useClient.js'

test('default', async () => {
  const { result } = renderPrimitive(() => useClient())

  expect(result?.()?.chain.id).toEqual(1)

  await switchChain(config, { chainId: 456 })

  expect(result?.()?.chain?.id).toEqual(456)
})

test('parameters: config', () => {
  const { result } = renderPrimitive(() => useClient(() => ({ config })), {
    wrapper: (props) => props.children,
  })

  expect(result()).toBeDefined()
})

test('behavior: controlled chainId', async () => {
  const [chainId, setChainId] = createSignal(456)

  const { result } = renderPrimitive(() =>
    useClient(() => ({ chainId: chainId() })),
  )

  expect(result()?.chain.id).toEqual(456)

  setChainId(1)

  await vi.waitFor(() => {
    expect(result()?.chain.id).toEqual(1)
  })
})

test('behavior: unconfigured chain', () => {
  const { result } = renderPrimitive(() =>
    useClient(() => ({ chainId: 123456 })),
  )
  expect(result()).toBeUndefined()
})
