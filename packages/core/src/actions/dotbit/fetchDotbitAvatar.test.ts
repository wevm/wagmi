import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'

import { fetchDotbitAvatar } from './fetchDotbitAvatar'

describe('fetchDotbitAvatar', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('args', () => {
    describe('address', () => {
      it('no result', async () => {
        expect(
          await fetchDotbitAvatar({
            address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          }),
        ).toMatchInlineSnapshot(`null`)
      })

      describe('has avatar', () => {
        it('custom', async () => {
          expect(
            await fetchDotbitAvatar({
              address: '0x1d643fac9a463c9d544506006a6348c234da485f',
            }),
          ).toMatchInlineSnapshot(`"https://thiscatdoesnotexist.com"`)
        })
      })
    })

    it('chainId', async () => {
      expect(
        await fetchDotbitAvatar({
          address: '0x1d643fac9a463c9d544506006a6348c234da485f',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`"https://thiscatdoesnotexist.com"`)
    })
  })
})
