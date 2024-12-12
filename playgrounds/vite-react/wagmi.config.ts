import { defineConfig } from '@wagmi/cli'
import { foundry, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    foundry({
      namePrefix: 'foundry',
      project: '../../packages/cli/src/plugins/__fixtures__/foundry',
    }),
    hardhat({
      namePrefix: 'hardhat',
      project: '../../packages/cli/src/plugins/__fixtures__/hardhat',
    }),
  ],
})
