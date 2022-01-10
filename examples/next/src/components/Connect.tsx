import * as React from 'react'
import { useConnect } from 'wagmi'

const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return mounted
}

export const Connect = () => {
  const isMounted = useIsMounted()
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()
  return (
    <div>
      <div>
        {connectors.map((x) => (
          <button
            disabled={isMounted ? !x.ready : false}
            key={x.id}
            onClick={() => connect(x)}
          >
            {isMounted ? x.name : x.id === 'injected' ? x.id : x.name}
            {isMounted ? !x.ready && ' (unsupported)' : ''}
            {loading && x.name === connector?.name && '…'}
          </button>
        ))}
      </div>
      <div>{error && (error?.message ?? 'Failed to connect')}</div>
    </div>
  )
}
