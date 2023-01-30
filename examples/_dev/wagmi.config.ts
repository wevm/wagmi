import { defineConfig } from '@wagmi/cli'
import { actions, erc, etherscan, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'Wagmipet',
      address: {
        1: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
      },
      abi: [
        {
          inputs: [{ type: 'address' }],
          name: 'love',
          outputs: [{ type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
    },
  ],
  plugins: [
    erc(),
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: 1,
      contracts: [
        {
          name: 'WagmiMintEtherscan',
          address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        },
        {
          name: 'EnsRegistry',
          address: {
            1: '0x314159265dd8dbb310642f98f50c066173c1259b',
            5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
          },
        },
      ],
    }),
    react(),
    actions(),
  ],
})
