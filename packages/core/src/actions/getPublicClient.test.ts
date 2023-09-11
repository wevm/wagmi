import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getPublicClient } from './getPublicClient.js'

test('default', async () => {
  expect(getPublicClient(config)).toBeDefined()
})
