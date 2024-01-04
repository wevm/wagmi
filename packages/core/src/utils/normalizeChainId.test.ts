import { expect, test } from 'vitest'

import { normalizeChainId } from './normalizeChainId.js'

test.each([
  { chainId: 1, expected: 1 },
  { chainId: '1', expected: 1 },
  { chainId: '0x1', expected: 1 },
  { chainId: '0x4', expected: 4 },
  { chainId: 42, expected: 42 },
  { chainId: '42', expected: 42 },
  { chainId: '0x2a', expected: 42 },
  { chainId: ' 0x2a', expected: 42 },
  { chainId: BigInt(1), expected: 1 },
  { chainId: BigInt(10), expected: 10 },
])('normalizeChainId($chainId)', ({ chainId, expected }) => {
  expect(normalizeChainId(chainId)).toEqual(expected)
})

test('unknown type', () => {
  expect(() => normalizeChainId({})).toThrow(
    'Cannot normalize chainId "[object Object]" of type "object"',
  )
})
