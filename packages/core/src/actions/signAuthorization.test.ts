import { address, config, privateKey } from '@wagmi/test'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test } from 'vitest'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { signAuthorization } from './signAuthorization.js'

const account = privateKeyToAccount(privateKey)
const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(
    signAuthorization(config, {
      account,
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  ).resolves.toMatchInlineSnapshot(
    `
  {
  "chainId": 1,
  "contractAddress": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
  "nonce": 0,
  "r": "0xff5d79daa56d5aae2657e8950af71377f8c2860255a9c915948c071ef9286def",
  "s": "0x17318a10ff56f0000a350a210fdb312ba22260a64f38dddc135912a6c4795c1d",
  "v": 27n,
  "yParity": 0,
}`,
  )
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(
    signAuthorization(config, {
      account,
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})

test('behavior: unsupported account type', async () => {
  await connect(config, { connector })
  await expect(
    signAuthorization(config, {
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [AccountTypeNotSupportedError: Account type "json-rpc" is not supported.

    The \`signAuthorization\` Action does not support JSON-RPC Accounts.

    Docs: https://viem.sh/experimental/eip7702/signAuthorization
    Version: viem@2.21.40]
  `)
  await disconnect(config, { connector })
})
