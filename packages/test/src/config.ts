import { dangerous_secp256k1 } from '@wagmi/connectors'
import { createConfig, mock } from '@wagmi/core'
import { http } from 'viem'
import { mainnet, mainnet2, optimism, tempoLocal } from './chains.js'
import { accounts, tempoAccounts } from './constants.js'

export const config = createConfig({
  chains: [mainnet, mainnet2, optimism, tempoLocal],
  connectors: [
    mock({ accounts }),
    mock({ accounts: reverse(accounts) }),
    dangerous_secp256k1({ account: tempoAccounts.at(0) }),
    dangerous_secp256k1({ account: tempoAccounts.at(1) }),
  ],
  pollingInterval: 100,
  storage: null,
  transports: {
    [mainnet.id]: http(),
    [mainnet2.id]: http(),
    [optimism.id]: http(),
    [tempoLocal.id]: http(),
  },
})

type Reverse<
  list extends readonly unknown[],
  ///
  result extends readonly unknown[] = [],
> = list extends readonly [infer head, ...infer tail]
  ? Reverse<tail, [head, ...result]>
  : result

function reverse<list extends readonly unknown[]>(list: list): Reverse<list> {
  return [...list].reverse() as Reverse<list>
}
