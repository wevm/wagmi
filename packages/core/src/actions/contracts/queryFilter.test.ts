import { BigNumber, Event } from 'ethers'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  expectType,
  setupClient,
  wagmigotchiContractConfig,
} from '../../../test'
import { queryFilter } from './queryFilter'

const eventsDataArgsSnapshot = `[
  {
    "args": [
      "0x27a69FfBa1E939DDcFEcC8c7e0f967b872BaC65C",
      {
        "hex": "0x01",
        "type": "BigNumber",
      },
    ],
  },
  {
    "args": [
      "0x27a69FfBa1E939DDcFEcC8c7e0f967b872BaC65C",
      {
        "hex": "0x01",
        "type": "BigNumber",
      },
    ],
  },
]`

describe('queryFilter', () => {
  describe('configuration', () => {
    beforeEach(() => {
      setupClient()
    })

    it('chainId', async () => {
      const result = await queryFilter({
        //  ^?
        ...wagmigotchiContractConfig,
        eventName: 'CaretakerLoved',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        chainId: 1,
      })
      expect(result.map(({ args }) => ({ args }))).toMatchInlineSnapshot(
        eventsDataArgsSnapshot,
      )
      expectType<Event[]>(result)
    })

    it('args', async () => {
      const result = await queryFilter({
        //  ^?
        ...wagmigotchiContractConfig,
        eventName: 'CaretakerLoved',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
      })
      expect(result.map(({ args }) => ({ args }))).toMatchInlineSnapshot(
        eventsDataArgsSnapshot,
      )
      expectType<Event[]>(result)
    })

    it('block limits', async () => {
      const result = await queryFilter({
        //  ^?
        ...wagmigotchiContractConfig,
        eventName: 'CaretakerLoved',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        fromBlockOrBlockhash: 13326489,
        toBlock: 13326489,
      })
      expect(result.map(({ args }) => ({ args }))).toMatchInlineSnapshot(`
        [
          {
            "args": [
              "0x27a69FfBa1E939DDcFEcC8c7e0f967b872BaC65C",
              {
                "hex": "0x01",
                "type": "BigNumber",
              },
            ],
          },
        ]
      `)
      expectType<Event[]>(result)
    })
  })

  describe('behavior', () => {
    it('can use multiple args and block limits', async () => {
      const result = await queryFilter({
        //  ^?
        ...wagmigotchiContractConfig,
        eventName: 'CaretakerLoved',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c', BigNumber.from(1)],
        fromBlockOrBlockhash: 13209266,
        toBlock: 13326489,
      })
      expect(result.map(({ args }) => ({ args }))).toMatchInlineSnapshot(
        eventsDataArgsSnapshot,
      )
      expectType<Event[]>(result)
    })
  })
})
