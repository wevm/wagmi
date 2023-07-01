import type { Abi } from 'abitype'
import type {
  Account,
  Chain,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain } from '../../utils'
import { getWalletClient } from '../viem'
import type { PrepareWriteContractConfig } from './prepareWriteContract'
import { prepareWriteContract } from './prepareWriteContract'

export type WriteContractMode = 'prepared' | undefined

export type WriteContractPreparedArgs<
  TAbi extends Abi | readonly unknown[] = readonly unknown[],
  TFunctionName extends string = string,
> = {
  /** Chain id. */
  chainId?: number
  mode: 'prepared'
  request: WriteContractParameters<TAbi, TFunctionName, Chain, Account>
}

export type WriteContractUnpreparedArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = Omit<
  WriteContractParameters<TAbi, TFunctionName, Chain, Account>,
  'chain'
> & {
  /** Chain id. */
  chainId?: number
  mode?: never
}

export type WriteContractArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> =
  | WriteContractPreparedArgs<TAbi, TFunctionName>
  | WriteContractUnpreparedArgs<TAbi, TFunctionName>

export type WriteContractResult = { hash: WriteContractReturnType }

/**
 * @description Function to call a contract write method.
 *
 * It is recommended to pair this with the {@link prepareWriteContract} function
 * to avoid [UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { prepareWriteContract, writeContract } from '@wagmi/core'
 *
 * const config = await prepareWriteContract({
 *   address: '0x...',
 *   abi: wagmiAbi,
 *   functionName: 'mint',
 * })
 * const result = await writeContract(config)
 */
export async function writeContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  config:
    | WriteContractUnpreparedArgs<TAbi, TFunctionName>
    | WriteContractPreparedArgs<TAbi, TFunctionName>,
): Promise<WriteContractResult> {
  const walletClient = await getWalletClient({ chainId: config.chainId })
  if (!walletClient) throw new ConnectorNotFoundError()
  if (config.chainId) assertActiveChain({ chainId: config.chainId })

  let request: WriteContractParameters<TAbi, TFunctionName, Chain, Account>
  if (config.mode === 'prepared') {
    request = config.request
  } else {
    const { chainId: _, mode: __, ...args } = config
    const res = await prepareWriteContract(args as PrepareWriteContractConfig)
    request = res.request as unknown as WriteContractParameters<
      TAbi,
      TFunctionName,
      Chain,
      Account
    >
  }

  const hash = await walletClient.writeContract({
    ...request,
    chain: null,
  } as WriteContractParameters<TAbi, TFunctionName, Chain, Account>)

  return { hash }
}
