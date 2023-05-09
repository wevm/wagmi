import { useState } from 'react'
import { useContractWrite } from 'wagmi'

import { wagmiContractConfig } from './contracts'

export const WriteContract = () => {
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite({
      ...wagmiContractConfig,
      functionName: 'mint',
      chainId: 1,
    })

  const [tokenId, setTokenId] = useState<string>('')

  return (
    <div>
      <div>Mint a wagmi:</div>
      <div>
        <input
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="token id"
          value={tokenId}
        />
        <button
          disabled={isLoading}
          onClick={() => write({ args: [BigInt(tokenId)] })}
        >
          Mint
        </button>
      </div>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
