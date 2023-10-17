import * as React from 'react'
import {
  Connector,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'

import { Providers } from '../Providers'
// @ts-expect-error
import styles from './ConnectWallet.module.css'

export default function () {
  return (
    <Providers>
      <ConnectWallet />
    </Providers>
  )
}

export function ConnectWallet() {
  const { isConnected } = useAccount()
  return (
    <div className={styles.container}>
      {isConnected ? <Account /> : <Connect />}
    </div>
  )
}

function Account() {
  const { address, connector } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  const formattedAddress = formatAddress(address)

  return (
    <div className={styles.row}>
      <div className={styles.inline}>
        {ensAvatar ? (
          <img alt="ENS Avatar" className={styles.avatar} src={ensAvatar} />
        ) : (
          <div className={styles.avatar} />
        )}
        <div>
          {address && (
            <div className={styles.text}>
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </div>
          )}
          <div className={styles.subtext}>
            Connected to {connector?.name} Connector
          </div>
        </div>
      </div>
      <button
        className={styles.button}
        onClick={() => disconnect()}
        type="button"
      >
        Disconnect
      </button>
    </div>
  )
}

function Connect() {
  const chainId = useChainId()
  const { connectors, connect } = useConnect()

  return (
    <div className={styles.stack}>
      {connectors.map((connector) => (
        <ConnectorButton
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector, chainId })}
        />
      ))}
    </div>
  )
}

function ConnectorButton({
  connector,
  onClick,
}: { connector: Connector; onClick: () => void }) {
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector, setReady])

  if (!ready) return null
  return (
    <button className={styles.button} onClick={onClick} type="button">
      {connector.name}
    </button>
  )
}

function formatAddress(address?: string) {
  if (!address) return null
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}
