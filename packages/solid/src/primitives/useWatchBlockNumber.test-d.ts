import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useWatchBlockNumber } from './useWatchBlockNumber.js'

test('default', () => {
  const response = useWatchBlockNumber(() => ({
    onBlockNumber() {},
  }))
  expectTypeOf(response).toEqualTypeOf<void>()
})

test('parameters: config', () => {
  const response = useWatchBlockNumber(() => ({
    config,
    onBlockNumber() {},
  }))
  expectTypeOf(response).toEqualTypeOf<void>()
})
