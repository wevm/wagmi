import { parseEther } from 'ethers/lib/utils'

import { getSigners, setupWagmiClient } from '../../../test'
import { connect } from '../accounts'
import { sendTransaction } from './sendTransaction'
import { waitForTransaction } from './waitForTransaction'

describe('waitForTransaction', () => {
  it('throws', async () => {
    setupWagmiClient()
    setupWagmiClient()
    await expect(
      waitForTransaction({}),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"hash or wait is required"`)
  })

  it('uses hash', async () => {
    const client = setupWagmiClient()
    await connect(client.connectors[0])
    const fromAddress = client.data?.account
    if (!fromAddress) throw new Error('Not connected')

    const signers = getSigners()
    const to = signers[1]
    const toAddress = await to.getAddress()

    const result = await sendTransaction({
      request: {
        from: fromAddress,
        to: toAddress,
        value: parseEther('10'),
      },
    })
    expect(result.hash).toBeDefined()
    const receipt = await waitForTransaction({ hash: result.hash })
    expect(receipt.transactionHash).toEqual(result.hash)
  })

  it('uses wait', async () => {
    const client = setupWagmiClient()
    await connect(client.connectors[0])
    const fromAddress = client.data?.account
    if (!fromAddress) throw new Error('Not connected')

    const signers = getSigners()
    const to = signers[1]
    const toAddress = await to.getAddress()

    const result = await sendTransaction({
      request: {
        from: fromAddress,
        to: toAddress,
        value: parseEther('10'),
      },
    })
    // eslint-disable-next-line testing-library/await-async-utils
    expect(result.wait).toBeDefined()
    const receipt = await waitForTransaction({ wait: result.wait })
    expect(receipt.transactionHash).toEqual(result.hash)
  })
})
