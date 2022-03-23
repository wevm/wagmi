import { client } from '../../client'

export type FetchBlockNumberResult = number

export async function fetchBlockNumber() {
  const blockNumber = await client.provider.getBlockNumber()
  return blockNumber
}
