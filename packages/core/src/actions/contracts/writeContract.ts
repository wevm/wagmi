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
> = WriteContractParameters<TAbi, TFunctionName, Chain, Account> & {
  mode: 'prepared'
  /** Chain id. */
  chainId?: number
}

export type WriteContractUnpreparedArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = Omit<
  WriteContractParameters<TAbi, TFunctionName, Chain, Account>,
  'account' | 'chain'
> & {
  mode?: never
  /** Chain id. */
  chainId?: number
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
  const walletClient = await getWalletClient()
  if (!walletClient) throw new ConnectorNotFoundError()
  if (config.chainId)
    assertActiveChain({ chainId: config.chainId, walletClient })

  let request: WriteContractParameters<TAbi, TFunctionName, Chain, Account>
  if (config.mode === 'prepared') {
    request = config
  } else {
    const { chainId, mode, ...args } = config
    const res = await prepareWriteContract(args as PrepareWriteContractConfig)
    request = res.request as unknown as WriteContractParameters<
      TAbi,
      TFunctionName,
      Chain,
      Account
    >
  }

  const hash = await walletClient.writeContract({ ...request, chain: null })

  return { hash }
}
