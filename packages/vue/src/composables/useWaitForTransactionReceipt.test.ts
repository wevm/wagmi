import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { wait } from '../../../test/src/utils.js'
import { useWaitForTransactionReceipt } from './useWaitForTransactionReceipt.js'

test('default', async () => {
  const [result] = renderComposable(() =>
    useWaitForTransactionReceipt({
      hash: '0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30',
    }),
  )

  await waitFor(result.isSuccess)

  expect(result.data.value).toMatchInlineSnapshot(`
    {
      "blockHash": "0xd725a38b51e5ceec8c5f6c9ccfdb2cc423af993bb650af5eedca5e4be7156ba7",
      "blockNumber": 15189204n,
      "chainId": 1,
      "contractAddress": null,
      "cumulativeGasUsed": 12949744n,
      "effectiveGasPrice": 9371645552n,
      "from": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
      "gasUsed": 21000n,
      "logs": [],
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "status": "success",
      "to": "0xd2135cfb216b74109775236e36d4b433f1df507b",
      "transactionHash": "0x60668ed8c2dc110d61d945a936fcd45b8f13654e5c78481c8c825d1148c7ef30",
      "transactionIndex": 144,
      "type": "eip1559",
    }
  `)
})

test('disabled when hash is undefined', async () => {
  const [result] = renderComposable(() =>
    useWaitForTransactionReceipt({
      hash: undefined,
    }),
  )

  await wait(100)

  expect(result.isPending.value).toBe(true)
})
