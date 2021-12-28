import { ethers } from 'ethers'
import { defaultMnemonic } from 'wagmi-private/testing'

import { actHook, renderHook } from '../../../test'
import { useAccount } from './useAccount'
import { useConnect } from './useConnect'

const useAccountWithConnect = () => {
  const account = useAccount()
  const connect = useConnect()
  return { account, connect } as const
}

describe('useAccount', () => {
  it('inits', async () => {
    const { result } = renderHook(() => useAccount())
    const state = result.current[0]
    const disconnect = result.current[1]
    expect(state).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
    expect(disconnect).toBeDefined()
  })

  it('connects', async () => {
    const wallet = ethers.Wallet.fromMnemonic(defaultMnemonic)
    const { result } = renderHook(() => useAccountWithConnect())

    await actHook(async () => {
      const useConnectState = result.current.connect[0]
      const connect = result.current.connect[1]
      const mockConnector = useConnectState.data.connectors[0]
      await connect(mockConnector)
    })

    let useAccountState = result.current.account[0]
    const address = await wallet.getAddress()
    expect(useAccountState.data?.address).toEqual(address)
    expect(useAccountState.loading).toEqual(false)

    const disconnect = result.current.account[1]
    actHook(disconnect)
    useAccountState = result.current.account[0]
    expect(useAccountState.data?.address).toEqual(undefined)
    expect(useAccountState.loading).toEqual(false)
  })
})
