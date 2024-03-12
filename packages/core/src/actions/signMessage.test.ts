import { accounts, config, privateKey } from '@wagmi/test'
import { recoverMessageAddress } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test } from 'vitest'

import { mock } from '../connectors/mock.js'
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

test('behavior: local account', async () => {
  const account = privateKeyToAccount(privateKey)
  const signature = await signMessage(config, {
    account,
    message: 'foo bar baz',
  })
  await expect(
    recoverMessageAddress({
      message: 'foo bar baz',
      signature,
    }),
  ).resolves.toEqual(account.address)
})

test('behavior: user rejected request', async () => {
  const connector_ = config._internal.connectors.setup(
    mock({
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
    Version: viem@2.8.4]
  `)
  await disconnect(config, { connector: connector_ })
})

test('behavior: not connected', async () => {
  await expect(
    signMessage(config, { message: 'foo bar baz' }),
  ).rejects.toMatchInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})
