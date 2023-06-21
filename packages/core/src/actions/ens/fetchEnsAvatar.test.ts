import { beforeEach, describe, expect, it } from 'vitest'

import { setupConfig } from '../../../test'

import { fetchEnsAvatar } from './fetchEnsAvatar'

describe('fetchEnsAvatar', () => {
  beforeEach(() => {
    setupConfig()
  })

  describe('args', () => {
    describe('address', () => {
      it('no result', async () => {
        expect(
          await fetchEnsAvatar({
            name: 'awkweb.eth',
          }),
        ).toMatchInlineSnapshot('null')
      })

      it('has avatar', async () => {
        expect(
          await fetchEnsAvatar({
            name: 'jxom.eth',
          }),
        ).toMatchInlineSnapshot(
          '"https://ipfs.io/ipfs/QmeZGc1CL3eb9QJatKXTGT7ekgLMq9FyZUWckQ4oWdc53a/2257.jpg"',
        )
      })
    })

    it('chainId', async () => {
      expect(
        await fetchEnsAvatar({
          name: 'jxom.eth',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(
        '"https://ipfs.io/ipfs/QmeZGc1CL3eb9QJatKXTGT7ekgLMq9FyZUWckQ4oWdc53a/2257.jpg"',
      )
    })
  })
})
