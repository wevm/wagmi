import {
  SSXInfuraProviderNetworks,
  SSXRPCProviders,
  SSXServer,
} from '@spruceid/ssx-server'

const ssx = new SSXServer({
  providers: {
    rpc: {
      service: SSXRPCProviders.SSXInfuraProvider,
      network:
        process.env.MAINNET === 'false'
          ? SSXInfuraProviderNetworks.GOERLI
          : SSXInfuraProviderNetworks.MAINNET,
      apiKey: process.env.SSX_INFURA_ID ?? '',
    },
  },
})

export default ssx
