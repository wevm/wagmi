import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { Signer } from '../../types'
import type { FetchSignerArgs, FetchSignerResult } from './fetchSigner'
import { fetchSigner } from './fetchSigner'

export type WatchSignerArgs = FetchSignerArgs

export type WatchSignerCallback<TSigner extends Signer = Signer> = (
  data: FetchSignerResult<TSigner>,
) => void

export function watchSigner<TSigner extends Signer = Signer>(
  { chainId }: WatchSignerArgs,
  callback: WatchSignerCallback<TSigner>,
) {
  const client = getClient()
  const handleChange = async () => {
    const signer = await fetchSigner<TSigner>({ chainId })
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
