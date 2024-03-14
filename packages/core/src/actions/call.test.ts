import { accounts, address, config } from '@wagmi/test'
import { parseEther, parseGwei } from 'viem'
import { expect, test } from 'vitest'

import { call } from './call.js'

const name4bytes = '0x06fdde03'
const mint4bytes = '0x1249c58b'
const mintWithParams4bytes = '0xa0712d68'
const fourTwenty =
  '00000000000000000000000000000000000000000000000000000000000001a4'

const account = accounts[0]

test('default', async () => {
  await expect(
    call(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
    }),
  ).resolves.toMatchInlineSnapshot(`
  {
    "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
  }
  `)
})

test('zero data', async () => {
  await expect(
    call(config, {
      account,
      data: mint4bytes,
      to: address.wagmiMintExample,
    }),
  ).resolves.toMatchInlineSnapshot(`
  {
    "data": undefined,
  }
  `)
})

test('parameters: blockNumber', async () => {
  await expect(
    call(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      blockNumber: 16280770n,
    }),
  ).resolves.toMatchInlineSnapshot(`
  {
    "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
  }
  `)
})

test('nonce too low', async () => {
  await expect(
    call(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      nonce: 0,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Nonce provided for the transaction is lower than the current nonce of the account.
    Try increasing the nonce or find the latest nonce with \`getTransactionCount\`.

    Raw Call Arguments:
      from:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      to:     0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2
      data:   0x06fdde03
      nonce:  0

    Details: nonce too low
    Version: viem@2.8.4"
  `)
})

test('insufficient funds', async () => {
  await expect(
    call(config, {
      account,
      to: accounts[1],
      value: parseEther('100000'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.

    This error could arise when the account does not have enough funds to:
     - pay for the total gas fee,
     - pay for the value to send.
     
    The cost of the transaction is calculated as \`gas * gas fee + value\`, where:
     - \`gas\` is the amount of gas needed for transaction to execute,
     - \`gas fee\` is the gas fee,
     - \`value\` is the amount of ether to send to the recipient.
     
    Raw Call Arguments:
      from:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      to:     0x70997970c51812dc3a010c7d01b50e0d17dc79c8
      value:  100000 ETH

    Details: Insufficient funds for gas * price + value
    Version: viem@2.8.4"
  `)
})

test('maxFeePerGas less than maxPriorityFeePerGas', async () => {
  await expect(
    call(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      maxFeePerGas: parseGwei('20'),
      maxPriorityFeePerGas: parseGwei('22'),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "The provided tip (\`maxPriorityFeePerGas\` = 22 gwei) cannot be higher than the fee cap (\`maxFeePerGas\` = 20 gwei).

    Raw Call Arguments:
      from:                  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      to:                    0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2
      data:                  0x06fdde03
      maxFeePerGas:          20 gwei
      maxPriorityFeePerGas:  22 gwei

    Version: viem@2.8.4"
  `)
})

test('contract revert (contract error)', async () => {
  await expect(
    call(config, {
      account,
      data: `${mintWithParams4bytes}${fourTwenty}`,
      to: address.wagmiMintExample,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Execution reverted with reason: revert: Token ID is taken.

    Raw Call Arguments:
      from:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      to:    0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2
      data:  0xa0712d6800000000000000000000000000000000000000000000000000000000000001a4

    Details: execution reverted: revert: Token ID is taken
    Version: viem@2.8.4"
  `)
})

test('contract revert (insufficient params)', async () => {
  await expect(
    call(config, {
      account,
      data: mintWithParams4bytes,
      to: address.wagmiMintExample,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Execution reverted for an unknown reason.

    Raw Call Arguments:
      from:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      to:    0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2
      data:  0xa0712d68

    Details: execution reverted
    Version: viem@2.8.4"
  `)
})
