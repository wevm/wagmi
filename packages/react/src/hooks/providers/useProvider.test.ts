import { actHookConnect, actHookNetwork, renderHook } from '../../../test'
import { useConnect, useNetwork } from '../accounts'
import { UseProviderArgs, useProvider } from './useProvider'

const useProviderWithConnectAndNetwork = (config: UseProviderArgs = {}) => {
  const connect = useConnect()
  const network = useNetwork()
  const provider = useProvider(config)
  return { connect, network, provider } as const
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

      await actHookConnect(utils)
      await actHookNetwork(utils, 4)

      expect(result.current.provider).toMatchInlineSnapshot(
        `"<Provider network={4} />"`,
      )
    })
  })
})
