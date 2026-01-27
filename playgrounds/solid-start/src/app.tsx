import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import {
  cookieToInitialState,
  useBalance,
  useBlockNumber,
  useChainId,
  useChains,
  useConnect,
  useConnection,
  useConnections,
  useConnectorClient,
  useConnectors,
  useDisconnect,
  useSwitchChain,
  useSwitchConnection,
  WagmiProvider,
} from '@wagmi/solid'
import { optimism } from '@wagmi/solid/chains'
import { For, Show } from 'solid-js'
import { getRequestEvent, isServer } from 'solid-js/web'
import { formatEther, stringify } from 'viem'

import { config } from './wagmi'

function getInitialState() {
  if (!isServer) return undefined
  const event = getRequestEvent()
  const cookie = event?.request.headers.get('cookie')
  return cookieToInitialState(config, cookie)
}

export default function App() {
  const initialState = getInitialState()
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <Connection />
        <Connect />
        <SwitchConnection />
        <SwitchChain />
        {/* <SignMessage /> */}
        <Connections />
        <BlockNumber />
        <Balance />
        <ConnectorClient />
        {/* <SendTransaction /> */}
        {/* <ReadContract /> */}
        {/* <ReadContracts /> */}
        {/* <WriteContract /> */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function Connection() {
  const connection = useConnection()
  const disconnect = useDisconnect()

  return (
    <div>
      <h2>Connection</h2>

      <div>
        account: {connection().address}
        <br />
        chainId: {connection().chainId}
        <br />
        status: {connection().status}
      </div>

      <Show when={connection().status !== 'disconnected'}>
        <button
          type="button"
          onClick={() => {
            console.log('disconnect clicked')
            disconnect.mutate()
          }}
        >
          Disconnect
        </button>
      </Show>
    </div>
  )
}

function Connect() {
  const chainId = useChainId()
  const connect = useConnect()
  const connectors = useConnectors()

  return (
    <div>
      <h2>Connect</h2>
      <For each={connectors()}>
        {(connector) => (
          <button
            onClick={async () => {
              connect
                .mutateAsync({
                  connector,
                  chainId: chainId(),
                })
                .then(console.log)
                // biome-ignore lint/suspicious/noConsole: allow
                .catch(console.error)
            }}
            type="button"
          >
            {connector.name}
          </button>
        )}
      </For>
      <div>{connect.status}</div>
      <div>{connect.error?.message}</div>
    </div>
  )
}

function SwitchConnection() {
  const connection = useConnection()
  const { mutate: switchConnection } = useSwitchConnection()
  const connections = useConnections()

  return (
    <div>
      <h2>Switch Connection</h2>

      <For each={connections()}>
        {(conn) => (
          <button
            disabled={connection().connector?.uid === conn.connector.uid}
            onClick={() => switchConnection({ connector: conn.connector })}
            type="button"
          >
            {conn.connector.name}
          </button>
        )}
      </For>
    </div>
  )
}

function SwitchChain() {
  const chainId = useChainId()
  const switchChain = useSwitchChain()
  const chains = useChains()

  return (
    <div>
      <h2>Switch Chain</h2>

      <For each={chains()}>
        {(chain) => (
          <button
            disabled={chainId() === chain.id}
            onClick={() => switchChain.mutate({ chainId: chain.id })}
            type="button"
          >
            {chain.name}
          </button>
        )}
      </For>

      {switchChain.error?.message}
    </div>
  )
}

function Connections() {
  const connections = useConnections()

  return (
    <div>
      <h2>Connections</h2>

      <For each={connections()}>
        {(connection) => (
          <div>
            <div>connector {connection.connector.name}</div>
            <div>accounts: {stringify(connection.accounts)}</div>
            <div>chainId: {connection.chainId}</div>
          </div>
        )}
      </For>
    </div>
  )
}

function BlockNumber() {
  const default_ = useBlockNumber(() => ({ watch: true }))
  const account_ = useBlockNumber(() => ({ watch: true }))
  const optimism_ = useBlockNumber(() => ({
    chainId: optimism.id,
    watch: true,
  }))

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {default_.data?.toString()}</div>
      <div>Block Number (Connection Chain): {account_.data?.toString()}</div>
      <div>Block Number (Optimism): {optimism_.data?.toString()}</div>
    </div>
  )
}

function Balance() {
  const connection = useConnection()

  const default_ = useBalance(() => ({
    address: connection().address,
  }))
  const account_ = useBalance(() => ({
    address: connection().address,
  }))
  const optimism_ = useBalance(() => ({
    address: connection().address,
    chainId: optimism.id,
  }))

  return (
    <div>
      <h2>Balance</h2>

      <div>
        Balance (Default Chain):{' '}
        {!!default_?.data?.value && formatEther(default_.data.value)}
      </div>
      <div>
        Balance (Connection Chain):{' '}
        {!!account_?.data?.value && formatEther(account_.data.value)}
      </div>
      <div>
        Balance (Optimism Chain):{' '}
        {!!optimism_?.data?.value && formatEther(optimism_.data.value)}
      </div>
    </div>
  )
}

function ConnectorClient() {
  const connectorClient = useConnectorClient()
  return (
    <div>
      <h2>Connector Client</h2>
      client {connectorClient.data?.account?.address}{' '}
      {connectorClient.data?.chain?.id}
      {connectorClient.error?.message}
    </div>
  )
}
