import { wagmiClient } from '../../client'

export type FetchBlockNumberResult = number

export async function fetchBlockNumber() {
  const blockNumber = await wagmiClient.provider.getBlockNumber()
  return blockNumber
}
