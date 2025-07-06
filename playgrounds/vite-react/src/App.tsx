import type { FormEvent } from 'react'
import { type Hex, formatEther, parseAbi, parseEther } from 'viem'
import {
  type BaseError,
  useAccount,
  useAccountEffect,
  useBalance,
  useBlockNumber,
  useChainId,
  useConnect,
  useConnections,
  useConnectorClient,
  useDisconnect,
  useEnsName,
  useReadContract,
  useReadContracts,
  useSendTransaction,
  useSignMessage,
  useSwitchAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { optimism } from 'wagmi/chains'

import { wagmiContractConfig } from './contracts'

function App() {
  useAccountEffect({
    onConnect(_data) {
      // console.info('onConnect', data)
    },
    onDisconnect() {
      // console.info('onDisconnect')
    },
  })

  return (
    <>
      <Account />
      <Connect />
      <LedgerDevices />
      <SwitchAccount />
      <SwitchChain />
      <SignMessage />
      <Connections />
      <BlockNumber />
      <Balance />
      <ConnectorClient />
      <SendTransaction />
      <ReadContract />
      <ReadContracts />
      <WriteContract />
    </>
  )
}

function Account() {
  const account = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({
    address: account.address,
  })

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address} {ensName}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status !== 'disconnected' && (
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
          key={connector.uid}
          onClick={() =>
            connect({
              connector,
              chainId,
            })
          }
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

  return (
    <div>
      <h2>Switch Account</h2>

      {connectors.map((connector) => (
        <button
          disabled={account.connector?.uid === connector.uid}
          key={connector.uid}
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
  const { chains, switchChain, error } = useSwitchChain()

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

      {error?.message}
    </div>
  )
}

function SignMessage() {
  const { data, signMessage } = useSignMessage()

  return (
    <div>
      <h2>Sign Message</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.target as HTMLFormElement)
          signMessage({ message: formData.get('message') as string })
        }}
      >
        <input name="message" />
        <button type="submit">Sign Message</button>
      </form>

      {data}
    </div>
  )
}

function Connections() {
  const connections = useConnections()

  return (
    <div>
      <h2>Connections</h2>

      {connections.map((connection) => (
        <div key={connection.connector.uid}>
          <div>connector {connection.connector.name}</div>
          <div>accounts: {JSON.stringify(connection.accounts)}</div>
          <div>chainId: {connection.chainId}</div>
        </div>
      ))}
    </div>
  )
}

function Balance() {
  const { address } = useAccount()

  const { data: default_ } = useBalance({ address })
  const { data: account_ } = useBalance({ address })
  const { data: optimism_ } = useBalance({
    address,
    chainId: optimism.id,
  })

  return (
    <div>
      <h2>Balance</h2>

      <div>
        Balance (Default Chain):{' '}
        {!!default_?.value && formatEther(default_.value)}
      </div>
      <div>
        Balance (Account Chain):{' '}
        {!!account_?.value && formatEther(account_.value)}
      </div>
      <div>
        Balance (Optimism Chain):{' '}
        {!!optimism_?.value && formatEther(optimism_.value)}
      </div>
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

function SendTransaction() {
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as Hex
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

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
        <button disabled={isPending} type="submit">
          {isPending ? 'Confirming...' : 'Send'}
        </button>
      </form>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && 'Waiting for confirmation...'}
      {isConfirmed && 'Transaction confirmed.'}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  )
}

function ReadContract() {
  const { data: balance } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  return (
    <div>
      <h2>Read Contract</h2>
      <div>Balance: {balance?.toString()}</div>
    </div>
  )
}

function ReadContracts() {
  const { data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        ...wagmiContractConfig,
        functionName: 'balanceOf',
        args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
      },
      {
        ...wagmiContractConfig,
        functionName: 'ownerOf',
        args: [69n],
      },
      {
        ...wagmiContractConfig,
        functionName: 'totalSupply',
      },
    ],
  })
  const [balance, ownerOf, totalSupply] = data || []

  return (
    <div>
      <h2>Read Contract</h2>
      <div>Balance: {balance?.toString()}</div>
      <div>Owner of Token 69: {ownerOf?.toString()}</div>
      <div>Total Supply: {totalSupply?.toString()}</div>
    </div>
  )
}

function WriteContract() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: parseAbi(['function mint(uint256 tokenId)']),
      functionName: 'mint',
      args: [BigInt(tokenId)],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <div>
      <h2>Write Contract</h2>
      <form onSubmit={submit}>
        <input name="tokenId" placeholder="Token ID" required />
        <button disabled={isPending} type="submit">
          {isPending ? 'Confirming...' : 'Mint'}
        </button>
      </form>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && 'Waiting for confirmation...'}
      {isConfirmed && 'Transaction confirmed.'}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  )
}

function LedgerDevices() {
  const { connectors } = useConnect()
  const { connector: activeConnector } = useAccount()

  // Find the Ledger connector
  const ledgerConnector = connectors.find((c) => c.type === 'ledger')

  if (!ledgerConnector) {
    return (
      <div>
        <h2>Ledger Devices</h2>
        <div>Ledger connector not available</div>
      </div>
    )
  }

  const isLedgerActive = activeConnector?.type === 'ledger'

  const handleGetDevices = async () => {
    try {
      if ('getDevices' in ledgerConnector) {
        const devices = await (ledgerConnector as any).getDevices()
        console.info('Available Ledger devices:', devices)
        alert(
          `Found ${devices.length} Ledger device(s). Check console for details.`,
        )
      }
    } catch (error) {
      console.error('Error getting Ledger devices:', error)
      alert(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  const handleSelectDevice = async () => {
    try {
      if (
        'getDevices' in ledgerConnector &&
        'selectDevice' in ledgerConnector
      ) {
        const devices = await (ledgerConnector as any).getDevices()
        if (devices.length > 0) {
          await (ledgerConnector as any).selectDevice(devices[0].id)
          console.info('Selected device:', devices[0])
          alert(`Selected device: ${devices[0].name}`)
        } else {
          alert('No devices found')
        }
      }
    } catch (error) {
      console.error('Error selecting Ledger device:', error)
      alert(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  const handleGetSelectedDevice = async () => {
    try {
      if ('getSelectedDevice' in ledgerConnector) {
        const device = await (ledgerConnector as any).getSelectedDevice()
        console.info('Selected device:', device)
        if (device) {
          alert(`Selected device: ${device.name} (${device.id})`)
        } else {
          alert('No device selected')
        }
      }
    } catch (error) {
      console.error('Error getting selected device:', error)
      alert(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  }

  return (
    <div>
      <h2>Ledger Devices</h2>
      <div>
        <p>
          Status:{' '}
          {isLedgerActive ? 'Connected to Ledger' : 'Not connected to Ledger'}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '10px',
          }}
        >
          <button onClick={handleGetDevices} type="button">
            Get Devices
          </button>

          <button onClick={handleSelectDevice} type="button">
            Select First Device
          </button>

          <button onClick={handleGetSelectedDevice} type="button">
            Get Selected Device
          </button>
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <p>
            Note: Make sure your Ledger device is connected via USB and the
            Ethereum app is open.
          </p>
          <p>
            You may need to enable "Contract data" and "Debug data" in the
            Ethereum app settings.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
