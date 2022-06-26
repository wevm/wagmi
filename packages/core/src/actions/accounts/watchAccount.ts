import shallow from 'zustand/shallow'

import { getClient } from '../../client'
import { Connector } from '../../connectors'
import { Provider } from '../../types'
import { GetAccountResult, getAccount } from './getAccount'

export type WatchAccountCallback<TProvider extends Provider = Provider> = (
  data: GetAccountResult<TProvider>,
) => void

export type WatchAccountConfig = {
  selector?({
    address,
    connector,
    status,
  }: {
    address?: string
    connector?: Connector
    status: GetAccountResult['status']
  }): any
}

export function watchAccount<TProvider extends Provider>(
  callback: WatchAccountCallback<TProvider>,
  { selector = (x) => x }: WatchAccountConfig = {},
) {
  const client = getClient()
  const handleChange = () => callback(getAccount())
  const unsubscribe = client.subscribe(
    ({ data, connector, status }) =>
      selector({
        address: data?.account,
        connector,
        status,
      }),
    handleChange,
    {
      equalityFn: shallow,
    },
  )
  return unsubscribe
}
