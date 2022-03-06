import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { disconnect } from './disconnect'
import { switchNetwork } from './switchNetwork'
import { watchSigner } from './watchSigner'

describe('watchSigner', () => {
  it('listens to account changes', async () => {
    const client = await setupWagmiClient()

    let counter = 0
    watchSigner((data) => {
      if (counter === 0)
        expect(data).toMatchInlineSnapshot(
          `"<SignerWithAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266>"`,
        )
      else if (counter === 1) expect(data).toMatchInlineSnapshot(`undefined`)
      counter += 1
    })

    await connect(client.connectors[0])
    await disconnect()
  })

  it('listens to chain changes', async () => {
    const client = await setupWagmiClient()

    let counter = 0
    watchSigner((data) => {
      if (counter === 0)
        expect(data).toMatchInlineSnapshot(
          `"<SignerWithAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266>"`,
        )
      else if (counter === 1)
        expect(data).toMatchInlineSnapshot(
          `"<SignerWithAddress 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266>"`,
        )
      counter += 1
    })

    await connect(client.connectors[0])
    await switchNetwork({ chainId: 4 })
  })
})
