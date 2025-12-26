import { config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useChainId } from './useChainId.js'

test('default', async () => {
  const { result } = renderPrimitive(() => useChainId())

  expect(result()).toMatchInlineSnapshot('1')

  config.setState((x) => ({ ...x, chainId: 456 }))

  expect(result()).toMatchInlineSnapshot('456')
})

test('parameters: config', async () => {
  const { result } = renderPrimitive(() => useChainId(() => ({ config })))
  expect(result()).toBeDefined()
})
