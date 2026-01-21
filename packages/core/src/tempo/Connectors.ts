import * as Address from 'ox/Address'
import type * as Hex from 'ox/Hex'
import * as PublicKey from 'ox/PublicKey'
import { KeyAuthorization, SignatureEnvelope } from 'ox/tempo'
import {
  createClient,
  defineChain,
  type EIP1193Provider,
  getAddress,
  SwitchChainError,
} from 'viem'
import {
  generatePrivateKey,
  type LocalAccount,
  privateKeyToAccount,
} from 'viem/accounts'
import {
  Account,
  WebAuthnP256,
  WebCryptoP256,
  walletNamespaceCompat,
} from 'viem/tempo'
import { createConnector } from '../connectors/createConnector.js'
import { ChainNotConfiguredError } from '../errors/config.js'
import type { OneOf } from '../types/utils.js'
import type * as KeyManager from './KeyManager.js'

/** @deprecated use `webAuthn.Parameters` instead */
export type WebAuthnParameters = webAuthn.Parameters

webAuthn.type = 'webAuthn' as const

/**
 * Connector for a WebAuthn EOA.
 */
export function webAuthn(options: webAuthn.Parameters) {
  let account: Account.RootAccount | undefined
  let accessKey: Account.AccessKeyAccount | undefined

  const defaultAccessKeyOptions = {
    expiry: Math.floor(
      (Date.now() + 24 * 60 * 60 * 1000) / 1000, // one day
    ),
    strict: false,
  }
  const accessKeyOptions = (() => {
    if (typeof options.grantAccessKey === 'object')
      return { ...defaultAccessKeyOptions, ...options.grantAccessKey }
    if (options.grantAccessKey === true) return defaultAccessKeyOptions
    return undefined
  })()

  type Properties = {
    // TODO(v3): Make `withCapabilities: true` default behavior
    connect<withCapabilities extends boolean = false>(parameters: {
      chainId?: number | undefined
      capabilities?:
        | OneOf<
            | {
                label?: string | undefined
                type: 'sign-up'
              }
            | {
                selectAccount?: boolean | undefined
                type: 'sign-in'
              }
            | {
                type?: undefined
              }
          >
        | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }): Promise<{ accounts: readonly Address.Address[]; chainId: number }>
  }
  type Provider = Pick<EIP1193Provider, 'request'>
  type StorageItem = {
    [
      key: `pendingKeyAuthorization:${string}`
    ]: KeyAuthorization.KeyAuthorization
    'webAuthn.activeCredential': WebAuthnP256.P256Credential
    'webAuthn.lastActiveCredential': WebAuthnP256.P256Credential
  }

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'webAuthn',
    name: 'EOA (WebAuthn)',
    type: 'webAuthn',
    async setup() {
      const credential = await config.storage?.getItem(
        'webAuthn.activeCredential',
      )
      if (!credential) return
      account = Account.fromWebAuthnP256(credential, {
        rpId: options.getOptions?.rpId ?? options.rpId,
      })
    },
    async connect(parameters = {}) {
      const capabilities =
        'capabilities' in parameters ? (parameters.capabilities ?? {}) : {}

      if (
        accessKeyOptions?.strict &&
        accessKeyOptions.expiry &&
        accessKeyOptions.expiry < Date.now() / 1000
      )
        throw new Error(
          `\`grantAccessKey.expiry = ${accessKeyOptions.expiry}\` is in the past (${new Date(accessKeyOptions.expiry * 1000).toLocaleString()}). Please provide a valid expiry.`,
        )

      // We are going to need to find:
      // - a WebAuthn `credential` to instantiate an account
      // - optionally, a `keyPair` to use as the access key for the account
      // - optionally, a signed `keyAuthorization` to provision the access key
      const { credential, keyAuthorization, keyPair } = await (async () => {
        // If the connection type is of "sign-up", we are going to create a new credential
        // and provision an access key (if needed).
        if (capabilities.type === 'sign-up') {
          // Create credential (sign up)
          const createOptions_remote = await options.keyManager.getChallenge?.()
          const label =
            capabilities.label ??
            options.createOptions?.label ??
            new Date().toISOString()
          const rpId =
            createOptions_remote?.rp?.id ??
            options.createOptions?.rpId ??
            options.rpId
          const credential = await WebAuthnP256.createCredential({
            ...(options.createOptions ?? {}),
            label,
            rpId,
            ...(createOptions_remote ?? {}),
          })
          await options.keyManager.setPublicKey({
            credential: credential.raw,
            publicKey: credential.publicKey,
          })

          // Get key pair (access key) to use for the account.
          const keyPair = await (async () => {
            if (!accessKeyOptions) return undefined
            return await WebCryptoP256.createKeyPair()
          })()

          return { credential, keyPair }
        }

        // If we are not selecting an account, we will check if an active credential is present in
        // storage and if so, we will use it to instantiate an account.
        if (!capabilities.selectAccount) {
          const credential = (await config.storage?.getItem(
            'webAuthn.activeCredential',
          )) as WebAuthnP256.getCredential.ReturnValue | undefined

          if (credential) {
            // Get key pair (access key) to use for the account.
            const keyPair = await (async () => {
              if (!accessKeyOptions) return undefined
              const address = Address.fromPublicKey(
                PublicKey.fromHex(credential.publicKey),
              )
              return await idb.get(`accessKey:${address}`)
            })()

            // If the access key provisioning is not in strict mode, return the credential and key pair (if exists).
            if (!accessKeyOptions?.strict) return { credential, keyPair }

            // If a key pair is found, return the credential and key pair.
            if (keyPair) return { credential, keyPair }

            // If we are reconnecting, throw an error if not found.
            if (parameters.isReconnecting)
              throw new Error('credential not found.')

            // Otherwise, we want to continue to sign up or register against new key pair.
          }
        }

        // Discover credential
        {
          // Get key pair (access key) to use for the account.
          const keyPair = await (async () => {
            if (!accessKeyOptions) return undefined
            return await WebCryptoP256.createKeyPair()
          })()

          // If we are provisioning an access key, we will need to sign a key authorization.
          // We will need the hash (digest) to sign, and the address of the access key to construct the key authorization.
          const { hash, keyAuthorization_unsigned } = await (async () => {
            if (!keyPair)
              return { accessKeyAddress: undefined, hash: undefined }
            const accessKeyAddress = Address.fromPublicKey(keyPair.publicKey)
            const keyAuthorization_unsigned = KeyAuthorization.from({
              ...accessKeyOptions,
              address: accessKeyAddress,
              type: 'p256',
            })
            const hash = KeyAuthorization.getSignPayload(
              keyAuthorization_unsigned,
            )
            return { keyAuthorization_unsigned, hash }
          })()

          // If no active credential, we will attempt to load the last active credential from storage.
          const lastActiveCredential = !capabilities.selectAccount
            ? await config.storage?.getItem('webAuthn.lastActiveCredential')
            : undefined
          const credential = await WebAuthnP256.getCredential({
            ...(options.getOptions ?? {}),
            credentialId: lastActiveCredential?.id,
            async getPublicKey(credential) {
              const publicKey = await options.keyManager.getPublicKey({
                credential,
              })
              if (!publicKey) throw new Error('publicKey not found.')
              return publicKey
            },
            hash,
            rpId: options.getOptions?.rpId ?? options.rpId,
          })

          const keyAuthorization = keyAuthorization_unsigned
            ? KeyAuthorization.from({
                ...keyAuthorization_unsigned,
                signature: SignatureEnvelope.from({
                  metadata: credential.metadata,
                  signature: credential.signature,
                  publicKey: PublicKey.fromHex(credential.publicKey),
                  type: 'webAuthn',
                }),
              })
            : undefined

          return { credential, keyAuthorization, keyPair }
        }
      })()

      config.storage?.setItem(
        'webAuthn.lastActiveCredential',
        normalizeValue(credential),
      )
      config.storage?.setItem(
        'webAuthn.activeCredential',
        normalizeValue(credential),
      )

      account = Account.fromWebAuthnP256(credential, {
        rpId: options.getOptions?.rpId ?? options.rpId,
      })

      if (keyPair) {
        accessKey = Account.fromWebCryptoP256(keyPair, {
          access: account,
        })

        // If we are reconnecting, check if the access key is expired.
        if (parameters.isReconnecting) {
          if (
            'keyAuthorization' in keyPair &&
            keyPair.keyAuthorization.expiry &&
            keyPair.keyAuthorization.expiry < Date.now() / 1000
          ) {
            // remove any pending key authorizations from storage.
            await config?.storage?.removeItem(
              `pendingKeyAuthorization:${account.address.toLowerCase()}`,
            )

            const message = `Access key expired (on ${new Date(keyPair.keyAuthorization.expiry * 1000).toLocaleString()}).`
            accessKey = undefined

            // if in strict mode, disconnect and throw an error.
            if (accessKeyOptions?.strict) {
              await this.disconnect()
              throw new Error(message)
            }
            // otherwise, fall back to the root account.
            // biome-ignore lint/suspicious/noConsole: notify
            console.warn(`${message} Falling back to passkey.`)
          }
        }
        // If we are not reconnecting, orchestrate the provisioning of the access key.
        else {
          const keyAuth =
            keyAuthorization ??
            (await account.signKeyAuthorization(accessKey, accessKeyOptions))

          await config?.storage?.setItem(
            `pendingKeyAuthorization:${account.address.toLowerCase()}`,
            keyAuth,
          )
          await idb.set(`accessKey:${account.address.toLowerCase()}`, {
            ...keyPair,
            keyAuthorization: keyAuth,
          })
        }
        // If we are granting an access key and it is in strict mode, throw an error if the access key is not provisioned.
      } else if (accessKeyOptions?.strict) {
        await config.storage?.removeItem('webAuthn.activeCredential')
        throw new Error('access key not found')
      }

      const address = getAddress(account.address)

      const chainId = parameters.chainId ?? config.chains[0]?.id
      if (!chainId) throw new ChainNotConfiguredError()

      return {
        accounts: (parameters.withCapabilities
          ? [{ address }]
          : [address]) as never,
        chainId,
      }
    },
    async disconnect() {
      await config.storage?.removeItem('webAuthn.activeCredential')
      config.emitter.emit('disconnect')
      account = undefined
    },
    async getAccounts() {
      if (!account) return []
      return [getAddress(account.address)]
    },
    async getChainId() {
      return config.chains[0]?.id!
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: notify
        console.error(
          'Connector.webAuthn: Failed to check authorization',
          error,
        )
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())
      return chain
    },
    onAccountsChanged() {},
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect() {
      config.emitter.emit('disconnect')
      account = undefined
    },
    async getClient({ chainId } = {}) {
      const chain =
        config.chains.find((x) => x.id === chainId) ?? config.chains[0]
      if (!chain) throw new ChainNotConfiguredError()

      const transports = config.transports
      if (!transports) throw new ChainNotConfiguredError()

      const transport = transports[chain.id]
      if (!transport) throw new ChainNotConfiguredError()

      const targetAccount = await (async () => {
        if (!accessKey) return account
        if (!account) throw new Error('account not found.')

        const item = await idb.get(`accessKey:${account.address.toLowerCase()}`)
        if (
          item?.keyAuthorization.expiry &&
          item.keyAuthorization.expiry < Date.now() / 1000
        ) {
          // remove any pending key authorizations from storage.
          await config?.storage?.removeItem(
            `pendingKeyAuthorization:${account.address.toLowerCase()}`,
          )

          const message = `Access key expired (on ${new Date(item.keyAuthorization.expiry * 1000).toLocaleString()}).`

          // if in strict mode, disconnect and throw an error.
          if (accessKeyOptions?.strict) {
            await this.disconnect()
            throw new Error(message)
          }

          // otherwise, fall back to the root account.
          // biome-ignore lint/suspicious/noConsole: notify
          console.warn(`${message} Falling back to passkey.`)
          return account
        }
        return accessKey
      })()
      if (!targetAccount) throw new Error('account not found.')

      const targetChain = defineChain({
        ...chain,
        prepareTransactionRequest: [
          async (args, { phase }) => {
            const keyAuthorization = await (async () => {
              {
                const keyAuthorization = (
                  args as {
                    keyAuthorization?:
                      | KeyAuthorization.KeyAuthorization
                      | undefined
                  }
                ).keyAuthorization
                if (keyAuthorization) return keyAuthorization
              }

              const keyAuthorization = await config.storage?.getItem(
                `pendingKeyAuthorization:${targetAccount?.address.toLowerCase()}`,
              )
              await config.storage?.removeItem(
                `pendingKeyAuthorization:${targetAccount?.address.toLowerCase()}`,
              )
              return keyAuthorization
            })()

            const [prepareTransactionRequestFn, options] = (() => {
              if (!chain.prepareTransactionRequest)
                return [undefined, undefined]
              if (typeof chain.prepareTransactionRequest === 'function')
                return [chain.prepareTransactionRequest, undefined]
              return chain.prepareTransactionRequest
            })()

            const request = await (async () => {
              if (!prepareTransactionRequestFn) return {}
              if (!options || options?.runAt?.includes(phase))
                return await prepareTransactionRequestFn(args, { phase })
              return {}
            })()

            return {
              ...args,
              ...request,
              keyAuthorization,
            }
          },
          {
            runAt: [
              'afterFillParameters',
              'beforeFillParameters',
              'beforeFillTransaction',
            ],
          },
        ],
      })

      return createClient({
        account: targetAccount,
        chain: targetChain,
        transport: walletNamespaceCompat(transport, {
          account: targetAccount,
        }),
      })
    },
    async getProvider({ chainId } = {}) {
      const { request } = await this.getClient!({ chainId })
      return { request }
    },
  }))
}

