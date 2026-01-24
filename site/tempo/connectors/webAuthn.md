# `webAuthn`

Connector for a WebAuthn EOA.

## Usage

```ts [wagmi.config.ts]
import { createConfig, http } from 'wagmi'
import { tempoTestnet } from 'wagmi/chains'
import { KeyManager, webAuthn } from 'wagmi/tempo' // [!code focus]

export const config = createConfig({
  connectors: [
    webAuthn({ // [!code focus]
      keyManager: KeyManager.localStorage(), // [!code focus]
    }), // [!code focus]
  ],
  chains: [tempoTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [tempoTestnet.id]: http(),
  },
})
```

:::warning
The `KeyManager.localStorage()` implementation is not recommended for production use as it stores public keys on the client device, meaning it cannot be re-extracted when the user's storage is cleared or if the user is on another device. 

For production, you should opt for a remote key manager such as [`KeyManager.http`](/tempo/keyManagers/http).
:::

## Parameters

### keyManager

- **Type:** `KeyManager`

Public key manager that handles credential storage and retrieval. This is required for managing WebAuthn credentials.

The `KeyManager` interface provides:
- `getChallenge()`: Optional function to fetch a challenge for registration
- `getPublicKey(parameters)`: Function to retrieve the public key for a credential
- `setPublicKey(parameters)`: Function to store the public key for a credential

See [`KeyManager`](/tempo/keyManagers/) for built-in implementations.

### createOptions (optional)

Options for WebAuthn registration.

#### createOptions.createFn

- **Type:** `(options?: CredentialCreationOptions | undefined) => Promise<Credential | null>`
- **Default:** `window.navigator.credentials.create`

Credential creation function. Useful for environments that do not support
the WebAuthn API natively (i.e. React Native or testing environments).

#### createOptions.label

- **Type:** `string`

Label associated with the WebAuthn registration.

#### createOptions.timeout

- **Type:** `number`

A numerical hint, in milliseconds, which indicates the time the calling web app is willing to wait for the creation operation to complete.

#### createOptions.userId

- **Type:** `Bytes.Bytes`

User ID associated with the WebAuthn registration.

### getOptions (optional)

Options for WebAuthn authentication.

#### getOptions.getFn

- **Type:** `(options?: CredentialRequestOptions) => Promise<Credential | null>`
- **Default:** `window.navigator.credentials.get`

Credential request function. Useful for environments that do not support the WebAuthn API natively (i.e. React Native or testing environments).

### rpId (optional)

- **Type:** `string`

The default RP ID to use for WebAuthn operations. Can be overridden by `createOptions.rpId` or `getOptions.rpId`.
