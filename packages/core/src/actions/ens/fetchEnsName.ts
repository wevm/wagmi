import { wagmiClient } from '../../client'

export type FetchEnsNameArgs = {
  address: string
}

export type FetchEnsNameResult = {
  ensName: string | null
}

export async function fetchEnsName({
  address,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
  const ensName = await wagmiClient.provider.lookupAddress(address)

  return {
    ensName,
  }
}
