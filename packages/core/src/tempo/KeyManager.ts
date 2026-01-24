import type { WebAuthnP256 } from 'ox'
import * as Base64 from 'ox/Base64'
import type * as Hex from 'ox/Hex'
import * as Json from 'ox/Json'
import {
  type CreateStorageParameters,
  createStorage,
  type Storage,
} from '../createStorage.js'

export type KeyManager = {
  /** Function to fetch create options for WebAuthn. */
  getChallenge?:
    | (() => Promise<{
        challenge: Hex.Hex
        rp?: { id: string; name: string } | undefined
      }>)
    | undefined
  /** Function to fetch the public key for a credential. */
  getPublicKey: (parameters: {
    credential: WebAuthnP256.P256Credential['raw']
  }) => Promise<Hex.Hex>
  /** Function to set the public key for a credential. */
  setPublicKey: (parameters: {
    credential: WebAuthnP256.P256Credential['raw']
    publicKey: Hex.Hex
  }) => Promise<void>
}

/** Instantiates a key manager. */
export function from<manager extends KeyManager>(manager: manager): manager {
  return manager
}

/** Instantiates a key manager from a Storage instance. */
export function fromStorage(storage: Storage): KeyManager {
  return from({
    async getPublicKey(parameters) {
      const publicKey = await storage.getItem(parameters.credential.id)
      if (!publicKey) throw new Error('publicKey not found.')
      return publicKey as Hex.Hex
    },
    async setPublicKey(parameters) {
      await storage.setItem(parameters.credential.id, parameters.publicKey)
    },
  })
}

/**
 * Instantiates a key manager from a localStorage instance.
 *
 * WARNING: Do not use this in production.
 * This is because we are unable to extract a user's public key after the registration
 * process. If a user clears their storage, or visits the website on a different device,
 * they will not be able to access their account.
 *
 * Instead, we recommend to set up a remote store such as [`KeyManager.http`](#http) to register
 * public keys against their WebAuthn credential.
 *
 * @see {@link http}
 *
 * @deprecated
 */
export function localStorage(options: localStorage.Options = {}) {
  const { key = 'wagmi.keyManager' } = options
  const storage = createStorage({
    ...options,
    key,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  })
  return fromStorage(storage)
}

export namespace localStorage {
  export type Options = Omit<CreateStorageParameters, 'storage'>
}

/**
 * Instantiates a key manager that uses HTTP endpoints for credential management.
 *
 * @example
 * ```tsx
 * import { KeyManager } from '@wagmi/core/tempo'
 *
 * const keyManager = KeyManager.http('https://api.example.com')
 * ```
 *
 * @param url - The URL to use for the HTTP endpoints.
 * @param options - Configuration options for HTTP endpoints.
 * @returns A KeyManager instance that uses HTTP for credential operations.
 */
export function http(
  url:
    | string
    | {
        getChallenge?: string | Request | undefined
        getPublicKey?: string | Request | undefined
        setPublicKey?: string | Request | undefined
      },
  options: http.Options = {},
): KeyManager {
  const { fetch: fetchFn = globalThis.fetch } = options
  const { getChallenge, getPublicKey, setPublicKey } = (() => {
    const base = typeof url === 'string' ? url : ''
    const urls = typeof url === 'object' ? url : {}
    return {
      getChallenge: urls.getChallenge ?? `${base}/challenge`,
      getPublicKey: urls.getPublicKey ?? `${base}/:credentialId`,
      setPublicKey: urls.setPublicKey ?? `${base}/:credentialId`,
    }
  })()

  return from({
    async getChallenge() {
      const request =
        getChallenge instanceof Request
          ? getChallenge
          : new Request(getChallenge)

      const response = await fetchFn(request)

      if (!response.ok)
        throw new Error(`Failed to get create options: ${response.statusText}`)
      return await response.json()
    },

    async getPublicKey(parameters) {
      const request =
        getPublicKey instanceof Request
          ? getPublicKey
          : new Request(getPublicKey)

      const response = await fetchFn(
        new Request(
          request.url.replace(':credentialId', parameters.credential.id),
          request,
        ),
      )

      if (!response.ok)
        throw new Error(`Failed to get public key: ${response.statusText}`)
      const data = await response.json()
      return data.publicKey as Hex.Hex
    },

    async setPublicKey(parameters) {
      const request =
        setPublicKey instanceof Request
          ? setPublicKey
          : new Request(setPublicKey)

      const response = await fetchFn(
        new Request(
          request.url.replace(':credentialId', parameters.credential.id),
          request,
        ),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: Json.stringify({
            ...parameters,
            credential: serializeCredential(parameters.credential),
          }),
        },
      )

      if (!response.ok)
        throw new Error(`Failed to set public key: ${response.statusText}`)
    },
  })
}

export namespace http {
  export type Options = {
    /** Custom fetch function. @default `globalThis.fetch`. */
    fetch?: typeof fetch | undefined
  }
}

/**
 * Serializes a WebAuthn credential for JSON transmission.
 * @internal
 */
function serializeCredential(
  credential: WebAuthnP256.P256Credential['raw'],
): Record<string, unknown> {
  const response = credential.response
  return {
    ...credential,
    rawId: Base64.fromBytes(new Uint8Array(credential.rawId)),
    response: {
      clientDataJSON: Base64.fromBytes(new Uint8Array(response.clientDataJSON)),
      ...('attestationObject' in response && {
        attestationObject: Base64.fromBytes(
          new Uint8Array(response.attestationObject as ArrayBuffer),
        ),
      }),
      ...('getAuthenticatorData' in response &&
        typeof response.getAuthenticatorData === 'function' && {
          authenticatorData: Base64.fromBytes(
            new Uint8Array(
              response.getAuthenticatorData.call(response) as ArrayBuffer,
            ),
          ),
        }),
      ...('getPublicKey' in response &&
        typeof response.getPublicKey === 'function' && {
          publicKey: Base64.fromBytes(
            new Uint8Array(response.getPublicKey.call(response) as ArrayBuffer),
          ),
        }),
      ...('getPublicKeyAlgorithm' in response &&
        typeof response.getPublicKeyAlgorithm === 'function' && {
          publicKeyAlgorithm: response.getPublicKeyAlgorithm.call(response),
        }),
      ...('getTransports' in response &&
        typeof response.getTransports === 'function' && {
          transports: response.getTransports.call(response),
        }),
      ...('authenticatorData' in response && {
        authenticatorData: Base64.fromBytes(
          new Uint8Array(response.authenticatorData as ArrayBuffer),
        ),
      }),
      ...('signature' in response && {
        signature: Base64.fromBytes(
          new Uint8Array(response.signature as ArrayBuffer),
        ),
      }),
      ...('userHandle' in response && response.userHandle
        ? {
            userHandle: Base64.fromBytes(
              new Uint8Array(response.userHandle as ArrayBuffer),
            ),
          }
        : {}),
    },
  }
}
