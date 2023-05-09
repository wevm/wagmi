import { getPublicClient } from '../viem'

export type FetchBlockNumberArgs = {
  chainId?: number
}

export type FetchBlockNumberResult = bigint

export async function fetchBlockNumber({
  chainId,
}: FetchBlockNumberArgs = {}): Promise<FetchBlockNumberResult> {
  const publicClient = getPublicClient({ chainId })
  const blockNumber = await publicClient.getBlockNumber()
  return blockNumber
}
