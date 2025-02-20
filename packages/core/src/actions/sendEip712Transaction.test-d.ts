import { http, parseEther } from 'viem'
import { zksync } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type SendEip712TransactionParameters,
  sendEip712Transaction,
} from './sendEip712Transaction.js'

test('chain formatters', () => {
  const config = createConfig({
    chains: [zksync],
    transports: { [zksync.id]: http() },
  })

  type Result = SendEip712TransactionParameters<typeof config>
  expectTypeOf<Result>().toMatchTypeOf<{
    chainId?: typeof zksync.id | undefined
    feeCurrency?: `0x${string}` | undefined
  }>()
  sendEip712Transaction(config, {
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    // @ts-expect-error
    feeCurrency: '0x',
  })

  type Result2 = SendEip712TransactionParameters<
    typeof config,
    typeof zksync.id
  >
  // @ts-expect-error
  expectTypeOf<Result2>().toMatchTypeOf<{
    feeCurrency?: `0x${string}` | undefined
  }>()
  sendEip712Transaction(config, {
    chainId: zksync.id,
    to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    value: parseEther('0.01'),
    // @ts-expect-error
    feeCurrency: '0x',
  })
})
