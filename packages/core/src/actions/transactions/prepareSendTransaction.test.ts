import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { BigNumber } from 'ethers'

import { setupClient } from '../../../test'
import * as fetchEnsAddress from '../ens/fetchEnsAddress'
import { getProvider } from '../providers'
import { prepareSendTransaction } from './prepareSendTransaction'

describe('prepareSendTransaction', () => {
  beforeEach(() => {
    setupClient()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('derives the gas limit & ens address', async () => {
    const provider = getProvider()
    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(provider, 'estimateGas')

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
    const provider = getProvider()
    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(provider, 'estimateGas')

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
    const provider = getProvider()
    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(provider, 'estimateGas')

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
    const provider = getProvider()
    const fetchEnsAddressSpy = vi.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = vi.spyOn(provider, 'estimateGas')

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
