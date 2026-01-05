# Overview

WebAuthn-based accounts in Tempo require the public key to be attached to transactions and other protocol features. 
However, **it is not possible to extract a public key from a WebAuthn credential after its registration**.

To solve this, we maintain a `credentialId → publicKey` mapping that stores the public key when the credential is first created. 

Key Managers are responsible for managing this mapping, allowing users to access their accounts from any device without losing their public key.

- [**`http`**](/tempo/keyManagers/http) Manage public key registrations remotely on a server
- [**`localStorage`**](/tempo/keyManagers/localStorage) Manage public key registrations locally on the client device
