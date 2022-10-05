import { BigNumber } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { anvAbi } from './anv-abi'

export const WriteContractPrepared = () => {
  const { config } = usePrepareContractWrite({
    address: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
    abi: anvAbi,
    functionName: 'claim',
    args: [BigNumber.from('56')],
  })
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite(config)

  return (
    <div>
      <div>Mint an Adjective Noun Verb:</div>
      <button disabled={isLoading || !write} onClick={() => write?.()}>
        Mint
      </button>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
