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
              address: '0xEa8e1d16624CBf0290AB887129bB70E5Cdb4b557',
            }),
          ).toMatchInlineSnapshot(`"https://thiscatdoesnotexist.com"`)
        })
      })
    })

    it('chainId', async () => {
      expect(
        await fetchDotbitAvatar({
          address: '0xEa8e1d16624CBf0290AB887129bB70E5Cdb4b557',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`"https://thiscatdoesnotexist.com"`)
    })
  })
})
