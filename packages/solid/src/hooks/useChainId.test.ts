import { config } from '@wagmi/test'
import { renderHook, testEffect } from '@wagmi/test/solid'
import { createEffect } from 'solid-js'
import { expect, test } from 'vitest'

import { useChainId } from './useChainId.js'

test('default', async () => {
  const { result } = renderHook(useChainId)
  return testEffect((done) =>
    createEffect<number>((run = 0) => {
      if (run === 0) {
        expect(result()).toBe(1)
        config.setState((x) => ({ ...x, chainId: 456 }))
      } else if (run === 1) {
        expect(result()).toBe(456)
        done()
      }
      return run + 1
    }),
  )
})

test('parameters: config', () => {
  const { result } = renderHook(() => useChainId({ config }), {
    wrapper: undefined,
  })
  expect(result()).toBeDefined()
})
