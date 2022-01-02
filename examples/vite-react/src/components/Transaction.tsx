import * as React from 'react'
import { BigNumber } from 'ethers/lib/ethers'
import { useNetwork, useTransaction, useWaitForTransaction } from 'wagmi'

export const Transaction = () => {
  const [{ data: networkData }] = useNetwork()
  const [state, setState] = React.useState<{
    addressOrName: string
    amount: string
  }>({
    addressOrName: '',
    amount: '',
  })
  const [transactionResult, sendTransaction] = useTransaction({
    request: {
      to: state.addressOrName,
      value: state.amount
        ? BigNumber.from(`${parseFloat(state.amount) * 10 ** 18}`)
        : undefined,
    },
  })
  const [waitResult] = useWaitForTransaction({
    wait: transactionResult.data?.wait,
  })

  const blockExplorer = networkData.chain?.blockExplorers?.[0]
  const hash = transactionResult.data?.hash

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        sendTransaction()
      }}
    >
      <div>
        <label htmlFor="addressOrName">Address or ENS Name</label>
      </div>
      <input
        placeholder="awkweb.eth"
        id="addressOrName"
        value={state.addressOrName}
        onChange={(event) =>
          setState((x) => ({ ...x, addressOrName: event.target.value }))
        }
      />

      <div>
        <label htmlFor="amount">ETH Amount</label>
      </div>
      <input
        placeholder="1"
        id="amount"
        value={state.amount}
        type="number"
        onChange={(event) =>
          setState((x) => ({ ...x, amount: event.target.value }))
        }
      />

      <button
        disabled={
          transactionResult.loading ||
          waitResult.loading ||
          !state.addressOrName ||
          !state.amount
        }
      >
        {transactionResult.loading ? 'Check Wallet' : 'Send Transaction'}
      </button>

      {waitResult.loading
        ? 'Processing…'
        : waitResult.error
        ? waitResult.error
        : waitResult.data?.status === 1
        ? `Confirmed ${waitResult.data.status}`
        : null}
      {transactionResult.error && <div>{transactionResult.error.message}</div>}
      {blockExplorer && hash && (
        <a href={`${blockExplorer.url}/tx/${hash}`}>
          View on {blockExplorer.name}
        </a>
      )}
    </form>
  )
}
