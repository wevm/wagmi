import { expect, test } from 'vitest'
import { sliceAddress } from './sliceAddress.js'

test('sliceAddress returns null for undefined address', () => {
  expect(sliceAddress(undefined)).toBeNull()
})

test('sliceAddress slices a valid address correctly', () => {
  const address = '0x1234567890123456789012345678901234567890'
  expect(sliceAddress(address)).toBe('0x12...7890')
})
