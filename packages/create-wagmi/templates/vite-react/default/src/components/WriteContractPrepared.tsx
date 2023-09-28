import { useState } from 'react'
import { BaseError } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { wagmiContractConfig } from './contracts'
import { useDebounce } from '../hooks/useDebounce'
import { stringify } from '../utils/stringify'

export function WriteContractPrepared() {
  const [tokenId, setTokenId] = useState('')
  const debouncedTokenId = useDebounce(tokenId)

  const { config } = usePrepareContractWrite({
    ...wagmiContractConfig,
    functionName: 'mint',
    enabled: Boolean(debouncedTokenId),
    args: [BigInt(debouncedTokenId)],
  })
  const { write, data, error, isLoading, isError } = useContractWrite(config)
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash })

  return (
    <>
      <h3>Mint a wagmi</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          write?.()
        }}
      >
        <input
          placeholder="token id"
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button disabled={!write} type="submit">
          Mint
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
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  )
}
