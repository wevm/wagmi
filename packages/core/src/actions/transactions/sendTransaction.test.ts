import { formatUnits, parseEther } from 'ethers/lib/utils'

import { getSigners, setupWagmiClient } from '../../../test'
import { connect, fetchBalance } from '../accounts'
import { sendTransaction } from './sendTransaction'

describe('sendTransaction', () => {
  it('throws', async () => {
    setupWagmiClient()
    await expect(
      sendTransaction({
        request: {},
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
  })

  it('works', async () => {
    const client = setupWagmiClient()
    await connect({ connector: client.connectors[0] })
    const fromAddress = client.data?.account
    if (!fromAddress) throw new Error('Not connected')

    const signers = getSigners()
    const to = signers[1]
    const toAddress = await to.getAddress()

    const fromBalance = await fetchBalance({ addressOrName: fromAddress })
    const toBalance = await fetchBalance({ addressOrName: toAddress })
    const amount = parseEther('10')

    const result = await sendTransaction({
      request: {
        from: fromAddress,
        to: toAddress,
        value: amount,
      },
    })
    expect(result.hash).toBeDefined()
    const receipt = await result.wait()

    const fromBalanceAfter = await fetchBalance({ addressOrName: fromAddress })
    expect(formatUnits(fromBalanceAfter.value)).toEqual(
      formatUnits(
        fromBalance.value
          .sub(amount)
          .sub(receipt.gasUsed.mul(receipt.effectiveGasPrice)),
      ),
    )
    const toBalanceAfter = await fetchBalance({ addressOrName: toAddress })
    expect(toBalanceAfter.value).toEqual(toBalance.value.add(amount))
  })
})
