import { useState } from 'react'
import { useContractWrite } from 'wagmi'

import anvABI from './anv-abi.json'

export const WriteContract = () => {
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite(
      {
        addressOrName: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
        contractInterface: anvABI,
      },
      'claim',
    )

  const [tokenId, setTokenId] = useState<string>('')

  return (
    <div>
      <div>Mint an Adjective Noun Verb:</div>
      <div>
        <input
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="token id"
          value={tokenId}
        />
        <button
          disabled={isLoading}
          onClick={() => write({ args: parseInt(tokenId) })}
        >
          Mint
        </button>
      </div>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
