import { client } from '../../client'
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
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
