import { actConnect, actNetwork, renderHook } from '../../../test'
import { useConnect, useNetwork } from '../accounts'
import { UseProviderArgs, useProvider } from './useProvider'

function useProviderWithConnectAndNetwork(config: UseProviderArgs = {}) {
  return {
    connect: useConnect(),
    network: useNetwork(),
    provider: useProvider(config),
  }
}

describe('useProvider', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useProvider())
    expect(result.current).toMatchInlineSnapshot(
      `"<Provider network={31337} />"`,
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result } = renderHook(() => useProvider({ chainId: 1 }))
      expect(result.current).toMatchInlineSnapshot(`"<Provider network={1} />"`)
    })
  })

  describe('behavior', () => {
    it('switches chain', async () => {
      const utils = renderHook(() => useProviderWithConnectAndNetwork())
      const { result } = utils
      expect(result.current.provider).toMatchInlineSnapshot(
        `"<Provider network={31337} />"`,
      )

      await actConnect({ utils })
      await actNetwork({ utils, chainId: 4 })

      expect(result.current.provider).toMatchInlineSnapshot(
        `"<Provider network={4} />"`,
      )
    })
  })
})
