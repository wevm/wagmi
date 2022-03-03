import { wagmiClient } from '../../client'

export async function fetchBlockNumber() {
  const blockNumber = await wagmiClient.provider.getBlockNumber()
  return blockNumber
}
