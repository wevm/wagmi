import { connect, disconnect } from '@wagmi/core'
import { config, transactionHashRegex } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useSendRawTransaction } from './useSendRawTransaction.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSendRawTransaction())

  result.current.sendRawTransaction({
    serializedTransaction:
      '0x02f870018203118085065e22cad982520894d2135cfb216b74109775236e36d4b433f1df507b872386f26fc1000080c080a0af0d6c8691aae5ecfe11b40f69ea580980175ce3a242b431f65c6192c5f59663a0016d0a36a9b3100da6a45d818a4261d64ad5276d07f6313e816777705e619b91',
  })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})