export namespace webAuthn {
  export type Parameters = {
    /** Options for WebAuthn registration. */
    createOptions?:
      | Pick<
          WebAuthnP256.createCredential.Parameters,
          'createFn' | 'label' | 'rpId' | 'userId' | 'timeout'
        >
      | undefined
    /** Options for WebAuthn authentication. */
    getOptions?:
      | Pick<WebAuthnP256.getCredential.Parameters, 'getFn' | 'rpId'>
      | undefined
    /**
     * Whether or not to grant an access key upon connection, and optionally, expiry + limits to assign to the key.
     */
    grantAccessKey?:
      | boolean
      | (Pick<KeyAuthorization.KeyAuthorization, 'expiry' | 'limits'> & {
          /** Whether or not to throw an error and disconnect if the access key is not provisioned or is expired. */
          strict?: boolean | undefined
        })
    /** Public key manager. */
    keyManager: KeyManager.KeyManager
    /** The RP ID to use for WebAuthn. */
    rpId?: string | undefined
  }
}

/**
 * Normalizes a value into a structured-clone compatible format.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
 */
function normalizeValue<type>(value: type): type {
  if (Array.isArray(value)) return value.map(normalizeValue) as never
  if (typeof value === 'function') return undefined as never
  if (typeof value !== 'object' || value === null) return value
  if (Object.getPrototypeOf(value) !== Object.prototype)
    try {
      return structuredClone(value)
    } catch {
      return undefined as never
    }

  const normalized: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(value)) normalized[k] = normalizeValue(v)
  return normalized as never
}

