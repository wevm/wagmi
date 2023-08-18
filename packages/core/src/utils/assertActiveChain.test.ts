import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from '../actions/connect.js'
import { disconnect } from '../actions/disconnect.js'
import { assertActiveChain } from './assertActiveChain.js'

const connector = config.connectors[0]!

test('errors when on wrong chain', async () => {
  await connect(config, { chainId: 1, connector })
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
  await connect(config, { chainId: 1, connector })
  assertActiveChain(config, { chainId: 1 })
  await disconnect(config, { connector })
})

test('can pass active chain', async () => {
  await connect(config, { chainId: 1, connector })
  assertActiveChain(config, { activeChainId: 1, chainId: 1 })
  await disconnect(config, { connector })
})
