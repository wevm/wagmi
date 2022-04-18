import * as React from 'react'
import { verifyMessage } from 'ethers/lib/utils'
import { useSignMessage } from 'wagmi'

export const SignMessage = () => {
  const signMessage = useSignMessage()

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const element = event.target as HTMLFormElement
          const formData = new FormData(element)
          const message = formData.get('message') as string
          signMessage.signMessage({ message })
        }}
      >
        <input name="message" type="text" required />
        <button disabled={signMessage.isLoading}>
          {signMessage.isLoading ? 'Check Wallet' : 'Sign Message'}
        </button>
      </form>

      {signMessage.data && (
        <div>
          <div>signature {signMessage.data}</div>
          <div>
            recovered address{' '}
            {verifyMessage(
              signMessage.variables?.message as string,
              signMessage.data,
            )}
          </div>
        </div>
      )}

      <div>
        {signMessage.error &&
          (signMessage.error?.message ?? 'Failed to sign message')}
      </div>
    </div>
  )
}
