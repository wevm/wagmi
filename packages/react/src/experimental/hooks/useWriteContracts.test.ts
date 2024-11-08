import { connect, disconnect } from '@wagmi/core'
import { abi, address, config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useWriteContracts } from './useWriteContracts.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useWriteContracts())

  result.current.writeContracts({
    contracts: [
      {
        abi: abi.wagmiMintExample,
        address: address.wagmiMintExample,
        functionName: 'mint',
      },
      {
        abi: abi.wagmiMintExample,
        address: address.wagmiMintExample,
        functionName: 'mint',
      },
      {
        abi: abi.wagmiMintExample,
        address: address.wagmiMintExample,
        functionName: 'mint',
      },
    ],
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatchInlineSnapshot(
    `"0x1872d9f0ee275f586d93d23dbd683d8b6fd9a97ba8918a817c9f4b6fc3b85cf7"`,
  )

  await disconnect(config, { connector })
})
