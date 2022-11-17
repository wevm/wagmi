import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getSigners } from '../../../test'
import type { Signer } from '../../types'
import { MockConnector } from './connector'

describe('MockConnector', () => {
  let connector: MockConnector
  let signer: Signer
  beforeEach(() => {
    const signers = getSigners()
    signer = signers[0]!
    connector = new MockConnector({
      options: { signer },
    })
  })

  it('constructor', () => {
    expect(connector.name).toEqual('Mock')
    expect(connector.ready).toEqual(true)
  })

  describe('connect', () => {
    it('succeeds', async () => {
      const onChange = vi.fn()
      connector.on('change', onChange)

      expect(await connector.connect()).toMatchInlineSnapshot(`
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chain": {
            "id": 1,
            "unsupported": false,
          },
          "provider": "<MockProvider>",
        }
      `)
      expect(onChange).toBeCalledTimes(1)
      expect(await connector.isAuthorized()).toEqual(true)
    })

    it('fails', async () => {
      const connector = new MockConnector({
        options: {
          flags: { failConnect: true },
          signer,
        },
      })
      await expect(
        connector.connect(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })
  })

  it('disconnect', async () => {
    const onDisconnect = vi.fn()
    connector.on('disconnect', onDisconnect)

    await connector.connect()
    await connector.disconnect()
    expect(onDisconnect).toBeCalledTimes(1)
  })

  describe('getAccount', () => {
    it('succeeds', async () => {
      await connector.connect()
      expect(await connector.getAccount()).toMatchInlineSnapshot(
        `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`,
      )
    })

    it('fails', async () => {
      await expect(
        connector.getAccount(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Failed to get account"`)
    })
  })

  it('getChainId', async () => {
    expect(await connector.getChainId()).toEqual(1)
  })

  it('getProvider', async () => {
    expect(await connector.getProvider()).toMatchInlineSnapshot(
      `"<MockProvider>"`,
    )
  })

  it('getSigner', async () => {
    await connector.connect()
    expect(await connector.getSigner()).toMatchInlineSnapshot(`
      WalletSigner {
        "_isSigner": true,
        "_mnemonic": [Function],
        "_signingKey": [Function],
        "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "provider": "<Provider network={1} />",
      }
    `)
  })

  describe('isAuthorized', () => {
    it('true', async () => {
      await connector.connect()
      expect(await connector.isAuthorized()).toMatchInlineSnapshot(`true`)
    })

    it('false', async () => {
      expect(await connector.isAuthorized()).toMatchInlineSnapshot(`true`)
    })
  })

  describe('switchChain', () => {
    it('succeeds', async () => {
      const onChange = vi.fn()
      connector.on('change', onChange)

      expect(await connector.getChainId()).toEqual(1)
      await connector.connect()
      await connector.switchChain?.(4)
      expect(onChange).toBeCalledTimes(2)
      expect(await connector.getChainId()).toEqual(4)
    })

    it('fails', async () => {
      const connector = new MockConnector({
        options: {
          flags: { failSwitchChain: true },
          signer,
        },
      })
      await connector.connect()
      await expect(
        connector.switchChain?.(4),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })
  })

  it('watchAsset', async () => {
    await connector.connect()
    expect(
      await connector.watchAsset({
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        decimals: 18,
        symbol: 'UNI',
      }),
    ).toEqual(true)
  })
})
