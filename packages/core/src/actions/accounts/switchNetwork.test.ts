import { setupWagmiClient } from '../../../test'
import { wagmiClient } from '../../client'
import { connect } from './connect'
import { getNetwork } from './getNetwork'
import { switchNetwork } from './switchNetwork'

describe('switchNetwork', () => {
  it('switches network', async () => {
    setupWagmiClient()
    await connect(wagmiClient.connectors[0])
    const network1 = getNetwork()
    await switchNetwork({ chainId: 69 })
    const network2 = getNetwork()
    expect(network1.chain?.id !== network2.chain?.id).toBeTruthy()
  })

  it('switches network to same network', async () => {
    setupWagmiClient()
    await connect(wagmiClient.connectors[0])
    const network1 = getNetwork()
    await switchNetwork({ chainId: 1 })
    const network2 = getNetwork()
    expect(network1.chain?.id === network2.chain?.id).toBeTruthy()
  })
})
