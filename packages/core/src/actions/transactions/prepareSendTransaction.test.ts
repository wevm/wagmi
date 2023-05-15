import { parseEther } from 'viem'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getWalletClients, setupConfig } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import * as fetchEnsAddress from '../ens/fetchEnsAddress'
import { getWalletClient } from '../viem'
import { prepareSendTransaction } from './prepareSendTransaction'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('prepareSendTransaction', () => {
  beforeEach(() => {
    setupConfig()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('derives the ens address', async () => {
    await connect({ connector })

    const walletClient = await getWalletClient()
    if (!walletClient) throw new Error('walletClient is required')

    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')

    const request = {
      to: 'moxey.eth',
      value: parseEther('0.01'), // 0.01 ETH
    }
    const preparedRequest = await prepareSendTransaction(request)

    expect(fetchEnsAddressSpy).toBeCalledWith({ name: 'moxey.eth' })
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "accessList": undefined,
        "account": undefined,
        "data": undefined,
        "gas": 21000n,
        "gasPrice": undefined,
        "maxFeePerGas": undefined,
        "maxPriorityFeePerGas": undefined,
        "mode": "prepared",
        "nonce": undefined,
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": 10000000000000000n,
      }
    `)
  })

  it('derives the request only if address is passed', async () => {
    await connect({ connector })

    const walletClient = await getWalletClient()
    if (!walletClient) throw new Error('walletClient is required')

    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')

    const request = {
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      value: parseEther('0.01'),
    }
    const preparedRequest = await prepareSendTransaction(request)

    expect(fetchEnsAddressSpy).toBeCalledTimes(0)
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "accessList": undefined,
        "account": undefined,
        "data": undefined,
        "gas": 21000n,
        "gasPrice": undefined,
        "maxFeePerGas": undefined,
        "maxPriorityFeePerGas": undefined,
        "mode": "prepared",
        "nonce": undefined,
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": 10000000000000000n,
      }
    `)
  })

  it('skips gas estimate when `gas` is nullish', async () => {
    await connect({ connector })

    const walletClient = await getWalletClient()
    if (!walletClient) throw new Error('walletClient is required')

    const request = {
      to: 'moxey.eth',
      value: parseEther('0.01'), // 0.01 ETH
      gas: null,
    }
    const preparedRequest = await prepareSendTransaction(request)

    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "accessList": undefined,
        "account": undefined,
        "data": undefined,
        "gas": undefined,
        "gasPrice": undefined,
        "maxFeePerGas": undefined,
        "maxPriorityFeePerGas": undefined,
        "mode": "prepared",
        "nonce": undefined,
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": 10000000000000000n,
      }
    `)
  })

  it('skips gas estimate when `gas` is populated', async () => {
    await connect({ connector })

    const walletClient = await getWalletClient()
    if (!walletClient) throw new Error('walletClient is required')

    const request = {
      to: 'moxey.eth',
      value: parseEther('0.01'), // 0.01 ETH
      gas: 69420n,
    }
    const preparedRequest = await prepareSendTransaction(request)

    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "accessList": undefined,
        "account": undefined,
        "data": undefined,
        "gas": 69420n,
        "gasPrice": undefined,
        "maxFeePerGas": undefined,
        "maxPriorityFeePerGas": undefined,
        "mode": "prepared",
        "nonce": undefined,
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": 10000000000000000n,
      }
    `)
  })

  describe('errors', () => {
    it('account is on different chain', async () => {
      await connect({ connector })

      const request = {
        to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        value: parseEther('0.01'),
      }
      await expect(() =>
        prepareSendTransaction({
          ...request,
          chainId: 69,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum\\"."`,
      )
    })

    it('fetchEnsAddress throws', async () => {
      await connect({ connector })

      vi.spyOn(fetchEnsAddress, 'fetchEnsAddress').mockRejectedValue(
        new Error('error'),
      )

      const request = {
        to: 'moxey.eth',
        value: parseEther('0.01'),
      }
      expect(() =>
        prepareSendTransaction(request),
      ).rejects.toThrowErrorMatchingInlineSnapshot('"error"')
    })
  })
})
