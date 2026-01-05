
import LucideServer from '~icons/lucide/server'
import LucideHardDrive from '~icons/lucide/hard-drive'
import * as Card from "../../../../../components/Card.tsx"

# Overview

WebAuthn-based accounts in Tempo require the public key to be attached to transactions and other protocol features. 
However, **it is not possible to extract a public key from a WebAuthn credential after its registration**.

To solve this, we maintain a `credentialId → publicKey` mapping that stores the public key when the credential is first created. 

Key Managers are responsible for managing this mapping, allowing users to access their accounts from any device without losing their public key.

<Card.Container>
  <Card.Link
    description="Manage public key registrations remotely on a server"
    href="/sdk/typescript/wagmi/keyManagers/http"
    icon={LucideServer}
    title="http"
  />
  <Card.Link
    description="Manage public key registrations locally on the client device"
    href="/sdk/typescript/wagmi/keyManagers/localStorage"
    icon={LucideHardDrive}
    title="localStorage"
  />
</Card.Container>