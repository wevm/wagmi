import { useWatchPendingTransactions } from 'wagmi-react'

export const WatchPendingTransactions = () => {
  useWatchPendingTransactions({ listener: (tx) => console.log(tx) })

  return null
}
