import { WithProvider } from '../../types'

export type BlockNumberActionArgs = WithProvider<unknown>

export type BlockNumberActionResult = number

export const blockNumberAction = async ({
  provider,
}: BlockNumberActionArgs): Promise<BlockNumberActionResult> => {
  const blockNumber = await provider.getBlockNumber()
  return blockNumber
}
