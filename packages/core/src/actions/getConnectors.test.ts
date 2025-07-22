import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { getConnectors } from './getConnectors.js'

test('default', () => {
  expect(getConnectors(config)).toEqual(config.connectors)
})
