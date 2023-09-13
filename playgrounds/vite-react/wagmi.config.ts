import { defineConfig } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    etherscan({
      apiKey: 'MK9NWF5JSK6JPWDMVTIJF4RZ466VD2XEPZ',
      chainId: 1,
      contracts: [
        {
          name: 'WagmiMint',
          address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        },
      ],
    }),
  ],
})
