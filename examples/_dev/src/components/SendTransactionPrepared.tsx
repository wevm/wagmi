import { BigNumber } from 'ethers'
import { usePrepareTransaction, useSendTransactionPrepared } from 'wagmi'

export const SendTransactionPrepared = () => {
  const { data: preparedRequest } = usePrepareTransaction({
    request: { to: 'moxey.eth', value: BigNumber.from('10000000000000000') },
  })
  const { data, isIdle, isLoading, isSuccess, isError, sendTransaction } =
    useSendTransactionPrepared({ request: preparedRequest })

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
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      {isError && <div>Error sending transaction</div>}
    </div>
  )
}
