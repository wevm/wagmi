import { BigNumber } from 'ethers'
import { useState } from 'react'
import { useContractWrite } from 'wagmi'

import { anvAbi } from './anv-abi'

export const WriteContract = () => {
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite({
      mode: 'recklesslyUnprepared',
      address: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
      abi: anvAbi,
      functionName: 'claim',
      chainId: 1,
    })

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
          onClick={() =>
            write?.({ recklesslySetUnpreparedArgs: [BigNumber.from(tokenId)] })
          }
        >
          Mint
        </button>
      </div>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
