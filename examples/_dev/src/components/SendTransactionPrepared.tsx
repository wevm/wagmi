import { stringify } from 'viem'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'

export const SendTransactionPrepared = () => {
  const { config } = usePrepareSendTransaction({
    request: { to: 'moxey.eth', value: 10000000000000000n },
  })
  const { data, isIdle, isLoading, isSuccess, isError, sendTransaction } =
    useSendTransaction(config)

  if (isLoading) return <div>Check Wallet</div>

  if (isIdle)
    return (
      <button
        disabled={isLoading || !sendTransaction}
        onClick={() => sendTransaction?.()}
      >
        Send Transaction
      </button>
    )

  return (
    <div>
      {isSuccess && <div>Transaction: {stringify(data)}</div>}
      {isError && <div>Error sending transaction</div>}
    </div>
  )
}
