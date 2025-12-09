import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { useConfig } from './useConfig.js'

test('default', () => {
  const result = useConfig({ config })
  expect(result).toBeDefined()
})
