import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useConnections } from './useConnections.js'

test('default', async () => {
  const [connections] = renderComposable(() => useConnections())

  expect(connections.value).toEqual([])

  await connect(config, { connector: config.connectors[0]! })

  expect(connections.value.length).toBe(1)
})
