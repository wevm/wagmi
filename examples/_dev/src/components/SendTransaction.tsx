import { stringify } from 'viem'
import { useSendTransaction } from 'wagmi'

export const SendTransaction = () => {
  const { data, isIdle, isLoading, isSuccess, isError, sendTransaction } =
    useSendTransaction({
      request: {
        to: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
        value: 10000000000000000n, // 0.01 ETH
      },
    })

  if (isLoading) return <div>Check Wallet</div>

  if (isIdle)
    return (
      <button disabled={isLoading} onClick={() => sendTransaction()}>
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
