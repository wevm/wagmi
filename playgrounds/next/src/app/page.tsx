'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { type Hex, formatEther, parseAbi, parseEther } from 'viem'
import {
  type BaseError,
  useAccount,
  useAccountEffect,
  useBalance,
  useBlockNumber,
  useChainId,
  useConfig,
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
import { switchChain } from 'wagmi/actions'
import { optimism, sepolia } from 'wagmi/chains'
import { wagmiContractConfig } from './contracts'
import './App.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('account')

  useAccountEffect({
    onConnect(_data) {},
    onDisconnect() {},
  })

  const account = useAccount()

  return (
    <div className="container">
      <header className="app-header">
        <div className="logo">
          <svg
            className="icon"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Wagmi logo"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 2L19 7.5M13.5 2L11 4.5L16.5 10M13.5 2L16.5 5M8 9.5L2 15.5L8.5 22L14.5 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Web3 Dashboard
        </div>
        <Account />
      </header>

      {account.status !== 'connected' ? (
        <div className="card">
          <div className="card-title">Connect Your Wallet</div>
          <div className="card-content">
            <p className="mb-4">Connect your wallet to access all features</p>
            <Connect />
          </div>
        </div>
      ) : (
        <>
          <div className="btn-group" style={{ marginBottom: '1.5rem' }}>
            <button
              className={`btn ${activeTab === 'account' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('account')}
            >
              Account
            </button>
            <button
              className={`btn ${activeTab === 'transactions' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </button>
            <button
              className={`btn ${activeTab === 'contracts' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('contracts')}
            >
              Contracts
            </button>
            <button
              className={`btn ${activeTab === 'network' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('network')}
            >
              Network
            </button>
          </div>

          {activeTab === 'account' && (
            <div className="main-grid">
              <UserProfile />
              <Balance />
              <SwitchAccount />
              <Connections />
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="main-grid">
              <SendTransaction />
              <SignMessage />
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="main-grid">
              <ReadContract />
              <ReadContracts />
              <WriteContract />
            </div>
          )}

          {activeTab === 'network' && (
            <div className="main-grid">
              <SwitchChain />
              <BlockNumber />
              <ConnectorClient />
              <Repro />
            </div>
          )}
        </>
      )}
    </div>
  )
}

function Account() {
  const account = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address: account.address })

  if (account.status !== 'connected') return null

  return (
    <div className="flex items-center">
      <div className="address-badge mr-2">
        {ensName ||
          `${account.address?.slice(0, 6)}...${account.address?.slice(-4)}`}
      </div>
      <button
        className="btn btn-sm btn-outline"
        type="button"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  )
}

function UserProfile() {
  const account = useAccount()
  const { data: ensName } = useEnsName({ address: account.address })

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="User profile icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Profile
      </div>
      <div className="card-content">
        <div className="data-row">
          <span className="data-label">Address</span>
          <span className="data-value truncate">{account.address}</span>
        </div>
        {ensName && (
          <div className="data-row">
            <span className="data-label">ENS Name</span>
            <span className="data-value">{ensName}</span>
          </div>
        )}
        <div className="data-row">
          <span className="data-label">Chain ID</span>
          <span className="data-value">{account.chainId}</span>
        </div>
        <div className="data-row">
          <span className="data-label">Status</span>
          <span className="data-value">
            <span
              className={`status-badge ${account.status === 'connected' ? 'status-success' : 'status-pending'}`}
            >
              {account.status}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

function Connect() {
  const chainId = useChainId()
  const { connectors, connect, status, error } = useConnect()

  return (
    <div className="btn-group">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="btn btn-primary"
          onClick={() => connect({ connector, chainId })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      {status === 'pending' && (
        <div className="status-badge status-pending mt-2">Connecting...</div>
      )}
      {error && (
        <div className="status-badge status-error mt-2">{error.message}</div>
      )}
    </div>
  )
}

function SwitchAccount() {
  const account = useAccount()
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Switch account icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3L5 7M5 7L9 11M5 7H15M15 13L19 17M19 17L15 21M19 17H9"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Switch Account
      </div>
      <div className="card-content">
        <div className="btn-group">
          {connectors.map((connector) => (
            <button
              disabled={account.connector?.uid === connector.uid}
              key={connector.uid}
              className={`btn ${account.connector?.uid === connector.uid ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => switchAccount({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function SwitchChain() {
  const chainId = useChainId()
  const { chains, switchChain, error } = useSwitchChain()

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Switch chain icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2M2 12C2 6.47715 6.47715 2 12 2M2 12H12M12 2V12"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Switch Chain
      </div>
      <div className="card-content">
        <div className="btn-group">
          {chains.map((chain) => (
            <button
              disabled={chainId === chain.id}
              key={chain.id}
              className={`btn ${chainId === chain.id ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => switchChain({ chainId: chain.id })}
              type="button"
            >
              {chain.name}
            </button>
          ))}
        </div>
        {error && (
          <div className="status-badge status-error mt-2">{error.message}</div>
        )}
      </div>
    </div>
  )
}

function SignMessage() {
  const { data, signMessage } = useSignMessage()

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Sign message icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12H15M12 9V15M3.6 3.6L20.4 20.4M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Sign Message
      </div>
      <div className="card-content">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const formData = new FormData(event.target as HTMLFormElement)
            signMessage({ message: formData.get('message') as string })
          }}
        >
          <div className="form-group">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <input
              className="form-input"
              name="message"
              id="message"
              placeholder="Enter message"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Sign
          </button>
        </form>
        {data && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Signature:</div>
            <div className="transaction-hash">{data}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function Connections() {
  const connections = useConnections()

  if (!connections.length) return null

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Connections icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 10H6C4.34315 10 3 11.3431 3 13C3 14.6569 4.34315 16 6 16H9M9 10H15M9 10V16M15 10H18C19.6569 10 21 11.3431 21 13C21 14.6569 19.6569 16 18 16H15M15 10V16"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Connections
      </div>
      <div className="card-content">
        {connections.map((connection) => (
          <div className="connector-item" key={connection.connector.uid}>
            <div className="connector-info">
              <div className="font-medium">{connection.connector.name}</div>
              <div className="text-xs mt-2">Chain ID: {connection.chainId}</div>
              <div className="text-xs">
                Accounts: {connection.accounts.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Balance() {
  const { address } = useAccount()
  const { data: default_, isLoading: defaultLoading } = useBalance({ address })
  const { data: account_, isLoading: accountLoading } = useBalance({ address })
  const { data: optimism_, isLoading: optimismLoading } = useBalance({
    address,
    chainId: optimism.id,
  })

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Balances icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 8.5H5M22 8.5H19M5 8.5C5 9.88071 6.11929 11 7.5 11C8.88071 11 10 9.88071 10 8.5C10 7.11929 8.88071 6 7.5 6C6.11929 6 5 7.11929 5 8.5ZM19 8.5C19 9.88071 17.8807 11 16.5 11C15.1193 11 14 9.88071 14 8.5C14 7.11929 15.1193 6 16.5 6C17.8807 6 19 7.11929 19 8.5ZM10 8.5H14M2 15.5H8M22 15.5H16M8 15.5C8 16.8807 9.11929 18 10.5 18C11.8807 18 13 16.8807 13 15.5C13 14.1193 11.8807 13 10.5 13C9.11929 13 8 14.1193 8 15.5ZM16 15.5C16 16.8807 14.8807 18 13.5 18C12.1193 18 11 16.8807 11 15.5C11 14.1193 12.1193 13 13.5 13C14.8807 13 16 14.1193 16 15.5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Balances
      </div>
      <div className="card-content">
        <div className="data-row">
          <span className="data-label">Default Chain</span>
          <span className="data-value">
            {defaultLoading
              ? 'Loading...'
              : default_?.value
                ? `${formatEther(default_.value)} ${default_.symbol}`
                : '-'}
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">Account Chain</span>
          <span className="data-value">
            {accountLoading
              ? 'Loading...'
              : account_?.value
                ? `${formatEther(account_.value)} ${account_.symbol}`
                : '-'}
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">Optimism</span>
          <span className="data-value">
            {optimismLoading
              ? 'Loading...'
              : optimism_?.value
                ? `${formatEther(optimism_.value)} ${optimism_.symbol}`
                : '-'}
          </span>
        </div>
      </div>
    </div>
  )
}

function BlockNumber() {
  const { data: default_, isLoading: defaultLoading } = useBlockNumber({
    watch: true,
  })
  const { data: account_, isLoading: accountLoading } = useBlockNumber({
    watch: true,
  })
  const { data: optimism_, isLoading: optimismLoading } = useBlockNumber({
    chainId: optimism.id,
    watch: true,
  })

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Block numbers icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8H17M7 12H17M7 16H13M3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Block Numbers
      </div>
      <div className="card-content">
        <div className="data-row">
          <span className="data-label">Default Chain</span>
          <span className="data-value">
            {defaultLoading ? 'Loading...' : default_?.toString() || '-'}
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">Account Chain</span>
          <span className="data-value">
            {accountLoading ? 'Loading...' : account_?.toString() || '-'}
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">Optimism</span>
          <span className="data-value">
            {optimismLoading ? 'Loading...' : optimism_?.toString() || '-'}
          </span>
        </div>
      </div>
    </div>
  )
}

function ConnectorClient() {
  const { data, error } = useConnectorClient()

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Connector client icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19M12 5V3M12 19V21M19 12H21M5 12H3M17.5 6.5L18.5 5.5M6.5 17.5L5.5 18.5M17.5 17.5L18.5 18.5M6.5 6.5L5.5 5.5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Connector Client
      </div>
      <div className="card-content">
        {data ? (
          <>
            <div className="data-row">
              <span className="data-label">Account</span>
              <span className="data-value truncate">
                {data.account?.address || '-'}
              </span>
            </div>
            <div className="data-row">
              <span className="data-label">Chain ID</span>
              <span className="data-value">{data.chain?.id || '-'}</span>
            </div>
          </>
        ) : error ? (
          <div className="status-badge status-error">{error.message}</div>
        ) : (
          <div className="status-badge status-pending">Loading...</div>
        )}
      </div>
    </div>
  )
}

function SendTransaction() {
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as Hex
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Send transaction icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 12L8 6V18L16 12Z" fill="currentColor" />
          <path
            d="M13 12L8 6V18L13 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 12H15M15 12L10 7M15 12L10 17"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Send Transaction
      </div>
      <div className="card-content">
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <input
              className="form-input"
              name="address"
              id="address"
              placeholder="0x..."
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="value">
              Amount (ETH)
            </label>
            <input
              className="form-input"
              name="value"
              id="value"
              type="number"
              step="0.000000001"
              placeholder="0.01"
              required
            />
          </div>
          <button
            disabled={isPending}
            className="btn btn-primary"
            type="submit"
          >
            {isPending ? 'Processing...' : 'Send'}
          </button>
        </form>
        {hash && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Transaction Hash:</div>
            <div className="transaction-hash">{hash}</div>
          </div>
        )}
        {isConfirming && (
          <div className="status-badge status-pending mt-4">Waiting...</div>
        )}
        {isConfirmed && (
          <div className="status-badge status-success mt-4">Confirmed!</div>
        )}
        {error && (
          <div className="status-badge status-error mt-4">
            {(error as BaseError).shortMessage || error.message}
          </div>
        )}
      </div>
    </div>
  )
}

function ReadContract() {
  const { data: balance, isLoading } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Read contract icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 9H15M9 12H15M9 15H13M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Read Contract
      </div>
      <div className="card-content">
        <div className="data-row">
          <span className="data-label">Balance</span>
          <span className="data-value">
            {isLoading ? 'Loading...' : balance?.toString() || '-'}
          </span>
        </div>
      </div>
    </div>
  )
}

function ReadContracts() {
  const { data, isLoading } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        ...wagmiContractConfig,
        functionName: 'balanceOf',
        args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
      },
      { ...wagmiContractConfig, functionName: 'ownerOf', args: [69n] },
      { ...wagmiContractConfig, functionName: 'totalSupply' },
    ],
  })
  const [balance, ownerOf, totalSupply] = data || []

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Read multiple contracts icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17H15M9 13H15M9 9H9.01M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18M19 6H15C13.8954 6 13 6.89543 13 8V10C13 11.1046 13.8954 12 15 12H19C20.1046 12 21 11.1046 21 10V8C21 6.89543 20.1046 6 19 6Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Read Multiple Contracts
      </div>
      <div className="card-content">
        <div className="data-row">
          <span className="data-label">Balance</span>
          <span className="data-value">
            {isLoading ? 'Loading...' : balance?.toString() || '-'}
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">Owner of #69</span>
          <span className="data-value truncate">
            {isLoading ? 'Loading...' : ownerOf?.toString() || '-'}
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">Total Supply</span>
          <span className="data-value">
            {isLoading ? 'Loading...' : totalSupply?.toString() || '-'}
          </span>
        </div>
      </div>
    </div>
  )
}

