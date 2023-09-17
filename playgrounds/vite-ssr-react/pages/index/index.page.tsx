import { useEffect, useState } from 'react'
import { optimism } from 'viem/chains'
import {
  useAccount,
  useAccountEffect,
  useBlockNumber,
  useChainId,
  useConnect,
  useConnections,
  useConnectorClient,
  useDisconnect,
  useEnsName,
  useSwitchAccount,
  useSwitchChain,
} from 'wagmi'

export function Page() {
  useAccountEffect({
    onConnect(data) {
      console.log('onConnect', data)
    },
    onDisconnect() {
      console.log('onDisconnect')
    },
  })

  return (
    <>
      <Account />
      <Connect />
      <SwitchAccount />
      <SwitchChain />
      <Connections />
      <BlockNumber />
      <ConnectorClient />
    </>
  )
}

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return isMounted
}

function Account() {
  const account = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({
    address: account.address,
  })

  const isMounted = useIsMounted()
  const resolvedAccount = isMounted
    ? account
    : ({} as ReturnType<typeof useAccount>)

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {resolvedAccount.address} {ensName}
        <br />
        chainId: {resolvedAccount.chainId}
        <br />
        status: {resolvedAccount.status}
      </div>

      {resolvedAccount.status === 'connected' && (
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const chainId = useChainId()
  const { connectors, connect, status, error } = useConnect()

  return (
    <div>
      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector, chainId })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{status}</div>
      <div>{error?.message}</div>
    </div>
  )
}

function SwitchAccount() {
  const account = useAccount()
  const { connectors, switchAccount } = useSwitchAccount()

  const isMounted = useIsMounted()
  const resolvedAccount = isMounted
    ? account
    : ({} as ReturnType<typeof useAccount>)
  const resolvedConnectors = isMounted ? connectors : []

  return (
    <div>
      <h2>Switch Account</h2>

      {resolvedConnectors.map((connector) => (
        <button
          disabled={resolvedAccount.connector?.uid === connector.uid}
          key={connector.id}
          onClick={() => switchAccount({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

function SwitchChain() {
  const chainId = useChainId()
  const { chains, switchChain } = useSwitchChain()

  return (
    <div>
      <h2>Switch Chain</h2>

      {chains.map((chain) => (
        <button
          disabled={chainId === chain.id}
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
          type="button"
        >
          {chain.name}
        </button>
      ))}
    </div>
  )
}

function Connections() {
  const connections = useConnections()

  const isMounted = useIsMounted()
  const resolvedConnections = isMounted ? connections : []

  return (
    <div>
      <h2>Connections</h2>

      {resolvedConnections.map((connection) => (
        <div key={connection.connector.id}>
          <div>connector {connection.connector.name}</div>
          <div>accounts: {JSON.stringify(connection.accounts)}</div>
          <div>chainId: {connection.chainId}</div>
        </div>
      ))}
    </div>
  )
}

function BlockNumber() {
  const { data: default_ } = useBlockNumber({ watch: true })
  const { data: account_ } = useBlockNumber({
    watch: true,
  })
  const { data: optimism_ } = useBlockNumber({
    chainId: optimism.id,
    watch: true,
  })

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {default_?.toString()}</div>
      <div>Block Number (Account Chain): {account_?.toString()}</div>
      <div>Block Number (Optimism): {optimism_?.toString()}</div>
    </div>
  )
}

function ConnectorClient() {
  const { data, error } = useConnectorClient()
  return (
    <div>
      <h2>Connector Client</h2>
      client {data?.account?.address} {data?.chain?.id}
      {error?.message}
    </div>
  )
}
