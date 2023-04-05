import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchEnsResolver } from './fetchEnsResolver'

describe('fetchEnsResolver', () => {
  describe('args', () => {
    beforeEach(() => {
      setupClient()
    })

    it('chainId', async () => {
      expect(
        await fetchEnsResolver({ name: 'awkweb.eth', chainId: 1 }),
      ).toMatchInlineSnapshot('"0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41"')
    })

    describe('name', () => {
      it('no result', async () => {
        const result = await fetchEnsResolver({ name: 'awkweb123.eth' })
        expect(result).toMatchInlineSnapshot(
          '"0x30200E0cb040F38E474E53EF437c95A1bE723b2B"',
        )
      })

      it('has resolver', async () => {
        const result = await fetchEnsResolver({ name: 'awkweb.eth' })
        expect(result).toMatchInlineSnapshot(
          '"0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41"',
        )
      })
    })
  })
})
