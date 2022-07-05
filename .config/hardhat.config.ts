import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_ID}`,
        blockNumber: 14604308,
      },
      loggingEnabled: false,
    },
  },
}

export default config
