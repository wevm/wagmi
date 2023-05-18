import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { renderHook } from '../../test-utils.js'
import { useChainId } from './useChainId.js'

test('default', async () => {
  const { result, rerender } = renderHook(() => useChainId())

  expect(result.current).toMatchInlineSnapshot('123')

  config.setState((x) => ({ ...x, chainId: 69 }))
  rerender()

  expect(result.current).toMatchInlineSnapshot('69')
})
