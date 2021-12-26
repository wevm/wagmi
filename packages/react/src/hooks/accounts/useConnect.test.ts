import { ethers } from 'ethers'
import {
  MockConnector,
  defaultChains,
  defaultMnemonic,
} from '@wagmi/private/testing'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'

describe('useConnect', () => {
  it('initial values', async () => {
    const { result } = renderHook(() => useConnect())
    const state = result.current[0]
    const connect = result.current[1]
    expect(state.connected).toEqual(false)
    expect(state.connector).toEqual(undefined)
    expect(state.connectors.length).toEqual(1)
    expect(state.error).toEqual(undefined)
    expect(state.loading).toEqual(false)
    expect(connect).toBeDefined()
  })

  it('connects', async () => {
    const wallet = ethers.Wallet.fromMnemonic(defaultMnemonic)
    const { result } = renderHook(() => useConnect())

    await actHook(async () => {
      const state = result.current[0]
      const connect = result.current[1]
      const mockConnector = state.connectors[0]

      const res = await connect(mockConnector)
      if (!res) throw Error('Something went wrong')
      if (res instanceof Error) throw res

      expect(res.data.account).toEqual(wallet.address)
      expect(state.loading).toEqual(false)
    })

    const state = result.current[0]
    expect(state.connected).toEqual(true)
    expect(state.connector?.name).toEqual('Mock')

    // Already connected
    await actHook(async () => {
      const state = result.current[0]
      const connect = result.current[1]
      const mockConnector = state.connectors[0]
      const res = await connect(mockConnector)
      expect(res).toEqual(undefined)
    })
  })

  it('fails connect', async () => {
    const { result } = renderHook(() => useConnect(), {
      initialProps: {
        connectors: [
          new MockConnector({
            chains: defaultChains,
            options: {
              flags: {
                failConnect: true,
              },
              mnemonic: defaultMnemonic,
              network: 1,
            },
          }),
        ],
      },
    })

    await actHook(async () => {
      const state = result.current[0]
      const connect = result.current[1]
      const mockConnector = state.connectors[0]
      const res = await connect(mockConnector)
      if (!res) throw Error('Something went wrong')
      expect((<Error>res).message).toEqual('User rejected request')
    })

    const state = result.current[0]
    expect(state.connected).toEqual(false)
    expect(state.error?.message).toEqual('User rejected request')
  })
})
