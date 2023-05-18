import * as React from 'react'
import { recoverMessageAddress } from 'viem'
import type { Address } from 'wagmi'
import { useSignMessage } from 'wagmi'

export const SignMessage = () => {
  const [recoveredAddress, setRecoveredAddress] = React.useState<Address>()
  const {
    data: signature,
    variables,
    error,
    isLoading,
    signMessage,
  } = useSignMessage()

  React.useEffect(() => {
    ;(async () => {
      if (variables?.message && signature) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature,
        })
        setRecoveredAddress(recoveredAddress)
      }
    })()
  }, [signature, variables?.message])

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const element = event.target as HTMLFormElement
          const formData = new FormData(element)
          const message = formData.get('message') as string
          signMessage({ message })
        }}
      >
        <input name="message" type="text" required />
        <button disabled={isLoading}>
          {isLoading ? 'Check Wallet' : 'Sign Message'}
        </button>
      </form>

      {signature && (
        <div>
          <div>signature {signature}</div>
          <div>recovered address {recoveredAddress}</div>
        </div>
      )}

      <div>{error && (error?.message ?? 'Failed to sign message')}</div>
    </div>
  )
}
