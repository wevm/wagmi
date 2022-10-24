import { describe, it } from 'vitest'

import { setupClient } from '../../../test'
// import { UseAccountConfig } from './useAccount'
// import { useConnect } from './useConnect'
// import { useDisconnect } from './useDisconnect'

// function useAccountWithConnectAndDisconnect(config: UseAccountConfig = {}) {
//   return {
//     account: useAccount(config),
//     connect: useConnect(),
//     disconnect: useDisconnect(),
//   }
// }

describe('useAccount', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      //
    })

    it('is not connected', async () => {
      const client = setupClient()
      console.log(client)
    })
  })

  describe('behavior', () => {
    it('updates on connect and disconnect', async () => {
      //
    })

    it('invokes callbacks on connect and disconnect', async () => {
      //
    })

    it('status lifecycle', async () => {
      const client = setupClient({ autoConnect: true })
      console.log(client)
    })
  })
})
