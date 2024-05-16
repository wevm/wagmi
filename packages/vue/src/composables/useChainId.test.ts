import { config } from '@wagmi/test'
import { renderComposable } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useChainId } from './useChainId.js'

test('default', () => {
  const [chainId] = renderComposable(() => useChainId())

  expect(chainId.value).toMatchInlineSnapshot('1')

  config.setState((x) => ({ ...x, chainId: 456 }))

  expect(chainId.value).toMatchInlineSnapshot('456')
})

test('parameters: config', () => {
  const [chainId] = renderComposable(() => useChainId({ config }), {
    attach() {},
  })
  expect(chainId.value).toBeDefined()
})
