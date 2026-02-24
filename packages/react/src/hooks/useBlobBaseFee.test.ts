import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useBlobBaseFee } from './useBlobBaseFee.js'

test('default', async () => {
  const { result } = await renderHook(() => useBlobBaseFee())

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  expect(result.current.data).toBeTypeOf('bigint')
  expect(result.current.queryKey[0]).toBe('blobBaseFee')
})
