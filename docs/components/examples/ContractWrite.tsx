import { Button, Stack, Text } from 'degen'
import {
  useAccount,
  useContractWrite,
  useNetwork,
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
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
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
  const { chain } = useNetwork()

  if (isConnected)
    return (
      <PreviewWrapper>
        <Stack>
          <Account />
          <Button
            disabled={isPreparing || isWriteLoading || isConfirming}
            loading={isPreparing || isWriteLoading || isConfirming}
            onClick={() => write?.()}
            center
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
              <a
                href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}
              >
                Etherscan
              </a>
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
