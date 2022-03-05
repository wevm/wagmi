import { wagmiClient } from '../../client'
import {
  FetchEnsAvatarArgs,
  FetchEnsAvatarResult,
  fetchEnsAvatar,
} from './fetchEnsAvatar'

export type WatchEnsAvatarCallback = (
  addressOrName: FetchEnsAvatarResult,
) => void

export function watchEnsAvatar(
  args: FetchEnsAvatarArgs,
  callback: WatchEnsAvatarCallback,
) {
  const handleChange = async () => callback(await fetchEnsAvatar(args))
  const unsubscribe = wagmiClient.subscribe(
    ({ connector, provider }) => [connector, provider],
    handleChange,
  )
  return unsubscribe
}
