import { chain, config, testClient, wait } from '@wagmi/test'
import { fallback, http, parseEther, type Transport } from 'viem'
import { beforeEach, expect, test, vi } from 'vitest'

import { createConfig } from '../createConfig.js'
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
    Version: viem@2.55.2]
  `)
})

test('behavior: reverted transaction with hanging fallback reason lookup rejects', async () => {
  const trace: { endpoint: 'primary' | 'secondary'; method: string }[] = []
  function transport(endpoint: 'primary' | 'secondary'): Transport {
    return (parameters: Parameters<ReturnType<typeof http>>[0]) => {
      const transport = http()(parameters)
      const request = (async (args, options) => {
        trace.push({ endpoint, method: args.method })
        if (args.method !== 'eth_call') return transport.request(args, options)
        if (endpoint === 'secondary') return new Promise(() => {})

        const error = new Error('Internal server error') as Error & {
          code: number
        }
        error.code = -32000
        throw error
      }) as typeof transport.request
      return { ...transport, request }
    }
  }

  const config = createConfig({
    chains: [chain.mainnet],
    storage: null,
    transports: {
      [chain.mainnet.id]: fallback(
        [transport('primary'), transport('secondary')],
        {
          rank: false,
          retryCount: 0,
        },
      ),
    },
  })

  const result = await vi.waitFor(
    () =>
      waitForTransactionReceipt(config, {
        hash: '0x745367f76807d411b7fa4c3a552a62e3e45303ef40145fff04d84b867c2575d3',
        chainId: chain.mainnet.id,
        timeout: 100,
      }).then(
        () => ({ status: 'resolved' as const }),
        (error) => ({
          status: 'rejected' as const,
          message: error instanceof Error ? error.message : String(error),
        }),
      ),
    { timeout: 500 },
  )

  expect(
    trace.filter((entry) =>
      [
        'eth_getTransactionReceipt',
        'eth_getTransactionByHash',
        'eth_call',
      ].includes(entry.method),
    ),
  ).toEqual([
    { endpoint: 'primary', method: 'eth_getTransactionReceipt' },
    { endpoint: 'primary', method: 'eth_getTransactionByHash' },
    { endpoint: 'primary', method: 'eth_call' },
    { endpoint: 'secondary', method: 'eth_call' },
  ])
  expect(result).toEqual({ status: 'rejected', message: 'unknown reason' })
})
