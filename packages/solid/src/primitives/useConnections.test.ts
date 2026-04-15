import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useConnections } from './useConnections.js'

test('default', async () => {
  const { result } = renderPrimitive(() => useConnections())

  expect(result()).toEqual([])

  await connect(config, { connector: config.connectors[0]! })

  expect(result().length).toBe(1)
})

test('parameters: config', () => {
  const { result } = renderPrimitive(() => useConnections(() => ({ config })), {
    wrapper: (props) => props.children,
  })
  expect(result()).toBeDefined()
})
