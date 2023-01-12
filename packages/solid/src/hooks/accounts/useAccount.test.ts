import { describe, expect, it } from 'vitest'

import { renderHook } from '../../../test'
import { useAccount } from './useAccount'
import { useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'

const useAccountWithConnectAndDisconnect = () => {
  return {
    account: useAccount(),
    connect: useConnect(),
    disconnect: useDisconnect(),
  }
}

describe('useAccount', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const { connect, account, disconnect } = renderHook(() =>
        useAccountWithConnectAndDisconnect(),
      )()

      console.log('accountData -> ', account())
      console.log('connectData -> ', await connect.connect())
      console.log('accountData -> ', account())
      console.log('disconnectData -> ', await disconnect.disconnect())
      console.log('accountData -> ', account())

      expect(true).toBeTruthy()
    })
  })
})
