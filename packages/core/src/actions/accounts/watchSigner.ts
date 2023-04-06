import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { FetchSignerArgs, FetchSignerResult } from './fetchSigner'
import { fetchSigner } from './fetchSigner'

export type WatchSignerArgs = FetchSignerArgs

export type WatchSignerCallback = (data: FetchSignerResult) => void

export function watchSigner(
  { chainId }: WatchSignerArgs,
  callback: WatchSignerCallback,
) {
  const client = getClient()
  const handleChange = async () => {
    const signer = await fetchSigner({ chainId })
    if (!getClient().connector) return callback(null)
    return callback(signer)
  }
  const unsubscribe = client.subscribe(
    ({ data, connector }) => ({
      account: data?.account,
      chainId: data?.chain?.id,
      connector,
    }),
    handleChange,
    {
      equalityFn: shallow,
    },
  )
  return unsubscribe
}
