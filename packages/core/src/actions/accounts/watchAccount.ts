import { getClient } from '../../client'
import { Provider } from '../../types'
import { GetAccountResult, getAccount } from './getAccount'

export type WatchAccountCallback<TProvider extends Provider = Provider> = (
  data: GetAccountResult<TProvider>,
) => void

export function watchAccount<TProvider extends Provider>(
  callback: WatchAccountCallback<TProvider>,
) {
  const client = getClient()
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
