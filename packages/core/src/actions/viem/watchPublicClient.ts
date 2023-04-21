import { getClient } from '../../client'
import type { PublicClient } from '../../types'
import type {
  GetPublicClientArgs,
  GetPublicClientResult,
} from './getPublicClient'
import { getPublicClient } from './getPublicClient'

export type WatchPublicClientCallback<
  TPublicClient extends PublicClient = PublicClient,
> = (PublicClient: GetPublicClientResult<TPublicClient>) => void

export function watchPublicClient<
  TPublicClient extends PublicClient = PublicClient,
>(
  args: GetPublicClientArgs,
  callback: WatchPublicClientCallback<TPublicClient>,
) {
  const client = getClient()
  const handleChange = async () =>
    callback(getPublicClient<TPublicClient>(args))
  const unsubscribe = client.subscribe(
    ({ publicClient }) => publicClient,
    handleChange,
  )
  return unsubscribe
}
