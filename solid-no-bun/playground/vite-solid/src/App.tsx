import { createMutation, createQuery } from '@tanstack/solid-query'
import { For, Show } from 'solid-js'
import { type Config, createAccount, createAccountEffect, createChainId, createConfig, createConnect, createConnections, createConnectorClient, createDisconnect, createSwitchAccount } from 'solid-wagmi'
import { type SwitchChainParameters, switchChain, signMessage, type SignMessageParameters, getBalance, sendTransaction, type SendTransactionParameters, waitForTransactionReceipt, GetBalanceParameters } from 'solid-wagmi/actions'
import { BaseError, Hex, erc20Abi, parseEther } from 'viem'
import { readContract } from 'solid-wagmi/actions'

function App() {
  createAccountEffect(()=>({
    onConnect(data) {
      console.log('onConnect', data)
    },
    onDisconnect() {
      console.log('onDisconnect')
    },
  }))

  return (
    <>
      <Account />
      <Connect />
      <SwitchAccount />
      <Connections />
      <SwitchChain />
      <SignMessage />
      <Balance />
      <SendTransaction />
      <ReadContract/>
      {/* <ConnectorClient /> */}
    </>
  )
}

function Account() {
  const { account } = createAccount()
  const { disconnect } = createDisconnect()

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      <Show when={account.status !== 'disconnected'} >
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      </Show>
    </div>
  )
}

function Connect() {
  const { chain } = createChainId()
  const { connectors, connect, mutation } = createConnect()

  return (
    <div>
      <h2>Connect</h2>
      <For each={connectors} >
        {(connector)=>(
          <button
            onClick={() => connect({ connector, chainId: chain.id })}
            type="button"
          >
            {connector.name}
          </button>
        )}
      </For>
      
      <div>{mutation.status}</div>
      <div>{mutation.error?.message}</div>
    </div>
  )
}

function SwitchAccount() {
  const { account } = createAccount()
  const { connectors, switchAccount } = createSwitchAccount()

  return (
    <div>
      <h2>Switch Account</h2>

      <For each={connectors} >
        {(connector)=>(
          <button
          disabled={account.connector?.uid === connector.uid}
          onClick={() => switchAccount({ connector })}
          type="button"
        >
          {connector.name}
        </button>
        )}
      </For>
    </div>
  )
}

type MutationVariables<T extends Config> = SwitchChainParameters<T, T['chains'][number]['id']>
function SwitchChain() {
  const { config } = createConfig()
  const { chain: _chain } = createChainId()

  const mutation = createMutation(()=>({
    mutationFn: function(variables: MutationVariables<typeof config>) {
      return switchChain(config, variables)
    },
    mutationKey: ['switchChain'],
  }))
  
  return (
    <div>
      <h2>Switch Chain</h2>

      <For each={config.chains} >
        {(chain)=>(
          <button
            disabled={_chain.id === chain.id}
            onClick={()=>mutation.mutate({ chainId: chain.id })}
            type="button"
          >
            {chain.name}
          </button>
        )}
      </For>

      {mutation.error?.message}
    </div>
  )
}

function SignMessage() {
  const { config } = createConfig()

  const mutation = createMutation(()=>({
    mutationFn: function(variables: SignMessageParameters) {
      return signMessage(config, variables)
    },
    mutationKey: ['signMessage'],
  }))

  return (
    <div>
      <h2>Sign Message</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.target as HTMLFormElement)
          mutation.mutate({ message: formData.get('message') as string })
        }}
      >
        <input name="message" />
        <button type="submit">Sign Message</button>
      </form>

      {mutation.data}
    </div>
  )
}

function Connections() {
  const { connections } = createConnections()

  return (
    <div>
      <h2>Connections</h2>

      <For each={connections} >
        {(connection)=>(
          <div>
            <div>connector {connection.connector.name}</div>
            <div>accounts: {JSON.stringify(connection.accounts)}</div>
            <div>chainId: {connection.chainId}</div>
          </div>
        )}
      </For>
    </div>
  )
}

function Balance() {
  const { config } = createConfig()
  const { account } = createAccount()
  
  const query = createQuery(()=>({
    async queryFn({ queryKey }) {
      const { address,...parameters } = queryKey[1]
      if (!address) throw new Error('address is required')

      const balance = await getBalance(config, {
        ...(parameters as GetBalanceParameters<typeof config>),
        address,
      })
      return balance ?? null
    },
    enabled: account.isConnected,
    queryKey: ['getBalance', { address: account.address, chainId: account.chainId }] as const,
  }))

  return (
    <div>
      <h2>Balance</h2>

      <div>Balance (Default Chain): {query.data?.formatted}</div>
    </div>
  )
}

function BlockNumber() {
// TODO this one uses a nested hook inside internally
return null
}

function ConnectorClient() {
  const query = createConnectorClient()
  return (
    <div>
      <h2>Connector Client</h2>
      client {query.data?.account?.address} {query.data?.chain?.id}
      {query.error?.message}
    </div>
  )
}

type SendTransactionVariables<T extends Config> = SendTransactionParameters<T, T['chains'][number]['id']>
function SendTransaction() {
  const { config } = createConfig()

  const mutation = createMutation(()=>({
      mutationFn: function(variables: SendTransactionVariables<typeof config>) {
        return sendTransaction(config, variables)
      },
      mutationKey: ['sendTransaction'],
  }))

  const query = createQuery(()=>({
    queryFn: async function({ queryKey }) {
      const { hash } = queryKey[1]
      if (!hash) throw new Error('hash is required')
      return waitForTransactionReceipt(config, {
        hash,
      })
    },
    enabled: Boolean(mutation.data),
    queryKey: ['waitForTransactionReceipt', { hash: mutation.data }] as const,
  }))

  async function submit(e: Event) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as Hex
    const value = formData.get('value') as string
    mutation.mutate({ to, value: parseEther(value) })
  }

  
  return (
    <div>
      <h2>Send Transaction</h2>
      <form onSubmit={submit}>
        <input name="address" placeholder="Address" required />
        <input
          name="value"
          placeholder="Amount (ETH)"
          type="number"
          step="0.000000001"
          required
        />
        <button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? 'Confirming...' : 'Send'}
        </button>
      </form>
      {mutation.data && <div>Transaction Hash: {mutation.data}</div>}
      {query.isLoading && 'Waiting for confirmation...'}
      {query.isSuccess && 'Transaction confirmed.'}
      {mutation.error && (
        <div>Error: {(mutation.error as BaseError).shortMessage || mutation.error.message}</div>
      )}
    </div>
  )
}

function ReadContract() {
  const { config } = createConfig()
  const { account } = createAccount()

  const abi = erc20Abi
  const address = '0x...'
  const functionName = 'balanceOf'
  const args = [account.address] as const

  const mutation = createQuery(()=>({
    queryFn: async function({ queryKey }) {
        const { address, functionName, ...parameters } = queryKey[1]

        if (!address) throw new Error('address is required')
        if (!functionName) throw new Error('functionName is required')

        return readContract(config, {
          abi,
          address,
          functionName,
          args: parameters.args as [Hex]
        })
      },
      enabled: account.isConnected,
      queryKey: ['readContract', { address, functionName, args }] as const,
    })
  )

  return (
    <div>
      <h2>Read Contract</h2>
      <div>Balance: {mutation.data?.toString()}</div>
    </div>
  )
}

function ReadContracts() {
// TODO
return null
}

function WriteContract() {
// TODO
return null
}

export default App
