import { ethers, setupWagmiClient } from '../../../test'
import { connect, fetchBalance } from '../accounts'
import { sendTransaction } from './sendTransaction'

describe('sendTransaction', () => {
  it('throws', async () => {
    try {
      await sendTransaction({
        request: {},
      })
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[ConnectorNotFoundError: Connector not found]`,
      )
    }
  })

  it('works', async () => {
    const signers = await ethers.getSigners()
    const from = signers[0]
    const to = signers[1]

    const client = await setupWagmiClient()
    await connect(client.connectors[0])

    const balanceBefore = await fetchBalance({ addressOrName: from.address })
    expect(balanceBefore).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "10000.0",
        "symbol": "ETH",
        "unit": "ether",
        "value": {
          "hex": "0x021e19e0c9bab2400000",
          "type": "BigNumber",
        },
      }
    `)

    const result = await sendTransaction({
      request: {
        from: from.address,
        to: to.address,
        value: ethers.utils.parseEther('10'),
      },
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "accessList": [],
        "blockHash": "0xbba50bb202aa573cdef8f44ce9e061f9ec2fcb650c270efa6ea8bec905f6823c",
        "blockNumber": 14297677,
        "chainId": 31337,
        "confirmations": 1,
        "creates": null,
        "data": "0x",
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "gasLimit": {
          "hex": "0x5209",
          "type": "BigNumber",
        },
        "gasPrice": {
          "hex": "0x11ab6b919f",
          "type": "BigNumber",
        },
        "hash": "0x25333b01db0d6fb90a923a077b28a756f327c2d89192e154425fdf01c6a31c30",
        "maxFeePerGas": {
          "hex": "0x231b3c593e",
          "type": "BigNumber",
        },
        "maxPriorityFeePerGas": {
          "hex": "0x3b9aca00",
          "type": "BigNumber",
        },
        "nonce": 148,
        "r": "0x8b6a0457a53c26fc260556244c70dffdc0eb8c9016cb276a47caf2053957a70f",
        "s": "0x41c261d6417cfede78f09ba97061fb8988d8ec64fd00920a64e67df8cfdc8588",
        "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "transactionIndex": 0,
        "type": 2,
        "v": 0,
        "value": {
          "hex": "0x8ac7230489e80000",
          "type": "BigNumber",
        },
        "wait": [Function],
      }
    `)

    const balanceFromAfter = await fetchBalance({ addressOrName: from.address })
    expect(balanceFromAfter).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "9989.998406301650421",
        "symbol": "ETH",
        "unit": "ether",
        "value": {
          "hex": "0x021d8f13fd4058568508",
          "type": "BigNumber",
        },
      }
    `)
    const balanceToAfter = await fetchBalance({ addressOrName: to.address })
    expect(balanceToAfter).toMatchInlineSnapshot(`
      {
        "decimals": 18,
        "formatted": "10010.0",
        "symbol": "ETH",
        "unit": "ether",
        "value": {
          "hex": "0x021ea4a7ecbf3c280000",
          "type": "BigNumber",
        },
      }
    `)
  })
})
