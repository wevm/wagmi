import { useContractWritePrepared } from 'wagmi'

import anvABI from './anv-abi.json'

export const WriteContractPrepared = () => {
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWritePrepared({
      addressOrName: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
      contractInterface: anvABI,
      functionName: 'claim',
      args: parseInt('56'),
    })

  return (
    <div>
      <div>Mint an Adjective Noun Verb:</div>
      <button disabled={isLoading} onClick={() => write()}>
        Mint
      </button>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
