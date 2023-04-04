import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'

import { fetchEnsAvatar } from './fetchEnsAvatar'

describe('fetchEnsAvatar', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('args', () => {
    describe('address', () => {
      it('no result', async () => {
        expect(
          await fetchEnsAvatar({
            name: 'awkweb.eth',
          }),
        ).toMatchInlineSnapshot(`null`)
      })

      it('has avatar', async () => {
        expect(
          await fetchEnsAvatar({
            name: 'nick.eth',
          }),
        ).toMatchInlineSnapshot(
          '"https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format"',
        )
      })
    })

    it('chainId', async () => {
      expect(
        await fetchEnsAvatar({
          name: 'nick.eth',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(
        '"https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format"',
      )
    })
  })
})
