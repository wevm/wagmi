// src/constants/blockExplorers.ts
var etherscanBlockExplorers = {
  mainnet: {
    name: "Etherscan",
    url: "https://etherscan.io"
  },
  goerli: {
    name: "Etherscan",
    url: "https://goerli.etherscan.io"
  },
  sepolia: {
    name: "Etherscan",
    url: "https://sepolia.etherscan.io"
  },
  optimism: {
    name: "Etherscan",
    url: "https://optimistic.etherscan.io"
  },
  optimismGoerli: {
    name: "Etherscan",
    url: "https://goerli-optimism.etherscan.io"
  },
  polygon: {
    name: "PolygonScan",
    url: "https://polygonscan.com"
  },
  polygonMumbai: {
    name: "PolygonScan",
    url: "https://mumbai.polygonscan.com"
  },
  fantom: {
    name: "FTMScan",
    url: "https://ftmscan.com/"
  },
  fantomTest: {
    name: "FTMScan",
    url: "https://testnet.ftmscan.com/"
  },
  arbitrum: { name: "Arbiscan", url: "https://arbiscan.io" },
  arbitrumGoerli: { name: "Arbiscan", url: "https://goerli.arbiscan.io" }
};

// src/constants/rpcs.ts
var alchemyRpcUrls = {
  mainnet: "https://eth-mainnet.alchemyapi.io/v2",
  goerli: "https://eth-goerli.alchemyapi.io/v2",
  optimism: "https://opt-mainnet.g.alchemy.com/v2",
  optimismGoerli: "https://opt-goerli.g.alchemy.com/v2",
  polygon: "https://polygon-mainnet.g.alchemy.com/v2",
  polygonMumbai: "https://polygon-mumbai.g.alchemy.com/v2",
  fantom: "https://rpc.ankr.com/fantom/",
  fantomTest: "https://rpc.testnet.fantom.network/",
  arbitrum: "https://arb-mainnet.g.alchemy.com/v2",
  arbitrumGoerli: "https://arb-goerli.g.alchemy.com/v2"
};
var infuraRpcUrls = {
  mainnet: "https://mainnet.infura.io/v3",
  goerli: "https://goerli.infura.io/v3",
  sepolia: "https://sepolia.infura.io/v3",
  optimism: "https://optimism-mainnet.infura.io/v3",
  optimismGoerli: "https://optimism-goerli.infura.io/v3",
  polygon: "https://polygon-mainnet.infura.io/v3",
  polygonMumbai: "https://polygon-mumbai.infura.io/v3",
  fantom: "https://rpc.ankr.com/fantom/",
  fantomTest: "https://rpc.testnet.fantom.network/",
  arbitrum: "https://arbitrum-mainnet.infura.io/v3",
  arbitrumGoerli: "https://arbitrum-goerli.infura.io/v3"
};
var publicRpcUrls = {
  mainnet: "https://cloudflare-eth.com",
  goerli: "https://rpc.ankr.com/eth_goerli",
  sepolia: "https://rpc.sepolia.org",
  optimism: "https://mainnet.optimism.io",
  optimismGoerli: "https://goerli.optimism.io",
  polygon: "https://polygon-rpc.com",
  polygonMumbai: "https://matic-mumbai.chainstacklabs.com",
  fantom: "https://rpc.ankr.com/fantom/",
  fantomTest: "https://rpc.testnet.fantom.network/",
  arbitrum: "https://arb1.arbitrum.io/rpc",
  arbitrumGoerli: "https://goerli-rollup.arbitrum.io/rpc"
};

