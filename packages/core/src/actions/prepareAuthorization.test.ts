import { address, config, privateKey } from '@wagmi/test'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test } from 'vitest'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { prepareAuthorization } from './prepareAuthorization.js'

const account = privateKeyToAccount(privateKey)
const connector = config.connectors[0]!

test('default', async () => {
  await expect(
    prepareAuthorization(config, {
      account,
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
      "chainId": 1,
      "nonce": 0,
    }
  `)
})

test('behavior: account from connection', async () => {
  await connect(config, { connector })

  await expect(
    prepareAuthorization(config, {
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
      "chainId": 1,
      "nonce": 0,
    }
  `)

  await disconnect(config, { connector })
})
