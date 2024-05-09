import { renderComposable } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { useConfig } from './useConfig.js'

test('default', () => {
  const [config] = renderComposable(() => useConfig())

  expect(config).toBeDefined()
})
