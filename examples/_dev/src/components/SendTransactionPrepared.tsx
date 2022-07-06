import { BigNumber } from 'ethers'
import { usePrepareTransaction, useSendTransactionPrepared } from 'wagmi'

export const SendTransactionPrepared = () => {
  // TODO: test if this works w/o signer
  const {
    data: preparedRequest,
    error: eagerError,
    isError: isEagerError,
  } = usePrepareTransaction({
    request: { to: 'moxey.eth', value: BigNumber.from('10000000000000000') },
  })
  const { data, isIdle, isLoading, isSuccess, isError, sendTransaction } =
    useSendTransactionPrepared({ request: preparedRequest })

  console.log('test', isEagerError, eagerError)

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
