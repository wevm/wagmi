import * as React from 'react'
import { verifyMessage } from 'ethers/lib/utils'
import { useSignMessage } from 'wagmi'

export const SignMessage = () => {
  const previousMessage = React.useRef<string>()
  const [message, setMessage] = React.useState('')
  const [{ data, error, loading }, signMessage] = useSignMessage()

  const recoveredAddress = React.useMemo(() => {
    if (!data || !previousMessage.current) return undefined
    return verifyMessage(previousMessage.current, data)
  }, [data, previousMessage])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        previousMessage.current = message
        signMessage({ message })
      }}
    >
      <div>
        <label htmlFor="message">Enter Message to Sign</label>
      </div>
      <input
        placeholder="Message"
        id="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button disabled={loading || !message.length}>Sign message</button>

      {data && (
        <div>
          <div>Signature: {data}</div>
          <div>Recovered Address: {recoveredAddress}</div>
        </div>
      )}
      {error && <div>Error signing message</div>}
    </form>
  )
}
