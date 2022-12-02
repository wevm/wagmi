import { describe, expect, it } from 'vitest'

import { ProviderRpcError, RpcError } from './errors'

describe('RpcError', () => {
  it('creates', () => {
    expect(
      new RpcError('Method not supported', { code: -32004 }),
    ).toBeInstanceOf(RpcError)
  })

  describe('fails', () => {
    it('invalid code', () => {
      try {
        new RpcError('User rejected request', { code: 4001.5 })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: "code" must be an integer.]`,
        )
      }
    })

    it('invalid message', () => {
      try {
        new RpcError('', { code: -32004 })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: "message" must be a nonempty string.]`,
        )
      }
    })
  })
})

describe('ProviderRpcError', () => {
  it('creates', () => {
    expect(
      new ProviderRpcError('User rejected request', { code: 4001 }),
    ).toBeInstanceOf(ProviderRpcError)
  })

  it('fails', () => {
    try {
      // @ts-expect-error incorrect code
      new ProviderRpcError(-32004, 'Method not supported')
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: "code" must be an integer such that: 1000 <= code <= 4999]`,
      )
    }
  })
})