// Based on `idb-keyval`
// https://github.com/jakearchibald/idb-keyval
let defaultGetStoreFunc:
  | (<type>(
      txMode: IDBTransactionMode,
      callback: (store: IDBObjectStore) => type | PromiseLike<type>,
    ) => Promise<type>)
  | undefined

const idb = {
  /**
   * Get a value by its key.
   *
   * @param key
   * @param customStore Method to get a custom store. Use with caution (see the docs).
   */
  get<type = any>(key: IDBValidKey): Promise<type | undefined> {
    return this.defaultGetStore()('readonly', (store) =>
      this.promisifyRequest(store.get(key)),
    )
  },
  /**
   * Set a value with a key.
   *
   * @param key
   * @param value
   * @param customStore Method to get a custom store. Use with caution (see the docs).
   */
  set(key: IDBValidKey, value: any): Promise<void> {
    return this.defaultGetStore()('readwrite', (store) => {
      store.put(value, key)
      return this.promisifyRequest(store.transaction)
    })
  },
  defaultGetStore() {
    if (!defaultGetStoreFunc)
      defaultGetStoreFunc = this.createStore('keyval-store', 'keyval')
    return defaultGetStoreFunc
  },
  createStore(
    dbName: string,
    storeName: string,
  ): NonNullable<typeof defaultGetStoreFunc> {
    let dbp: Promise<IDBDatabase> | undefined

    const getDB = () => {
      if (dbp) return dbp
      const request = indexedDB.open(dbName)
      request.onupgradeneeded = () =>
        request.result.createObjectStore(storeName)
      dbp = this.promisifyRequest(request)

      dbp.then(
        (db) => {
          // It seems like Safari sometimes likes to just close the connection.
          // It's supposed to fire this event when that happens. Let's hope it does!
          db.onclose = () => {
            dbp = undefined
          }
        },
        () => {},
      )
      return dbp
    }

    return (txMode, callback) =>
      getDB().then((db) =>
        callback(db.transaction(storeName, txMode).objectStore(storeName)),
      )
  },
  promisifyRequest<type = undefined>(
    request: IDBRequest<type> | IDBTransaction,
  ): Promise<type> {
    return new Promise<type>((resolve, reject) => {
      // @ts-ignore - file size hacks
      request.oncomplete = request.onsuccess = () => resolve(request.result)
      // @ts-ignore - file size hacks
      request.onabort = request.onerror = () => reject(request.error)
    })
  },
}

