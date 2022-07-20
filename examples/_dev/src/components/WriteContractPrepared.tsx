import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import anvABI from './anv-abi.json'

export const WriteContractPrepared = () => {
  const { config } = usePrepareContractWrite({
    addressOrName: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
    contractInterface: anvABI,
    functionName: 'claim',
    args: parseInt('56'),
  })
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite(config)

  return (
    <div>
      <div>Mint an Adjective Noun Verb:</div>
      <button
        disabled={isLoading || !write}
        onClick={() =>
          write?.({ dangerouslySetArgs: [], dangerouslySetOverrides: {} })
        }
      >
        Mint
      </button>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
