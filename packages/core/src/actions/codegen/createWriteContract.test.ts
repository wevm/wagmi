import { abi } from '@wagmi/test'
import { expect, test } from 'vitest'

import { createWriteContract } from './createWriteContract.js'

test('default', () => {
  const writeErc20 = createWriteContract({
    abi: abi.erc20,
  })
  expect(writeErc20).toBeDefined()
})
