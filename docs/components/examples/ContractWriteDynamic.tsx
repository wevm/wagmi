import { Button, Input, Stack, Text } from 'degen'
import * as React from 'react'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { useDebounce } from '../../hooks'

import { PreviewWrapper } from '../core'
import { Account, SwitchNetwork, WalletSelector } from '../web3'

export function ContractWriteDynamic() {
  const { isConnected } = useAccount()

  const [tokenId, setTokenId] = React.useState('')
  const debouncedTokenId = useDebounce(tokenId)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isPreparing,
  } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
        outputs: [],
      },
    ],
    functionName: 'mint',
    args: [parseInt(debouncedTokenId)],
    enabled: Boolean(debouncedTokenId),
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
  const { chain } = useNetwork()

  if (isConnected)
    return (
      <PreviewWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            write?.()
          }}
        >
          <Stack>
            <Account />
            <Input
              label="Token ID"
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="69"
              value={tokenId}
            />
            <Button
              disabled={isPreparing || isWriteLoading || isConfirming}
              loading={isPreparing || isWriteLoading || isConfirming}
              width="full"
              type="submit"
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
                <a
                  href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}
                >
                  Etherscan
                </a>
              </Text>
            )}
            <SwitchNetwork />
          </Stack>
        </form>
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <WalletSelector />
    </PreviewWrapper>
  )
}
