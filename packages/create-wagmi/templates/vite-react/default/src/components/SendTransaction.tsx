import { parseEther } from 'viem'
import { useSendTransaction, useWaitForTransaction } from 'wagmi'

import { stringify } from '../utils/stringify'

export function SendTransaction() {
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction()
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const address = formData.get('address') as string
          const value = formData.get('value') as `${number}`
          sendTransaction({
            to: address,
            value: parseEther(value),
          })
        }}
      >
        <input name="address" placeholder="address" />
        <input name="value" placeholder="value (ether)" />
        <button type="submit">Send</button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>Error: {error?.message}</div>}
    </>
  )
}
