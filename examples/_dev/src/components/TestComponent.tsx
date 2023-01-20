import { useState } from 'react'
import { useAccount } from 'wagmi'

export const TestComponent = () => {
  const [showEmoji, setShowEmoji] = useState(false)
  useAccount({
    onConnect: () => setShowEmoji(true),
    onDisconnect: () => setShowEmoji(false),
  })

  console.log({ showEmoji })

  if (showEmoji) return <div>🌈</div>
  return null
}
