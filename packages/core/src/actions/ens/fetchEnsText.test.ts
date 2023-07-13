import { beforeEach, describe, expect, it } from 'vitest'

import { setupConfig } from '../../../test'
import { fetchEnsText } from './fetchEnsText'

describe('fetchEnsText', () => {
  beforeEach(() => {
    setupConfig()
  })

  describe('args', () => {
    describe('textRecord', () => {
      it('no result', async () => {
        expect(
          await fetchEnsText({
            name: 'ens.eth',
            key: 'emptykey',
          }),
        ).toMatchInlineSnapshot('null')
      })

      it('has record', async () => {
        expect(
          await fetchEnsText({
            name: 'ens.eth',
            key: 'com.twitter',
          }),
        ).toMatchInlineSnapshot(`"ensdomains"`)
      })
    })

    it('chainId', async () => {
      expect(
        await fetchEnsText({
          name: 'ens.eth',
          key: 'com.twitter',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`"ensdomains"`)
    })
  })
})
