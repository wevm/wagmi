import { useAccount } from 'wagmi'

import { Account } from './components/Account'
import { Balance } from './components/Balance'
import { BlockNumber } from './components/BlockNumber'
import { Connect } from './components/Connect'
import { NetworkSwitcher } from './components/NetworkSwitcher'
import { ReadContract } from './components/ReadContract'
import { ReadContracts } from './components/ReadContracts'
import { ReadContractsInfinite } from './components/ReadContractsInfinite'
import { SendTransaction } from './components/SendTransaction'
import { SendTransactionPrepared } from './components/SendTransactionPrepared'
import { SignMessage } from './components/SignMessage'
import { SignTypedData } from './components/SignTypedData'
import { Token } from './components/Token'
import { WatchContractEvents } from './components/WatchContractEvents'
import { WatchPendingTransactions } from './components/WatchPendingTransactions'
import { WriteContract } from './components/WriteContract'
import { WriteContractPrepared } from './components/WriteContractPrepared'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>wagmi + Vite</h1>

      <Connect />

      {isConnected && (
        <>
          <hr />
          <h2>Network</h2>
          <NetworkSwitcher />
          <br />
          <hr />
          <h2>Account</h2>
          <Account />
          <br />
          <hr />
          <h2>Balance</h2>
          <Balance />
          <br />
          <hr />
          <h2>Block Number</h2>
          <BlockNumber />
          <br />
          <hr />
          <h2>Read Contract</h2>
          <ReadContract />
          <br />
          <hr />
          <h2>Read Contracts</h2>
          <ReadContracts />
          <br />
          <hr />
          <h2>Read Contracts Infinite</h2>
          <ReadContractsInfinite />
          <br />
          <hr />
          <h2>Send Transaction</h2>
          <SendTransaction />
          <br />
          <hr />
          <h2>Send Transaction (Prepared)</h2>
          <SendTransactionPrepared />
          <br />
          <hr />
          <h2>Sign Message</h2>
          <SignMessage />
          <br />
          <hr />
          <h2>Sign Typed Data</h2>
          <SignTypedData />
          <br />
          <hr />
          <h2>Token</h2>
          <Token />
          <br />
          <hr />
          <h2>Watch Contract Events</h2>
          <WatchContractEvents />
          <br />
          <hr />
          <h2>Watch Pending Transactions</h2>
          <WatchPendingTransactions />
          <br />
          <hr />
          <h2>Write Contract</h2>
          <WriteContract />
          <br />
          <hr />
          <h2>Write Contract (Prepared)</h2>
          <WriteContractPrepared />
        </>
      )}
    </>
  )
}
