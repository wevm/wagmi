import type { ResolvedConfig } from 'abitype'
import { BigNumber } from 'ethers'
import { assertType, describe } from 'vitest'

import { mlootContractConfig, wagmigotchiContractConfig } from '../../../test'
import { watchMulticall } from './watchMulticall'

describe('watchMulticall', () => {
  watchMulticall(
    {
      contracts: [
        {
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        },
        {
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
        { ...wagmigotchiContractConfig, functionName: 'getAlive' },
        {
          ...mlootContractConfig,
          functionName: 'tokenOfOwnerByIndex',
          args: [
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            BigNumber.from(0),
          ],
        },
      ],
    },
    (results) => {
      // ^?
      assertType<
        [
          ResolvedConfig['BigIntType'],
          ResolvedConfig['BigIntType'],
          boolean,
          ResolvedConfig['BigIntType'],
        ]
      >(results)
    },
  )

  watchMulticall(
    {
      contracts: [
        {
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        },
        {
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
        { ...wagmigotchiContractConfig, functionName: 'getAlive' },
        {
          address: '0x123',
          abi: [],
          // @ts-expect-error not a valid function name
          functionName: 'tokenOfOwnerByIndex',
          args: [
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            BigNumber.from(0),
          ],
        },
      ],
    },
    (results) => {
      // ^?
      assertType<
        [
          ResolvedConfig['BigIntType'],
          ResolvedConfig['BigIntType'],
          boolean,
          unknown,
        ]
      >(results)
    },
  )
})
