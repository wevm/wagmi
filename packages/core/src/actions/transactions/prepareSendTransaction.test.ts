import { parseEther } from 'viem'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getWalletClients, setupClient } from '../../../test'
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
    setupClient()
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
    const preparedRequest = await prepareSendTransaction({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledWith({ name: 'moxey.eth' })
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "mode": "prepared",
        "request": {
          "gas": 21000n,
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": 10000000000000000n,
        },
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
    const preparedRequest = await prepareSendTransaction({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledTimes(0)
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "mode": "prepared",
        "request": {
          "gas": 21000n,
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": 10000000000000000n,
        },
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
          request,
          chainId: 69,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum\\"."`,
      )
    })

    it('chain not configured for connector', async () => {
      await connect({ connector, chainId: 69_420 })

      const request = {
        to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        value: parseEther('0.01'),
      }
      await expect(() =>
        prepareSendTransaction({
          request,
          chainId: 69_420,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Chain \\"69420\\" not configured for connector \\"mock\\"."',
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
        prepareSendTransaction({
          request,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot('"error"')
    })
  })
})
