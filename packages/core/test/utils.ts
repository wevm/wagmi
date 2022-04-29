import { providers } from 'ethers'
import { Wallet } from 'ethers/lib/ethers'

import { Chain, allChains, chain as chain_ } from '../src'

export function getNetwork(chain: Chain) {
  return {
    chainId: chain.id,
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    name: chain.name,
  }
}

class EthersProviderWrapper extends providers.StaticJsonRpcProvider {
  toJSON() {
    return `<Provider network={${this.network.chainId}} />`
  }
}

export function getProvider({ chainId }: { chainId?: number } = {}) {
  const chain = allChains.find((x) => x.id === chainId) ?? chain_.hardhat
  const network = getNetwork(chain)
  const url = chain_.hardhat.rpcUrls.default.toString()
  const provider = new EthersProviderWrapper(url, network)
  provider.pollingInterval = 1_000
  return provider
}

class EthersWebSocketProviderWrapper extends providers.WebSocketProvider {
  toJSON() {
    return `<WebSocketProvider network={${this.network.chainId}} />`
  }
}

export function getWebSocketProvider({ chainId }: { chainId?: number } = {}) {
  const chain = allChains.find((x) => x.id === chainId) ?? chain_.hardhat
  const network = getNetwork(chain)
  const url = chain_.hardhat.rpcUrls.default.toString().replace('http', 'ws')
  return new EthersWebSocketProviderWrapper(url, network)
}

// TODO: Figure out why this is flaky
// Throws "Expected private key to be an Uint8Array"
// from "packages/hardhat-core/src/internal/util/keys-derivation.ts"
// const accounts = normalizeHardhatNetworkAccountsConfig(
//   defaultHardhatNetworkParams.accounts,
// )
export const accounts = [
  {
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0',
    balance: '10000000000000000000000',
  },
  {
    privateKey:
      '0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e',
    balance: '10000000000000000000000',
  },
]

export function getSigners() {
  const provider = getProvider()
  const signers = accounts.map((x) => {
    const wallet = new Wallet(x.privateKey)
    return provider.getSigner(wallet.address)
  })
  return signers
}
