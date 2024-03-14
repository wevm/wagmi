import { accounts, config, privateKey, typedData } from '@wagmi/test'
import { recoverTypedDataAddress } from 'viem'
import { expect, test } from 'vitest'

import { privateKeyToAccount } from 'viem/accounts'
import { mock } from '../connectors/mock.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount } from './getAccount.js'
import { signTypedData } from './signTypedData.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const signature = await signTypedData(config, {
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature,
    }),
  ).resolves.toBe(getAccount(config).address)
  await disconnect(config, { connector })
})

test('behavior: user rejected request', async () => {
  const connector_ = config._internal.connectors.setup(
    mock({
      accounts,
      features: { signTypedDataError: true },
    }),
  )
  await connect(config, { connector: connector_ })
  await expect(
    signTypedData(config, {
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
    }),
  ).rejects.toMatchInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to sign typed data.
    Version: viem@2.8.4]
  `)
  await disconnect(config, { connector: connector_ })
})

test('behavior: not connected', async () => {
  await expect(
    signTypedData(config, {
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
    }),
  ).rejects.toMatchInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})

test('behavior: local account', async () => {
  const account = privateKeyToAccount(privateKey)
  const signature = await signTypedData(config, {
    account,
    types: typedData.basic.types,
    primaryType: 'Mail',
    message: typedData.basic.message,
  })
  await expect(
    recoverTypedDataAddress({
      types: typedData.basic.types,
      primaryType: 'Mail',
      message: typedData.basic.message,
      signature,
    }),
  ).resolves.toBe(account.address)
})
