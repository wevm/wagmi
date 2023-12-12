import { abi } from '@wagmi/test'
import { test } from 'vitest'

import { createWriteContract } from './createWriteContract.js'

test('default', () => {
  const useWriteErc20 = createWriteContract({
    abi: abi.erc20,
  })

  useWriteErc20()
})
