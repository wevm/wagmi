import { actConnect, actSwitchNetwork, renderHook } from '../../../test'
import { useConnect, useSwitchNetwork } from '../accounts'
import { UseProviderArgs, useProvider } from './useProvider'

function useProviderWithConnectAndNetwork(config: UseProviderArgs = {}) {
  return {
    connect: useConnect(),
    switchNetwork: useSwitchNetwork(),
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
      await actSwitchNetwork({ utils, chainId: 4 })

      expect(result.current.provider).toMatchInlineSnapshot(
        `"<Provider network={4} />"`,
      )
    })
  })
})
