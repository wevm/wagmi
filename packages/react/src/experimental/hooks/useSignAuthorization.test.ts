import { connect, disconnect } from '@wagmi/core'
import { address, config,privateKey } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'
import { privateKeyToAccount } from 'viem/accounts'

import { useSignAuthorization } from './useSignAuthorization.js'

const account = privateKeyToAccount(privateKey)
const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSignAuthorization())

  result.current.signAuthorization({
      account,
      contractAddress: address.wagmiMintExample,
      chainId: config.chains[0].id,
      nonce: 0,
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatchInlineSnapshot(
    `
  {
  "chainId": 1,
  "contractAddress": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
  "nonce": 0,
  "r": "0xff5d79daa56d5aae2657e8950af71377f8c2860255a9c915948c071ef9286def",
  "s": "0x17318a10ff56f0000a350a210fdb312ba22260a64f38dddc135912a6c4795c1d",
  "v": 27n,
  "yParity": 0,
}`)

  await disconnect(config, { connector })
})
