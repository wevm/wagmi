import { ethers, setupWagmiClient } from '../../../test'
import { connect } from '../accounts'
import { sendTransaction } from './sendTransaction'
import { waitForTransaction } from './waitForTransaction'

describe('waitForTransaction', () => {
  it('throws', async () => {
    try {
      await waitForTransaction({})
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`[Error: hash or wait is required]`)
    }
  })

  it('uses hash', async () => {
    const signers = await ethers.getSigners()
    const from = signers[0]
    const to = signers[1]

    const client = await setupWagmiClient()
    await connect(client.connectors[0])

    const result = await sendTransaction({
      request: {
        from: from.address,
        to: to.address,
        value: ethers.utils.parseEther('10'),
      },
    })
    const receipt = await waitForTransaction({ hash: result.hash })
    expect(receipt).toMatchInlineSnapshot(`
      {
        "blockHash": "0xbba50bb202aa573cdef8f44ce9e061f9ec2fcb650c270efa6ea8bec905f6823c",
        "blockNumber": 14297677,
        "byzantium": true,
        "confirmations": 1,
        "contractAddress": null,
        "cumulativeGasUsed": {
          "hex": "0x5208",
          "type": "BigNumber",
        },
        "effectiveGasPrice": {
          "hex": "0x11ab6b919f",
          "type": "BigNumber",
        },
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "gasUsed": {
          "hex": "0x5208",
          "type": "BigNumber",
        },
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": 1,
        "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "transactionHash": "0x25333b01db0d6fb90a923a077b28a756f327c2d89192e154425fdf01c6a31c30",
        "transactionIndex": 0,
        "type": 2,
      }
    `)
  })

  it('uses wait', async () => {
    const signers = await ethers.getSigners()
    const from = signers[0]
    const to = signers[1]

    const client = await setupWagmiClient()
    await connect(client.connectors[0])

    const result = await sendTransaction({
      request: {
        from: from.address,
        to: to.address,
        value: ethers.utils.parseEther('10'),
      },
    })
    const receipt = await waitForTransaction({ wait: result.wait })
    expect(receipt).toMatchInlineSnapshot(`
      {
        "blockHash": "0xc276f862fab402d5421311ed983b467e49dbf7708562a50c0d0da5dbc093c54c",
        "blockNumber": 14297678,
        "byzantium": true,
        "confirmations": 1,
        "contractAddress": null,
        "cumulativeGasUsed": {
          "hex": "0x5208",
          "type": "BigNumber",
        },
        "effectiveGasPrice": {
          "hex": "0x0f7e397347",
          "type": "BigNumber",
        },
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "gasUsed": {
          "hex": "0x5208",
          "type": "BigNumber",
        },
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": 1,
        "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "transactionHash": "0xc5130ce6bc4885171eb6b502b7bc25ff8c280e178fc23c0420bef8417317a7fa",
        "transactionIndex": 0,
        "type": 2,
      }
    `)
  })
})
