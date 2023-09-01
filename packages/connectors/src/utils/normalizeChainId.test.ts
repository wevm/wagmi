import { describe, expect, it } from 'vitest'

import { normalizeChainId } from './normalizeChainId'

describe.each([
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
  it(`returns ${expected}`, () => {
    expect(normalizeChainId(chainId)).toEqual(expected)
  })
})
