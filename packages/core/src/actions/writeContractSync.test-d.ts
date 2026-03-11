import { abi } from '@wagmi/test'
import { type Address, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, tempoLocalnet } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type WriteContractSyncParameters,
  writeContractSync,
} from './writeContractSync.js'

test('tempo feePayer', () => {
  const feePayer = privateKeyToAccount(
    '0x0123456789012345678901234567890123456789012345678901234567890123',
  )

  const config = createConfig({
    chains: [mainnet, tempoLocalnet],
    transports: { [mainnet.id]: http(), [tempoLocalnet.id]: http() },
  })

  writeContractSync(config, {
    chainId: tempoLocalnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feePayer: true,
  })

  writeContractSync(config, {
    chainId: tempoLocalnet.id,
    address: '0x',
    abi: abi.erc20,
    functionName: 'transferFrom',
    args: ['0x', '0x', 123n],
    feePayer,
  })

  type Result = WriteContractSyncParameters<
    typeof abi.erc20,
    'transferFrom',
    [Address, Address, bigint],
    typeof config,
    typeof mainnet.id
  >
  ;(() => {
    const parameters: Result = {
      chainId: mainnet.id,
      address: '0x',
      abi: abi.erc20,
      functionName: 'transferFrom',
      args: ['0x', '0x', 123n],
      // @ts-expect-error
      feePayer: true,
    }
    return parameters
  })()

  expectTypeOf<Result>().not.toMatchTypeOf<{
    feePayer?: true | typeof feePayer | undefined
  }>()
})