/** @deprecated use `dangerous_secp256k1.Parameters` instead */
export type Dangerous_Secp256k1Parameters = dangerous_secp256k1.Parameters

dangerous_secp256k1.type = 'dangerous_secp256k1' as const

/**
 * Connector for a Secp256k1 EOA.
 *
 * WARNING: NOT RECOMMENDED FOR PRODUCTION USAGE.
 * This connector stores private keys in clear text, and are bound to the session
 * length of the storage used.
 */
export function dangerous_secp256k1(
  options: dangerous_secp256k1.Parameters = {},
) {
  let account: LocalAccount | undefined

  type Properties = {
    // TODO(v3): Make `withCapabilities: true` default behavior
    connect<withCapabilities extends boolean = false>(parameters: {
      capabilities?: { type?: 'sign-up' | undefined } | undefined
      chainId?: number | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }): Promise<{
      accounts: readonly Address.Address[]
      chainId: number
    }>
  }
  type Provider = Pick<EIP1193Provider, 'request'>
  type StorageItem = {
    'secp256k1.activeAddress': Address.Address
    'secp256k1.lastActiveAddress': Address.Address
    [key: `secp256k1.${string}.privateKey`]: Hex.Hex
  }

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'secp256k1',
    name: 'EOA (Secp256k1)',
    type: 'secp256k1',
    async setup() {
      const address = await config.storage?.getItem('secp256k1.activeAddress')
      const privateKey = await config.storage?.getItem(
        `secp256k1.${address}.privateKey`,
      )
      if (privateKey) account = privateKeyToAccount(privateKey)
      else if (
        address &&
        options.account &&
        Address.isEqual(address, options.account.address)
      )
        account = options.account
    },
    async connect(parameters = {}) {
      const address = await (async () => {
        if (
          'capabilities' in parameters &&
          parameters.capabilities?.type === 'sign-up'
        ) {
          const privateKey = generatePrivateKey()
          const account = privateKeyToAccount(privateKey)
          const address = account.address
          await config.storage?.setItem(
            `secp256k1.${address}.privateKey`,
            privateKey,
          )
          await config.storage?.setItem('secp256k1.activeAddress', address)
          await config.storage?.setItem('secp256k1.lastActiveAddress', address)
          return address
        }

        const address = await config.storage?.getItem(
          'secp256k1.lastActiveAddress',
        )
        const privateKey = await config.storage?.getItem(
          `secp256k1.${address}.privateKey`,
        )

        if (privateKey) account = privateKeyToAccount(privateKey)
        else if (options.account) {
          account = options.account
          await config.storage?.setItem(
            'secp256k1.lastActiveAddress',
            account.address,
          )
        }

        if (!account) throw new Error('account not found.')

        await config.storage?.setItem(
          'secp256k1.activeAddress',
          account.address,
        )
        return account.address
      })()

      const chainId = parameters.chainId ?? config.chains[0]?.id
      if (!chainId) throw new ChainNotConfiguredError()

      return {
        accounts: (parameters.withCapabilities
          ? [{ address }]
          : [address]) as never,
        chainId,
      }
    },
    async disconnect() {
      await config.storage?.removeItem('secp256k1.activeAddress')
      account = undefined
    },
    async getAccounts() {
      if (!account) return []
      return [getAddress(account.address)]
    },
    async getChainId() {
      return config.chains[0]?.id!
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: notify
        console.error(
          'Connector.secp256k1: Failed to check authorization',
          error,
        )
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())
      return chain
    },
    onAccountsChanged() {},
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect() {
      config.emitter.emit('disconnect')
      account = undefined
    },
    async getClient({ chainId } = {}) {
      const chain =
        config.chains.find((x) => x.id === chainId) ?? config.chains[0]
      if (!chain) throw new ChainNotConfiguredError()

      const transports = config.transports
      if (!transports) throw new ChainNotConfiguredError()

      const transport = transports[chain.id]
      if (!transport) throw new ChainNotConfiguredError()

      if (!account) throw new Error('account not found.')

      return createClient({
        account,
        chain,
        transport: walletNamespaceCompat(transport, {
          account,
        }),
      })
    },
    async getProvider({ chainId } = {}) {
      const { request } = await this.getClient!({ chainId })
      return { request }
    },
  }))
}

export declare namespace dangerous_secp256k1 {
  export type Parameters = {
    account?: LocalAccount | undefined
  }
}