// src/constants/chains.ts
var chainId = {
  mainnet: 1,
  goerli: 5,
  sepolia: 11155111,
  optimism: 10,
  optimismGoerli: 420,
  polygon: 137,
  polygonMumbai: 80001,
  fantom: 250,
  fantomTest: 4002,
  arbitrum: 42161,
  arbitrumGoerli: 421613,
  localhost: 1337,
  hardhat: 31337,
  foundry: 31337
};
var mainnet = {
  id: chainId.mainnet,
  name: "Ethereum",
  network: "homestead",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.mainnet,
    default: publicRpcUrls.mainnet,
    infura: infuraRpcUrls.mainnet,
    public: publicRpcUrls.mainnet
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.mainnet,
    default: etherscanBlockExplorers.mainnet
  },
  ens: {
    address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 14353601
  }
};
var goerli = {
  id: chainId.goerli,
  name: "Goerli",
  network: "goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.goerli,
    default: publicRpcUrls.goerli,
    infura: infuraRpcUrls.goerli,
    public: publicRpcUrls.goerli
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.goerli,
    default: etherscanBlockExplorers.goerli
  },
  ens: {
    address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 6507670
  },
  testnet: true
};
var sepolia = {
  id: chainId.sepolia,
  name: "Sepolia",
  network: "sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: publicRpcUrls.sepolia,
    infura: infuraRpcUrls.sepolia,
    public: publicRpcUrls.sepolia
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.sepolia,
    default: etherscanBlockExplorers.sepolia
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 751532
  },
  testnet: true
};
var optimism = {
  id: chainId.optimism,
  name: "Optimism",
  network: "optimism",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.optimism,
    default: publicRpcUrls.optimism,
    infura: infuraRpcUrls.optimism,
    public: publicRpcUrls.optimism
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.optimism,
    default: etherscanBlockExplorers.optimism
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 4286263
  }
};
var optimismGoerli = {
  id: chainId.optimismGoerli,
  name: "Optimism Goerli",
  network: "optimism-goerli",
  nativeCurrency: {
    name: "Goerli Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.optimismGoerli,
    default: publicRpcUrls.optimismGoerli,
    infura: infuraRpcUrls.optimismGoerli,
    public: publicRpcUrls.optimismGoerli
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.optimismGoerli,
    default: etherscanBlockExplorers.optimismGoerli
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 49461
  },
  testnet: true
};
var polygon = {
  id: chainId.polygon,
  name: "Polygon",
  network: "matic",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.polygon,
    default: publicRpcUrls.polygon,
    infura: infuraRpcUrls.polygon,
    public: publicRpcUrls.polygon
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.polygon,
    default: etherscanBlockExplorers.polygon
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 25770160
  }
};
var polygonMumbai = {
  id: chainId.polygonMumbai,
  name: "Polygon Mumbai",
  network: "maticmum",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.polygonMumbai,
    default: publicRpcUrls.polygonMumbai,
    infura: infuraRpcUrls.polygonMumbai,
    public: publicRpcUrls.polygonMumbai
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.polygonMumbai,
    default: etherscanBlockExplorers.polygonMumbai
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 25444704
  },
  testnet: true
};
var fantom = {
  id: chainId.fantom,
  name: "Fantom",
  network: "fantom",
  nativeCurrency: { name: "FTM", symbol: "FTM", decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.fantom,
    default: publicRpcUrls.fantom,
    infura: infuraRpcUrls.fantom,
    public: publicRpcUrls.fantom
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.fantom,
    default: etherscanBlockExplorers.fantom
  },
  multicall: {
    address: "0xc61eD1b8c58bcf0493AC995f481dcCDD16168925",
    blockCreated: 50105758
  }
};
var fantomTest = {
  id: chainId.fantomTest,
  name: "FantomTest",
  network: "fantomTest",
  nativeCurrency: { name: "FTM", symbol: "FTM", decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.fantomTest,
    default: publicRpcUrls.fantomTest,
    infura: infuraRpcUrls.fantomTest,
    public: publicRpcUrls.fantomTest
  },
  blockExplorers: {
    etherscan: etherscanBlockExplorers.fantomTest,
    default: etherscanBlockExplorers.fantomTest
  },
  multicall: {
    address: "0x2B2d6557cD5F3A804a7922cC19E9396A830A86B1",
    blockCreated: 11437448
  }
};
var arbitrum = {
  id: chainId.arbitrum,
  name: "Arbitrum One",
  network: "arbitrum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    alchemy: alchemyRpcUrls.arbitrum,
    default: publicRpcUrls.arbitrum,
    infura: infuraRpcUrls.arbitrum,
    public: publicRpcUrls.arbitrum
  },
  blockExplorers: {
    arbitrum: {
      name: "Arbitrum Explorer",
      url: "https://explorer.arbitrum.io"
    },
    etherscan: etherscanBlockExplorers.arbitrum,
    default: etherscanBlockExplorers.arbitrum
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 7654707
  }
};
var arbitrumGoerli = {
  id: chainId.arbitrumGoerli,
  name: "Arbitrum Goerli",
  network: "arbitrum-goerli",
  nativeCurrency: {
    name: "Arbitrum Goerli Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    alchemy: alchemyRpcUrls.arbitrumGoerli,
    default: publicRpcUrls.arbitrumGoerli,
    infura: infuraRpcUrls.arbitrumGoerli,
    public: publicRpcUrls.arbitrumGoerli
  },
  blockExplorers: {
    arbitrum: {
      name: "Arbitrum Explorer",
      url: "https://goerli-rollup-explorer.arbitrum.io"
    },
    etherscan: etherscanBlockExplorers.arbitrumGoerli,
    default: etherscanBlockExplorers.arbitrumGoerli
  },
  multicall: {
    address: "0xca11bde05977b3631167028862be2a173976ca11",
    blockCreated: 88114
  },
  testnet: true
};
var localhost = {
  id: chainId.localhost,
  name: "Localhost",
  network: "localhost",
  rpcUrls: {
    default: "http://127.0.0.1:8545"
  }
};
var hardhat = {
  id: chainId.hardhat,
  name: "Hardhat",
  network: "hardhat",
  rpcUrls: {
    default: "http://127.0.0.1:8545"
  }
};
var foundry = {
  id: chainId.foundry,
  name: "Foundry",
  network: "foundry",
  rpcUrls: {
    default: "http://127.0.0.1:8545"
  }
};
var chain = {
  mainnet,
  goerli,
  sepolia,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  fantom,
  fantomTest,
  arbitrum,
  arbitrumGoerli,
  localhost,
  hardhat,
  foundry
};
var allChains = [
  mainnet,
  goerli,
  sepolia,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  fantom,
  fantomTest,
  arbitrum,
  arbitrumGoerli,
  localhost,
  hardhat,
  foundry
];
var defaultChains = [mainnet, goerli];
var defaultL2Chains = [
  arbitrum,
  arbitrumGoerli,
  optimism,
  optimismGoerli
];

export {
  etherscanBlockExplorers,
  alchemyRpcUrls,
  infuraRpcUrls,
  publicRpcUrls,
  chainId,
  mainnet,
  goerli,
  sepolia,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  fantom,
  fantomTest,
  arbitrum,
  arbitrumGoerli,
  localhost,
  hardhat,
  foundry,
  chain,
  allChains,
  defaultChains,
  defaultL2Chains
};
