import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getPublicClient } from './getPublicClient.js'

test('default', () => {
  expect(getPublicClient(config)).toBeDefined()
})

test('behavior: unconfigured chain', () => {
  expect(
    getPublicClient(config, {
      // @ts-expect-error
      chainId: 123456,
    }),
  ).toBeUndefined()
})
