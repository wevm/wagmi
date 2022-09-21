import { Button, Stack, Text } from 'degen'
import * as React from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { PreviewWrapper } from '../core'
import { Account, SwitchNetwork, WalletSelector } from '../web3'

export function ContractWrite() {
  const { isConnected } = useAccount()

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isPreparing,
  } = usePrepareContractWrite({
    addressOrName: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
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
          <SwitchNetwork />
        </Stack>
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <WalletSelector />
    </PreviewWrapper>
  )
}
