import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchDotbitName } from './fetchDotbitName'

describe('fetchDotbitName', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('args', () => {
    describe('address', () => {
      it('no result', async () => {
        expect(
          await fetchDotbitName({
            address: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
          }),
        ).toMatchInlineSnapshot(`null`)
      })

      it('has name', async () => {
        expect(
          await fetchDotbitName({
            address: '0x1D643FAc9a463c9d544506006a6348c234dA485f',
          }),
        ).toMatchInlineSnapshot(`"jeffx.bit"`)
      })
    })

    it('chainId', async () => {
      expect(
        await fetchDotbitName({
          address: '0x1D643FAc9a463c9d544506006a6348c234dA485f',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`"jeffx.bit"`)
    })
  })
})
