import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { afterEach, expect, test, vi } from 'vitest'

import { createConfig } from './createConfig.js'
import { webAuthn } from './exports/tempo.js'

const rootAddress = '0x1234567890123456789012345678901234567890'
const accessAddress = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
const publicKey: `0x${string}` = `0x${'11'.repeat(65)}`
const mocks = vi.hoisted(() => ({
  createCredential: vi.fn(),
  createKeyPair: vi.fn(),
  fromWebAuthnP256: vi.fn(),
  fromWebCryptoP256: vi.fn(),
  signKeyAuthorization: vi.fn(),
}))

vi.mock(import('viem/tempo'), async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    Account: {
      ...mod.Account,
      fromWebAuthnP256: mocks.fromWebAuthnP256,
      fromWebCryptoP256: mocks.fromWebCryptoP256,
    },
    WebAuthnP256: {
      ...mod.WebAuthnP256,
      createCredential: mocks.createCredential,
    },
    WebCryptoP256: {
      ...mod.WebCryptoP256,
      createKeyPair: mocks.createKeyPair,
    },
  }
})

function createIndexedDbMock() {
  return {
    open() {
      const values = new Map<IDBValidKey, unknown>()
      const transaction = {} as IDBTransaction
      const objectStore = {
        transaction,
        get(key: IDBValidKey) {
          const request = {} as IDBRequest<unknown>
          queueMicrotask(() => {
            Reflect.set(request, 'result', values.get(key))
            request.onsuccess?.(new Event('success') as Event)
          })
          return request
        },
        put(value: unknown, key: IDBValidKey) {
          values.set(key, value)
          queueMicrotask(() => {
            transaction.oncomplete?.(new Event('complete') as Event)
          })
        },
      } as IDBObjectStore
      const database = {
        createObjectStore() {
          return objectStore
        },
        transaction() {
          return { objectStore: () => objectStore } as unknown as IDBTransaction
        },
      } as unknown as IDBDatabase
      const request = { result: database } as unknown as IDBOpenDBRequest
      queueMicrotask(() => {
        request.onupgradeneeded?.(
          new Event('upgradeneeded') as IDBVersionChangeEvent,
        )
        request.onsuccess?.(new Event('success') as Event)
      })
      return request
    },
  } as unknown as IDBFactory
}

afterEach(() => {
  vi.restoreAllMocks()
  mocks.createCredential.mockReset()
  mocks.createKeyPair.mockReset()
  mocks.fromWebAuthnP256.mockReset()
  mocks.fromWebCryptoP256.mockReset()
  mocks.signKeyAuthorization.mockReset()
})

test('passes chainId when provisioning access key on sign-up', async () => {
  Object.defineProperty(globalThis, 'indexedDB', {
    configurable: true,
    value: createIndexedDbMock(),
  })

  mocks.signKeyAuthorization.mockImplementation(async (_accessKey, options) => {
    if (!options || typeof options !== 'object' || !('chainId' in options))
      throw new TypeError('Cannot convert undefined to a BigInt')
    return {
      address: accessAddress,
      chainId: options.chainId,
      expiry: 1,
      strict: false,
      type: 'p256',
    }
  })
  mocks.createCredential.mockResolvedValue({
    id: 'credential-id',
    metadata: {},
    publicKey,
    raw: { id: 'credential-id' },
  } as never)
  mocks.createKeyPair.mockResolvedValue({
    publicKey,
  } as never)
  mocks.fromWebAuthnP256.mockReturnValue({
    address: rootAddress,
    signKeyAuthorization: mocks.signKeyAuthorization,
  } as never)
  mocks.fromWebCryptoP256.mockReturnValue({
    address: accessAddress,
  } as never)

  const config = createConfig({
    chains: [mainnet],
    connectors: [],
    storage: null,
    transports: {
      [mainnet.id]: http(),
    },
  })
  const connector = config._internal.connectors.setup(
    webAuthn({
      grantAccessKey: true,
      keyManager: {
        async getPublicKey(): Promise<`0x${string}`> {
          return publicKey
        },
        async setPublicKey() {},
      },
      rpId: 'example.com',
    }),
  )

  const result = await connector.connect({
    capabilities: { type: 'sign-up', label: 'Test Account' },
  })

  expect(mocks.signKeyAuthorization).toHaveBeenCalledWith(
    expect.objectContaining({ address: accessAddress }),
    expect.objectContaining({ chainId: mainnet.id }),
  )
  expect(result.accounts).toEqual([rootAddress])
  expect(result.chainId).toBe(mainnet.id)
})
