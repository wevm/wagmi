import { ProviderRpcError, RpcError } from './errors'

describe('RpcError', () => {
  it('creates', () => {
    expect(new RpcError(-32004, 'Method not supported')).toBeInstanceOf(
      RpcError,
    )
  })

  describe('fails', () => {
    it('invalid code', () => {
      try {
        new RpcError(4001.5, 'User rejected request')
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: "code" must be an integer.]`,
        )
      }
    })

    it('invalid message', () => {
      try {
        new RpcError(-32004, '')
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
    expect(new ProviderRpcError(4001, 'User rejected request')).toBeInstanceOf(
      ProviderRpcError,
    )
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
