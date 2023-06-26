import { accounts, config, testChains, testConnector } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount } from './getAccount.js'
import { switchChain } from './switchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const chainId1 = getAccount(config).chainId

  await switchChain(config, { chainId: testChains.anvilTwo.id })

  const chainId2 = getAccount(config).chainId
  expect(chainId2).toBeDefined()
  expect(chainId1).not.toBe(chainId2)

  await switchChain(config, { chainId: testChains.anvil.id })

  const chainId3 = getAccount(config).chainId
  expect(chainId3).toBeDefined()
  expect(chainId1).toBe(chainId3)

  await disconnect(config, { connector })
})

test('behavior: user rejected request', async () => {
  const connector_ = config._internal.setup(
    testConnector({
      accounts,
      features: { switchChainError: true },
    }),
  )
  await connect(config, { connector: connector_ })
  await expect(
    switchChain(config, { chainId: testChains.anvil.id }),
  ).rejects.toMatchInlineSnapshot(`
      [UserRejectedRequestError: User rejected the request.

      Details: Failed to switch chain.
      Version: viem@1.0.1]
    `)
  await disconnect(config, { connector: connector_ })
})

test('behavior: not supported', async () => {
  const { switchChain: _, ...connector_ } = config._internal.setup(
    testConnector({ accounts }),
  )
  await connect(config, { connector: connector_ })
  await expect(
    switchChain(config, { chainId: testChains.anvil.id }),
  ).rejects.toMatchInlineSnapshot(`
      [SwitchChainNotSupportedError: "Test Connector" does not support programmatic chain switching.

      Version: @wagmi/core@1.0.2]
    `)
  await disconnect(config, { connector: connector_ })
})
