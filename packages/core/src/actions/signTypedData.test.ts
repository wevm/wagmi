import { accounts, config, testConnector, typedData } from '@wagmi/test'
import { recoverTypedDataAddress } from 'viem'
import { expect, test } from 'vitest'

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
  const connector_ = config._internal.setup(
    testConnector({
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
    Version: viem@1.5.1]
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
    [ConnectorNotFoundError: Connector not found.

    Version: @wagmi/core@x.y.z]
  `)
})
