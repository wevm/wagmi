import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { wagmiContractConfig } from './contracts'

export const WriteContractPrepared = () => {
  const { config } = usePrepareContractWrite({
    ...wagmiContractConfig,
    functionName: 'mint',
  })
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite(config)

  return (
    <div>
      <div>Mint a wagmi:</div>
      <button disabled={isLoading || !write} onClick={() => write?.()}>
        Mint
      </button>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
