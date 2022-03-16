import { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/PjT72qifrAFZ4WV_drrd30N5onftY5VA`,
        blockNumber: 14297676,
      },
    },
  },
}

export default config
