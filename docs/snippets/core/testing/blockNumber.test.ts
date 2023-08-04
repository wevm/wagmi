import { getBlockNumber } from '@wagmi/core'
import { expect, test } from 'vitest'

import { config } from './config'

test('getBlockNumber', async () => {
  const blockNumber = await getBlockNumber(config)
  expect(blockNumber).toBeDefined()
})
