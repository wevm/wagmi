import { config, testClient, wait } from '@wagmi/test'
import { parseEther } from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { sendTransaction } from './sendTransaction.js'
import { waitForTransactionReceipt } from './waitForTransactionReceipt.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  await connect(config, { connector })

  const hash = await sendTransaction(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)

  await expect(
    waitForTransactionReceipt(config, { hash }),
  ).resolves.toMatchObject({
    chainId: 1,
    transactionHash: hash,
  })

  await disconnect(config, { connector })
})

test('behavior: transaction reverted', async () => {
  await expect(
    waitForTransactionReceipt(config, {
      hash: '0x745367f76807d411b7fa4c3a552a62e3e45303ef40145fff04d84b867c2575d3',
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [CallExecutionError: Execution reverted with reason: PartyBid::claim: contribution already claimed.

    Raw Call Arguments:
      from:                  0xa0cf798816d4b9b9866b5330eea46a18382f251e
      to:                    0xf1332f21487e74612ed3a0fb36da729b73f1ae19
      value:                 0 ETH
      data:                  0x1e83409a000000000000000000000000a0cf798816d4b9b9866b5330eea46a18382f251e
      gas:                   128730
      maxFeePerGas:          43.307900987 gwei
      maxPriorityFeePerGas:  1.5 gwei
      nonce:                 43

    Details: execution reverted: PartyBid::claim: contribution already claimed
    Version: viem@2.38.0]
  `)
})
