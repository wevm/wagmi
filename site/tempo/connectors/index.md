import LucideFingerprint from '~icons/lucide/fingerprint'
import LucideKeyRound from '~icons/lucide/key-round'
import * as Card from "../../../../../components/Card.tsx"

# Transports

<Card.Container>
  <Card.Link
    description="Connector for a WebAuthn EOA"
    href="/sdk/typescript/wagmi/connectors/webAuthn"
    icon={LucideFingerprint}
    title="webAuthn"
  />
  <Card.Link
    description="Connector for a secp256k1 (private key) EOA"
    href="/sdk/typescript/wagmi/connectors/secp256k1"
    icon={LucideKeyRound}
    title="secp256k1"
  />
</Card.Container>
