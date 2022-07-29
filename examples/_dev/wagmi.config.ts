import { defineConfig, etherscan } from '@wagmi/cli'

const source = etherscan({
  apiKey: 'MK9NWF5JSK6JPWDMVTIJF4RZ466VD2XEPZ',
})

export default defineConfig({
  contracts: [
    {
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      name: 'WagmiMintExample',
      chainId: 1,
      source,
    },
    {
      address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
      name: 'WagmiMintExample',
      chainId: 1,
      source,
    },
  ],
})
