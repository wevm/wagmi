import { client } from '../../client'
import { GetAccountResult, getAccount } from './getAccount'

export type WatchAccountCallback = (data: GetAccountResult) => void

export function watchAccount(callback: WatchAccountCallback) {
  const handleChange = () => callback(getAccount())
  const unsubscribe = client.subscribe(
    ({ data, connector }) => ({
      account: data?.account,
      connector,
    }),
    handleChange,
    {
      equalityFn: (selected, previous) =>
        selected.account === previous.account &&
        selected.connector === previous.connector,
    },
  )
  return unsubscribe
}
