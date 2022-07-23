import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchEnsAddress } from './fetchEnsAddress'

describe('fetchEnsAddress', () => {
  describe('args', () => {
    beforeEach(() => {
      setupClient()
    })

    it('chainId', async () => {
      expect(
        await fetchEnsAddress({ name: 'awkweb.eth', chainId: 1 }),
      ).toMatchInlineSnapshot(`"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"`)
    })

    describe('name', () => {
      it('no result', async () => {
        expect(
          await fetchEnsAddress({ name: 'awkweb123.eth' }),
        ).toMatchInlineSnapshot(`null`)
      })

      it('has address', async () => {
        expect(
          await fetchEnsAddress({ name: 'awkweb.eth' }),
        ).toMatchInlineSnapshot(`"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"`)
      })
    })
  })
})
