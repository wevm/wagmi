import { useWatchPendingTransactions } from 'wagmi'

export const WatchPendingTransactions = () => {
  useWatchPendingTransactions({ listener: (tx) => console.log(tx) })

  return null
}
