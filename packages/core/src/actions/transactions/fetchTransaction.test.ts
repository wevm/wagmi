import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchTransaction } from './fetchTransaction'

describe('fetchTransaction', () => {
  beforeEach(() => {
    setupClient()
  })

  it('default', async () => {
    const transaction = await fetchTransaction({
      hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
    })
    expect(transaction.hash).toMatchInlineSnapshot(
      '"0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b"',
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      const transaction = await fetchTransaction({
        hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
        chainId: 1,
      })
      expect(transaction.hash).toMatchInlineSnapshot(
        '"0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b"',
      )
    })
  })
})
