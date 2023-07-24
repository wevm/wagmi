import type { SelectChains } from './chain.js'
import type { Merge } from './utils.js'
import type { Chain, mainnet, optimism, sepolia } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

test('not narrowable', () => {
  type Result = SelectChains<readonly Chain[], number>
  expectTypeOf<Result>().toEqualTypeOf<readonly [Chain]>()
})

test('chainId', () => {
  type Result = SelectChains<readonly [typeof mainnet, typeof optimism], 1>
  expectTypeOf<Result>().toEqualTypeOf<readonly [typeof mainnet]>()
})

test('at least one chain has formatters', () => {
  type Result = SelectChains<readonly [typeof mainnet, typeof optimism]>
  expectTypeOf<Result>().toEqualTypeOf<
    readonly [typeof mainnet, typeof optimism]
  >()
})

test('no formatters', () => {
  type Result = SelectChains<readonly [typeof mainnet, typeof sepolia]>
  expectTypeOf<Result>().toEqualTypeOf<
    readonly [
      Merge<typeof mainnet, Pick<typeof mainnet | typeof sepolia, 'id'>>,
    ]
  >()
})
