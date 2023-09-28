import { useState } from 'react'
import { parseEther, stringify } from 'viem'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

import { useDebounce } from '../hooks/useDebounce'

export function SendTransactionPrepared() {
  const [to, setTo] = useState('')
  const debouncedTo = useDebounce(to)

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
    value: debouncedValue ? parseEther(value as `${number}`) : undefined,
    enabled: Boolean(debouncedTo && debouncedValue),
  })
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction(config)
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
          sendTransaction?.()
        }}
      >
        <input
          placeholder="address"
          onChange={(e) => setTo(e.target.value)}
          value={to}
        />
        <input
          id="value"
          placeholder="value (ether)"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button disabled={!sendTransaction} type="submit">
          Send
        </button>
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
