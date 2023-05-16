import { mainnet } from '@wagmi/chains'
import { type Chain } from '@wagmi/core'

import { type PartialBy } from '../src/types.js'

/**
 * The id of the current test worker.
 *
 * This is used by the anvil proxy to route requests to the correct anvil instance.
 */
export const pool = Number(process.env.VITEST_POOL_ID ?? 1)

// Test accounts
export const accounts = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
] as const

// Named accounts
export const [ALICE, BOB] = accounts

type ForkChain = Chain & { port: number }

const getForkChain = ({
  port,
  ...rest
}: PartialBy<
  Omit<ForkChain, 'rpcUrls'>,
  'name' | 'network' | 'nativeCurrency'
>): ForkChain => ({
  ...mainnet, // We are using a mainnet fork for testing.
  ...rest,
  port,
  rpcUrls: {
    // These rpc urls are automatically used in the transports.
    default: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:${port}/${pool}`],
      webSocket: [`ws://127.0.0.1:${port}/${pool}`],
    },
    public: {
      // Note how we append the worker id to the local rpc urls.
      http: [`http://127.0.0.1:${port}/${pool}`],
      webSocket: [`ws://127.0.0.1:${port}/${pool}`],
    },
  },
})

export const testChains = {
  anvil: getForkChain({ id: 123, port: 8547 }),
  anvilTwo: getForkChain({
    id: 456,
    port: 8548,
    nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
  }),
} as const satisfies Record<string, ForkChain>

export let forkUrl: string
if (process.env.VITE_ANVIL_FORK_URL) forkUrl = process.env.VITE_ANVIL_FORK_URL
else forkUrl = 'https://cloudflare-eth.com'

export let forkBlockNumber: bigint
if (process.env.VITE_ANVIL_BLOCK_NUMBER)
  forkBlockNumber = BigInt(Number(process.env.VITE_ANVIL_BLOCK_NUMBER))
else forkBlockNumber = 16280770n
