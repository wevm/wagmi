import { describe, expect, it } from 'vitest'

import { getSigners, renderHook } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { useAccount } from './useAccount'
import type { UseConnectArgs, UseConnectConfig } from './useConnect'
import { useConnect } from './useConnect'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

// const connectorFail = new MockConnector({
//   options: {
//     flags: { failConnect: true },
//     signer: getSigners()[0]!,
//   },
// })

function useConnectWithAccount(config: UseConnectArgs & UseConnectConfig = {}) {
  return {
    account: useAccount(),
    connect: useConnect(config),
  }
}

describe('useConnect', () => {
  describe('configuration', () => {
    describe('connector', () => {
      it('connects', async () => {
        const {
          result: { account, connect },
        } = renderHook(() => useConnectWithAccount({ connector }))

        console.log('isConnected before ', account().isConnected)
        await connect.connectAsync()
        console.log('isConnected after ', account().isConnected)

        expect(account().isConnected).toBeTruthy()

        console.log('connect ', connect)
        // await waitFor(() => expect(connect.isSuccess).toBeTruthy())
      })
    })
  })
})
