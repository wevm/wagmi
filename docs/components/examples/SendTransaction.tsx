import { Box, Button, Input, Stack, Text } from 'degen'
import * as React from 'react'
import { parseEther } from 'viem'
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

import { PreviewWrapper } from '../core'
import { Account, WalletSelector } from '../web3'

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export function SendTransaction() {
  const { isConnected } = useAccount()

  const [to, setTo] = React.useState('')
  const debouncedTo = useDebounce(to, 500)

  const [value, setValue] = React.useState('')
  const debouncedValue = useDebounce(value, 500)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isLoading: isPreparing,
  } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedValue ? parseEther(debouncedValue) : undefined,
    },
  })
  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction(config)
  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  if (isConnected)
    return (
      <PreviewWrapper>
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault()
            if (isLoading || isConfirming) return
            sendTransaction?.()
          }}
        >
          <Stack>
            <Account />
            <Input
              onChange={(e) => setTo(e.target.value)}
              label="Recipient"
              placeholder="0xA0Cf…251e"
              value={to}
            />
            <Input
              onChange={(e) => setValue(e.target.value)}
              label="Amount (ether)"
              placeholder="0.05"
              type="number"
              value={value}
            />
            <Button
              disabled={!sendTransaction || !to || !value}
              loading={isPreparing || isLoading || isConfirming}
              width="full"
            >
              {isLoading
                ? 'Check wallet...'
                : isConfirming
                ? 'Sending...'
                : 'Send'}
            </Button>
            {isSuccess && (
              <Text>
                Success!{' '}
                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
              </Text>
            )}
            {isPrepareError && (
              <Text color="red">Error: {prepareError?.message}</Text>
            )}
            {isError && <Text color="red">Error: {error?.message}</Text>}
          </Stack>
        </Box>
      </PreviewWrapper>
    )

  return (
    <PreviewWrapper>
      <WalletSelector />
    </PreviewWrapper>
  )
}
