import { accounts, config, testConnector } from '@wagmi/test'
import { recoverMessageAddress } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount } from './getAccount.js'
import { signMessage } from './signMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const signature = await signMessage(config, { message: 'foo bar baz' })
  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature,
    }),
  ).resolves.toEqual(getAccount(config).address)
  await disconnect(config, { connector })
})

test('behavior: user rejected request', async () => {
  const connector_ = config._internal.setup(
    testConnector({
      accounts,
      features: { signMessageError: true },
    }),
  )
  await connect(config, { connector: connector_ })
  await expect(
    signMessage(config, { message: 'foo bar baz' }),
  ).rejects.toMatchInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to sign message.
    Version: viem@1.10.1]
  `)
  await disconnect(config, { connector: connector_ })
})

test('behavior: not connected', async () => {
  await expect(
    signMessage(config, { message: 'foo bar baz' }),
  ).rejects.toMatchInlineSnapshot(`
    [ConnectorNotFoundError: Connector not found.

    Version: @wagmi/core@x.y.z]
  `)
})
