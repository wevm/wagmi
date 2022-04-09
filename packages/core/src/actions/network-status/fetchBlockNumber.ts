import { getProvider } from '../providers'

export type FetchBlockNumberArgs = {
  chainId?: number
}

export type FetchBlockNumberResult = number

export async function fetchBlockNumber({
  chainId,
}: FetchBlockNumberArgs = {}): Promise<FetchBlockNumberResult> {
  const provider = getProvider({ chainId })
  const blockNumber = await provider.getBlockNumber()
  return blockNumber
}
