import { BigNumber } from 'ethers'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect, fetchSigner } from '../accounts'
import * as fetchEnsAddress from '../ens/fetchEnsAddress'
import { getProvider } from '../providers'
import { prepareSendTransaction } from './prepareSendTransaction'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('prepareSendTransaction', () => {
  beforeEach(() => {
    setupClient()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('derives the gas limit & ens address', async () => {
    await connect({ connector })

    const signer = await fetchSigner()
    if (!signer) throw new Error('signer is required')

    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(signer, 'estimateGas')

    const request = {
      to: 'moxey.eth',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const preparedRequest = await prepareSendTransaction({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledWith({ name: 'moxey.eth' })
    expect(estimateGasSpy).toBeCalledWith(request)
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "mode": "prepared",
        "request": {
          "gasLimit": {
            "hex": "0x5208",
            "type": "BigNumber",
          },
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": {
            "hex": "0x2386f26fc10000",
            "type": "BigNumber",
          },
        },
      }
    `)
  })

  it('derives the gas limit only if address is passed', async () => {
    await connect({ connector })

    const signer = await fetchSigner()
    if (!signer) throw new Error('signer is required')

    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(signer, 'estimateGas')

    const request = {
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const preparedRequest = await prepareSendTransaction({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledTimes(0)
    expect(estimateGasSpy).toBeCalledWith(request)
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "mode": "prepared",
        "request": {
          "gasLimit": {
            "hex": "0x5208",
            "type": "BigNumber",
          },
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": {
            "hex": "0x2386f26fc10000",
            "type": "BigNumber",
          },
        },
      }
    `)
  })

  it('derives the address only if gas limit is passed', async () => {
    await connect({ connector })

    const signer = await fetchSigner()
    if (!signer) throw new Error('signer is required')

    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(signer, 'estimateGas')

    const request = {
      gasLimit: BigNumber.from('1000000'),
      to: 'moxey.eth',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const preparedRequest = await prepareSendTransaction({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledWith({ name: 'moxey.eth' })
    expect(estimateGasSpy).toBeCalledTimes(0)
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "mode": "prepared",
        "request": {
          "gasLimit": {
            "hex": "0x0f4240",
            "type": "BigNumber",
          },
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": {
            "hex": "0x2386f26fc10000",
            "type": "BigNumber",
          },
        },
      }
    `)
  })

  it('returns the request if both gas limit & address is passed', async () => {
    await connect({ connector })

    const signer = await fetchSigner()
    if (!signer) throw new Error('signer is required')

    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(signer, 'estimateGas')

    const request = {
      gasLimit: BigNumber.from('1000000'),
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const preparedRequest = await prepareSendTransaction({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledTimes(0)
    expect(estimateGasSpy).toBeCalledTimes(0)
    expect(preparedRequest).toMatchInlineSnapshot(`
      {
        "mode": "prepared",
        "request": {
          "gasLimit": {
            "hex": "0x0f4240",
            "type": "BigNumber",
          },
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": {
            "hex": "0x2386f26fc10000",
            "type": "BigNumber",
          },
        },
      }
    `)
  })

  describe('errors', () => {
    it('signer is on different chain', async () => {
      await connect({ connector })

      const request = {
        gasLimit: BigNumber.from('1000000'),
        to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        value: BigNumber.from('10000000000000000'), // 0.01 ETH
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
        gasLimit: BigNumber.from('1000000'),
        to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        value: BigNumber.from('10000000000000000'), // 0.01 ETH
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
      vi.spyOn(fetchEnsAddress, 'fetchEnsAddress').mockRejectedValue(
        new Error('error'),
      )

      const request = {
        to: 'moxey.eth',
        value: BigNumber.from('10000000000000000'), // 0.01 ETH
      }
      expect(() =>
        prepareSendTransaction({
          request,
        }),
      ).rejects.toThrowError()
    })

    it('undefined `gasLimit` if estimateGas throws', async () => {
      const provider = getProvider()
      vi.spyOn(provider, 'estimateGas').mockRejectedValue(new Error('error'))

      const request = {
        to: 'moxey.eth',
        value: BigNumber.from('10000000000000000'), // 0.01 ETH
      }
      expect(() =>
        prepareSendTransaction({
          request,
        }),
      ).rejects.toThrowError()
    })
  })
})
