import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getClient } from './getClient.js'

test('default', async () => {
  expect(getClient(config)).toBeDefined()
})
