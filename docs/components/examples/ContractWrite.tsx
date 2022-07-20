import * as React from 'react'
import { Button, Stack, Text } from 'degen'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { PreviewWrapper } from '../core'
import { Account, WalletSelector } from '../web3'

export function ContractWrite() {
  const { isConnected } = useAccount()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isPreparing,
  } = usePrepareContractWrite({
    addressOrName: '0xaf0326d92b97df1221759476b072abfd8084f9be',
    contractInterface: ['function mint()'],
    functionName: 'mint',
  })
  const {
    data,
    error,
    isLoading: isWriteLoading,
    isError: isWriteError,
    write,
  } = useContractWrite(config)
  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  if (isConnected)
    return (
      <PreviewWrapper>
        <Stack>
          <Account />
          <Button
            disabled={!write}
            loading={isPreparing || isWriteLoading || isConfirming}
            onClick={() => write?.()}
            width="full"
          >
            {isConfirming ? 'Minting...' : 'Mint'}
          </Button>
          {isPrepareError && (
            <Text color="red">Error: {prepareError?.message}</Text>
          )}
          {isWriteError && <Text color="red">Error: {error?.message}</Text>}
          {isSuccess && (
            <Text>
              Success!{' '}
              <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
            </Text>
          )}
        </Stack>
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <WalletSelector />
    </PreviewWrapper>
  )
}
