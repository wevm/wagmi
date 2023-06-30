import { config } from '@wagmi/test'

import { connect } from '../actions/connect.js'
import { disconnect } from '../actions/disconnect.js'
import { assertActiveChain } from './assertActiveChain.js'
import { expect, test } from 'vitest'

const connector = config.connectors[0]!

test('errors when on wrong chain', async () => {
  await connect(config, { chainId: 123, connector })
  expect(() =>
    assertActiveChain(config, { chainId: 456 }),
  ).toThrowErrorMatchingInlineSnapshot(`
    "Chain mismatch

    Details: Expected \\"Ethereum\\", received \\"Ethereum\\".
    Version: @wagmi/core@x.y.z"
  `)
  await disconnect(config, { connector })
})

test('does not error when on correct chain', async () => {
  await connect(config, { chainId: 123, connector })
  assertActiveChain(config, { chainId: 123 })
  await disconnect(config, { connector })
})
