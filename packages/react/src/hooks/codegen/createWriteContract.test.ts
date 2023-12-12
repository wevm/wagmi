import { abi } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { test } from 'vitest'

import { createWriteContract } from './createWriteContract.js'

test('default', () => {
  const useWriteErc20 = createWriteContract({
    abi: abi.erc20,
  })

  renderHook(() => useWriteErc20())
})
