import type { BaseProvider } from '@ethersproject/providers'

import { client } from '../../client'
import { GetAccountResult, getAccount } from './getAccount'

export type WatchAccountCallback<
  TProvider extends BaseProvider = BaseProvider,
> = (data: GetAccountResult<TProvider>) => void

export function watchAccount<TProvider extends BaseProvider>(
  callback: WatchAccountCallback<TProvider>,
) {
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