function WriteContract() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

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

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Write contract icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13M11 4L20 13M11 4V13H20"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Write Contract
      </div>
      <div className="card-content">
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label" htmlFor="tokenId">
              Token ID
            </label>
            <input
              className="form-input"
              name="tokenId"
              id="tokenId"
              placeholder="Enter token ID"
              required
            />
          </div>
          <button
            disabled={isPending}
            className="btn btn-primary"
            type="submit"
          >
            {isPending ? 'Processing...' : 'Mint'}
          </button>
        </form>
        {hash && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Transaction Hash:</div>
            <div className="transaction-hash">{hash}</div>
          </div>
        )}
        {isConfirming && (
          <div className="status-badge status-pending mt-4">Waiting...</div>
        )}
        {isConfirmed && (
          <div className="status-badge status-success mt-4">Minted!</div>
        )}
        {error && (
          <div className="status-badge status-error mt-4">
            {(error as BaseError).shortMessage || error.message}
          </div>
        )}
      </div>
    </div>
  )
}

function Repro() {
  const config = useConfig()
  const chainId = useChainId()

  return (
    <div className="card">
      <div className="card-title">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          role="img"
          aria-label="Network switcher icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2M2 12C2 6.47715 6.47715 2 12 2M2 12H12M12 2V12"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        Network Switcher
      </div>
      <div className="card-content">
        <div className="data-row">
          <span className="data-label">Current Chain ID</span>
          <span className="data-value">{chainId}</span>
        </div>
        <div className="btn-group mt-4">
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => switchChain(config, { chainId: sepolia.id })}
          >
            Sepolia
          </button>
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => switchChain(config, { chainId: optimism.id })}
          >
            Optimism
          </button>
        </div>
      </div>
    </div>
  )
}
