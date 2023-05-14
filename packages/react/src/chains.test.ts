import { expect, test } from 'vitest'

import * as chains from './chains.js'

test('exports', () => {
  expect(chains).toMatchInlineSnapshot(`
    {
      "arbitrum": {
        "blockExplorers": {
          "default": {
            "name": "Arbiscan",
            "url": "https://arbiscan.io",
          },
          "etherscan": {
            "name": "Arbiscan",
            "url": "https://arbiscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 7654707,
          },
        },
        "id": 42161,
        "name": "Arbitrum One",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "arbitrum",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://arb-mainnet.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://arb-mainnet.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://arb1.arbitrum.io/rpc",
            ],
          },
          "infura": {
            "http": [
              "https://arbitrum-mainnet.infura.io/v3",
            ],
            "webSocket": [
              "wss://arbitrum-mainnet.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://arb1.arbitrum.io/rpc",
            ],
          },
        },
      },
      "arbitrumGoerli": {
        "blockExplorers": {
          "default": {
            "name": "Arbiscan",
            "url": "https://goerli.arbiscan.io/",
          },
          "etherscan": {
            "name": "Arbiscan",
            "url": "https://goerli.arbiscan.io/",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 88114,
          },
        },
        "id": 421613,
        "name": "Arbitrum Goerli",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Arbitrum Goerli Ether",
          "symbol": "ETH",
        },
        "network": "arbitrum-goerli",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://arb-goerli.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://arb-goerli.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://goerli-rollup.arbitrum.io/rpc",
            ],
          },
          "infura": {
            "http": [
              "https://arbitrum-goerli.infura.io/v3",
            ],
            "webSocket": [
              "wss://arbitrum-goerli.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://goerli-rollup.arbitrum.io/rpc",
            ],
          },
        },
        "testnet": true,
      },
      "arbitrumNova": {
        "blockExplorers": {
          "blockScout": {
            "name": "BlockScout",
            "url": "https://nova-explorer.arbitrum.io/",
          },
          "default": {
            "name": "Arbiscan",
            "url": "https://nova.arbiscan.io",
          },
          "etherscan": {
            "name": "Arbiscan",
            "url": "https://nova.arbiscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 1746963,
          },
        },
        "id": 42170,
        "name": "Arbitrum Nova",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "arbitrum-nova",
        "rpcUrls": {
          "blast": {
            "http": [
              "https://arbitrum-nova.public.blastapi.io",
            ],
            "webSocket": [
              "wss://arbitrum-nova.public.blastapi.io",
            ],
          },
          "default": {
            "http": [
              "https://nova.arbitrum.io/rpc",
            ],
          },
          "public": {
            "http": [
              "https://nova.arbitrum.io/rpc",
            ],
          },
        },
      },
      "aurora": {
        "blockExplorers": {
          "default": {
            "name": "Aurorascan",
            "url": "https://aurorascan.dev",
          },
          "etherscan": {
            "name": "Aurorascan",
            "url": "https://aurorascan.dev",
          },
        },
        "id": 1313161554,
        "name": "Aurora",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "aurora",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.aurora.dev",
            ],
          },
          "infura": {
            "http": [
              "https://aurora-mainnet.infura.io/v3",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.aurora.dev",
            ],
          },
        },
      },
      "auroraTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Aurorascan",
            "url": "https://testnet.aurorascan.dev",
          },
          "etherscan": {
            "name": "Aurorascan",
            "url": "https://testnet.aurorascan.dev",
          },
        },
        "id": 1313161555,
        "name": "Aurora Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "aurora-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://testnet.aurora.dev",
            ],
          },
          "infura": {
            "http": [
              "https://aurora-testnet.infura.io/v3",
            ],
          },
          "public": {
            "http": [
              "https://testnet.aurora.dev",
            ],
          },
        },
        "testnet": true,
      },
      "avalanche": {
        "blockExplorers": {
          "default": {
            "name": "SnowTrace",
            "url": "https://snowtrace.io",
          },
          "etherscan": {
            "name": "SnowTrace",
            "url": "https://snowtrace.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 11907934,
          },
        },
        "id": 43114,
        "name": "Avalanche",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Avalanche",
          "symbol": "AVAX",
        },
        "network": "avalanche",
        "rpcUrls": {
          "default": {
            "http": [
              "https://api.avax.network/ext/bc/C/rpc",
            ],
          },
          "public": {
            "http": [
              "https://api.avax.network/ext/bc/C/rpc",
            ],
          },
        },
      },
      "avalancheFuji": {
        "blockExplorers": {
          "default": {
            "name": "SnowTrace",
            "url": "https://testnet.snowtrace.io",
          },
          "etherscan": {
            "name": "SnowTrace",
            "url": "https://testnet.snowtrace.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 7096959,
          },
        },
        "id": 43113,
        "name": "Avalanche Fuji",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Avalanche Fuji",
          "symbol": "AVAX",
        },
        "network": "avalanche-fuji",
        "rpcUrls": {
          "default": {
            "http": [
              "https://api.avax-test.network/ext/bc/C/rpc",
            ],
          },
          "public": {
            "http": [
              "https://api.avax-test.network/ext/bc/C/rpc",
            ],
          },
        },
        "testnet": true,
      },
      "baseGoerli": {
        "blockExplorers": {
          "default": {
            "name": "Basescan",
            "url": "https://goerli.basescan.org",
          },
          "etherscan": {
            "name": "Basescan",
            "url": "https://goerli.basescan.org",
          },
        },
        "id": 84531,
        "name": "Base Goerli",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Base Goerli",
          "symbol": "ETH",
        },
        "network": "base-goerli",
        "rpcUrls": {
          "default": {
            "http": [
              "https://goerli.base.org",
            ],
          },
          "public": {
            "http": [
              "https://goerli.base.org",
            ],
          },
        },
        "testnet": true,
      },
      "boba": {
        "blockExplorers": {
          "default": {
            "name": "BOBAScan",
            "url": "https://bobascan.com",
          },
          "etherscan": {
            "name": "BOBAScan",
            "url": "https://bobascan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 446859,
          },
        },
        "id": 288,
        "name": "Boba Network",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Boba",
          "symbol": "BOBA",
        },
        "network": "boba",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.boba.network",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.boba.network",
            ],
          },
        },
      },
      "bronos": {
        "blockExplorers": {
          "default": {
            "name": "BronoScan",
            "url": "https://broscan.bronos.org",
          },
        },
        "id": 1039,
        "name": "Bronos",
        "nativeCurrency": {
          "decimals": 18,
          "name": "BRO",
          "symbol": "BRO",
        },
        "network": "bronos",
        "rpcUrls": {
          "default": {
            "http": [
              "https://evm.bronos.org",
            ],
          },
          "public": {
            "http": [
              "https://evm.bronos.org",
            ],
          },
        },
      },
      "bronosTestnet": {
        "blockExplorers": {
          "default": {
            "name": "BronoScan",
            "url": "https://tbroscan.bronos.org",
          },
        },
        "id": 1038,
        "name": "Bronos Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Bronos Coin",
          "symbol": "tBRO",
        },
        "network": "bronos-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://evm-testnet.bronos.org",
            ],
          },
          "public": {
            "http": [
              "https://evm-testnet.bronos.org",
            ],
          },
        },
        "testnet": true,
      },
      "bsc": {
        "blockExplorers": {
          "default": {
            "name": "BscScan",
            "url": "https://bscscan.com",
          },
          "etherscan": {
            "name": "BscScan",
            "url": "https://bscscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 15921452,
          },
        },
        "id": 56,
        "name": "BNB Smart Chain",
        "nativeCurrency": {
          "decimals": 18,
          "name": "BNB",
          "symbol": "BNB",
        },
        "network": "bsc",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.ankr.com/bsc",
            ],
          },
          "public": {
            "http": [
              "https://rpc.ankr.com/bsc",
            ],
          },
        },
      },
      "bscTestnet": {
        "blockExplorers": {
          "default": {
            "name": "BscScan",
            "url": "https://testnet.bscscan.com",
          },
          "etherscan": {
            "name": "BscScan",
            "url": "https://testnet.bscscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 17422483,
          },
        },
        "id": 97,
        "name": "Binance Smart Chain Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "BNB",
          "symbol": "tBNB",
        },
        "network": "bsc-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://data-seed-prebsc-1-s1.binance.org:8545",
            ],
          },
          "public": {
            "http": [
              "https://data-seed-prebsc-1-s1.binance.org:8545",
            ],
          },
        },
        "testnet": true,
      },
      "canto": {
        "blockExplorers": {
          "default": {
            "name": "Canto EVM Explorer (Blockscout)",
            "url": "https://evm.explorer.canto.io",
          },
        },
        "id": 7700,
        "name": "Canto",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Canto",
          "symbol": "CANTO",
        },
        "network": "canto",
        "rpcUrls": {
          "default": {
            "http": [
              "https://canto.slingshot.finance",
            ],
          },
          "public": {
            "http": [
              "https://canto.slingshot.finance",
            ],
          },
        },
      },
      "celo": {
        "blockExplorers": {
          "default": {
            "name": "Celo Explorer",
            "url": "https://explorer.celo.org/mainnet",
          },
          "etherscan": {
            "name": "CeloScan",
            "url": "https://celoscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
            "blockCreated": 13112599,
          },
        },
        "id": 42220,
        "name": "Celo",
        "nativeCurrency": {
          "decimals": 18,
          "name": "CELO",
          "symbol": "CELO",
        },
        "network": "celo",
        "rpcUrls": {
          "default": {
            "http": [
              "https://forno.celo.org",
            ],
          },
          "infura": {
            "http": [
              "https://celo-mainnet.infura.io/v3",
            ],
          },
          "public": {
            "http": [
              "https://forno.celo.org",
            ],
          },
        },
        "testnet": false,
      },
      "celoAlfajores": {
        "blockExplorers": {
          "default": {
            "name": "Celo Explorer",
            "url": "https://explorer.celo.org/alfajores",
          },
          "etherscan": {
            "name": "CeloScan",
            "url": "https://alfajores.celoscan.io/",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
            "blockCreated": 14569001,
          },
        },
        "id": 44787,
        "name": "Alfajores",
        "nativeCurrency": {
          "decimals": 18,
          "name": "CELO",
          "symbol": "A-CELO",
        },
        "network": "celo-alfajores",
        "rpcUrls": {
          "default": {
            "http": [
              "https://alfajores-forno.celo-testnet.org",
            ],
          },
          "infura": {
            "http": [
              "https://celo-alfajores.infura.io/v3",
            ],
          },
          "public": {
            "http": [
              "https://alfajores-forno.celo-testnet.org",
            ],
          },
        },
        "testnet": true,
      },
      "celoCannoli": {
        "blockExplorers": {
          "default": {
            "name": "Celo Explorer",
            "url": "https://explorer.celo.org/cannoli",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0x5Acb0aa8BF4E8Ff0d882Ee187140713C12BF9718",
            "blockCreated": 87429,
          },
        },
        "id": 17323,
        "name": "Cannoli",
        "nativeCurrency": {
          "decimals": 18,
          "name": "CELO",
          "symbol": "C-CELO",
        },
        "network": "celo-cannoli",
        "rpcUrls": {
          "default": {
            "http": [
              "https://forno.cannoli.celo-testnet.org",
            ],
          },
          "public": {
            "http": [
              "https://forno.cannoli.celo-testnet.org",
            ],
          },
        },
        "testnet": true,
      },
      "confluxESpace": {
        "blockExplorers": {
          "default": {
            "name": "ConfluxScan",
            "url": "https://evm.confluxscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xEFf0078910f638cd81996cc117bccD3eDf2B072F",
            "blockCreated": 68602935,
          },
        },
        "id": 1030,
        "name": "Conflux eSpace",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Conflux",
          "symbol": "CFX",
        },
        "network": "cfx-espace",
        "rpcUrls": {
          "default": {
            "http": [
              "https://evm.confluxrpc.org",
            ],
          },
          "public": {
            "http": [
              "https://evm.confluxrpc.org",
            ],
          },
        },
      },
      "cronos": {
        "blockExplorers": {
          "default": {
            "name": "CronosScan",
            "url": "https://cronoscan.com",
          },
          "etherscan": {
            "name": "CronosScan",
            "url": "https://cronoscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
            "blockCreated": 1963112,
          },
        },
        "id": 25,
        "name": "Cronos",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Cronos",
          "symbol": "CRO",
        },
        "network": "cronos",
        "rpcUrls": {
          "default": {
            "http": [
              "https://node.croswap.com/rpc",
            ],
          },
          "public": {
            "http": [
              "https://node.croswap.com/rpc",
            ],
          },
        },
      },
      "crossbell": {
        "blockExplorers": {
          "default": {
            "name": "CrossScan",
            "url": "https://scan.crossbell.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xBB9759009cDaC82774EfC84D94cD9F7440f75Fcf",
            "blockCreated": 23499787,
          },
        },
        "id": 3737,
        "name": "Crossbell",
        "nativeCurrency": {
          "decimals": 18,
          "name": "CSB",
          "symbol": "CSB",
        },
        "network": "crossbell",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.crossbell.io",
            ],
          },
          "public": {
            "http": [
              "https://rpc.crossbell.io",
            ],
          },
        },
      },
      "dfk": {
        "blockExplorers": {
          "default": {
            "name": "DFKSubnetScan",
            "url": "https://subnets.avax.network/defi-kingdoms",
          },
          "etherscan": {
            "name": "DFKSubnetScan",
            "url": "https://subnets.avax.network/defi-kingdoms",
          },
        },
        "id": 53935,
        "name": "DFK Chain",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Jewel",
          "symbol": "JEWEL",
        },
        "network": "dfk",
        "rpcUrls": {
          "default": {
            "http": [
              "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc",
            ],
          },
          "public": {
            "http": [
              "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc",
            ],
          },
        },
      },
      "dogechain": {
        "blockExplorers": {
          "default": {
            "name": "DogeChainExplorer",
            "url": "https://explorer.dogechain.dog",
          },
          "etherscan": {
            "name": "DogeChainExplorer",
            "url": "https://explorer.dogechain.dog",
          },
        },
        "id": 2000,
        "name": "Dogechain",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Dogechain",
          "symbol": "DC",
        },
        "network": "dogechain",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.dogechain.dog",
            ],
          },
          "public": {
            "http": [
              "https://rpc.dogechain.dog",
            ],
          },
        },
      },
      "ekta": {
        "blockExplorers": {
          "default": {
            "name": "Ektascan",
            "url": "https://ektascan.io",
          },
        },
        "id": 1994,
        "name": "Ekta",
        "nativeCurrency": {
          "decimals": 18,
          "name": "EKTA",
          "symbol": "EKTA",
        },
        "network": "ekta",
        "rpcUrls": {
          "default": {
            "http": [
              "https://main.ekta.io",
            ],
          },
          "public": {
            "http": [
              "https://main.ekta.io",
            ],
          },
        },
      },
      "ektaTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Test Ektascan",
            "url": "https://test.ektascan.io",
          },
        },
        "id": 1004,
        "name": "Ekta Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "EKTA",
          "symbol": "EKTA",
        },
        "network": "ekta-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://test.ekta.io:8545",
            ],
          },
          "public": {
            "http": [
              "https://test.ekta.io:8545",
            ],
          },
        },
        "testnet": true,
      },
      "evmos": {
        "blockExplorers": {
          "default": {
            "name": "Evmos Block Explorer",
            "url": "https://escan.live/",
          },
        },
        "id": 9001,
        "name": "Evmos",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Evmos",
          "symbol": "EVMOS",
        },
        "network": "evmos",
        "rpcUrls": {
          "default": {
            "http": [
              "https://eth.bd.evmos.org:8545",
            ],
          },
          "public": {
            "http": [
              "https://eth.bd.evmos.org:8545",
            ],
          },
        },
      },
      "evmosTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Evmos Testnet Block Explorer",
            "url": "https://evm.evmos.dev/",
          },
        },
        "id": 9000,
        "name": "Evmos Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Evmos",
          "symbol": "EVMOS",
        },
        "network": "evmos-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://eth.bd.evmos.dev:8545",
            ],
          },
          "public": {
            "http": [
              "https://eth.bd.evmos.dev:8545",
            ],
          },
        },
      },
      "fantom": {
        "blockExplorers": {
          "default": {
            "name": "FTMScan",
            "url": "https://ftmscan.com",
          },
          "etherscan": {
            "name": "FTMScan",
            "url": "https://ftmscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 33001987,
          },
        },
        "id": 250,
        "name": "Fantom",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Fantom",
          "symbol": "FTM",
        },
        "network": "fantom",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.ankr.com/fantom",
            ],
          },
          "public": {
            "http": [
              "https://rpc.ankr.com/fantom",
            ],
          },
        },
      },
      "fantomTestnet": {
        "blockExplorers": {
          "default": {
            "name": "FTMScan",
            "url": "https://testnet.ftmscan.com",
          },
          "etherscan": {
            "name": "FTMScan",
            "url": "https://testnet.ftmscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 8328688,
          },
        },
        "id": 4002,
        "name": "Fantom Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Fantom",
          "symbol": "FTM",
        },
        "network": "fantom-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.testnet.fantom.network",
            ],
          },
          "public": {
            "http": [
              "https://rpc.testnet.fantom.network",
            ],
          },
        },
      },
      "filecoin": {
        "blockExplorers": {
          "default": {
            "name": "Filfox",
            "url": "https://filfox.info/en",
          },
          "filscan": {
            "name": "Filscan",
            "url": "https://filscan.io",
          },
          "filscout": {
            "name": "Filscout",
            "url": "https://filscout.io/en",
          },
          "glif": {
            "name": "Glif",
            "url": "https://explorer.glif.io",
          },
        },
        "id": 314,
        "name": "Filecoin Mainnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "filecoin",
          "symbol": "FIL",
        },
        "network": "filecoin-mainnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://api.node.glif.io/rpc/v1",
            ],
          },
          "public": {
            "http": [
              "https://api.node.glif.io/rpc/v1",
            ],
          },
        },
      },
      "filecoinCalibration": {
        "blockExplorers": {
          "default": {
            "name": "Filscan",
            "url": "https://calibration.filscan.io",
          },
        },
        "id": 314159,
        "name": "Filecoin Calibration",
        "nativeCurrency": {
          "decimals": 18,
          "name": "testnet filecoin",
          "symbol": "tFIL",
        },
        "network": "filecoin-calibration",
        "rpcUrls": {
          "default": {
            "http": [
              "https://api.calibration.node.glif.io/rpc/v1",
            ],
          },
          "public": {
            "http": [
              "https://api.calibration.node.glif.io/rpc/v1",
            ],
          },
        },
      },
      "filecoinHyperspace": {
        "blockExplorers": {
          "default": {
            "name": "Filfox",
            "url": "https://hyperspace.filfox.info/en",
          },
          "filscan": {
            "name": "Filscan",
            "url": "https://hyperspace.filscan.io",
          },
        },
        "id": 3141,
        "name": "Filecoin Hyperspace",
        "nativeCurrency": {
          "decimals": 18,
          "name": "testnet filecoin",
          "symbol": "tFIL",
        },
        "network": "filecoin-hyperspace",
        "rpcUrls": {
          "default": {
            "http": [
              "https://api.hyperspace.node.glif.io/rpc/v1",
            ],
          },
          "public": {
            "http": [
              "https://api.hyperspace.node.glif.io/rpc/v1",
            ],
          },
        },
      },
      "flare": {
        "blockExplorers": {
          "default": {
            "name": "Flare Explorer",
            "url": "https://flare-explorer.flare.network",
          },
        },
        "id": 14,
        "name": "Flare Mainnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "flare",
          "symbol": "FLR",
        },
        "network": "flare-mainnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://flare-api.flare.network/ext/C/rpc",
            ],
          },
          "public": {
            "http": [
              "https://flare-api.flare.network/ext/C/rpc",
            ],
          },
        },
      },
      "flareTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Coston2 Explorer",
            "url": "https://coston2-explorer.flare.network",
          },
        },
        "id": 114,
        "name": "Coston2",
        "nativeCurrency": {
          "decimals": 18,
          "name": "coston2flare",
          "symbol": "C2FLR",
        },
        "network": "coston2",
        "rpcUrls": {
          "default": {
            "http": [
              "https://coston2-api.flare.network/ext/C/rpc",
            ],
          },
          "public": {
            "http": [
              "https://coston2-api.flare.network/ext/C/rpc",
            ],
          },
        },
        "testnet": true,
      },
      "foundry": {
        "id": 31337,
        "name": "Foundry",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "foundry",
        "rpcUrls": {
          "default": {
            "http": [
              "http://127.0.0.1:8545",
            ],
            "webSocket": [
              "ws://127.0.0.1:8545",
            ],
          },
          "public": {
            "http": [
              "http://127.0.0.1:8545",
            ],
            "webSocket": [
              "ws://127.0.0.1:8545",
            ],
          },
        },
      },
      "fuse": {
        "blockExplorers": {
          "default": {
            "name": "Fuse Explorer",
            "url": "https://explorer.fuse.io",
          },
        },
        "id": 122,
        "name": "Fuse",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Fuse",
          "symbol": "FUSE",
        },
        "network": "fuse",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.fuse.io",
            ],
          },
          "public": {
            "http": [
              "https://fuse-mainnet.chainstacklabs.com",
            ],
          },
        },
      },
      "gnosis": {
        "blockExplorers": {
          "default": {
            "name": "Gnosis Chain Explorer",
            "url": "https://blockscout.com/xdai/mainnet/",
          },
          "etherscan": {
            "name": "Gnosisscan",
            "url": "https://gnosisscan.io/",
          },
        },
        "id": 100,
        "name": "Gnosis",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Gnosis",
          "symbol": "xDAI",
        },
        "network": "gnosis",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.gnosischain.com",
            ],
          },
          "public": {
            "http": [
              "https://rpc.gnosischain.com",
            ],
          },
        },
      },
      "gnosisChiado": {
        "blockExplorers": {
          "default": {
            "name": "Blockscout",
            "url": "https://blockscout.chiadochain.net",
          },
        },
        "id": 10200,
        "name": "Gnosis Chiado",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Gnosis",
          "symbol": "xDAI",
        },
        "network": "chiado",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.chiadochain.net",
            ],
          },
          "public": {
            "http": [
              "https://rpc.chiadochain.net",
            ],
          },
        },
      },
      "goerli": {
        "blockExplorers": {
          "default": {
            "name": "Etherscan",
            "url": "https://goerli.etherscan.io",
          },
          "etherscan": {
            "name": "Etherscan",
            "url": "https://goerli.etherscan.io",
          },
        },
        "contracts": {
          "ensRegistry": {
            "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          },
          "ensUniversalResolver": {
            "address": "0xA292E2E58d4ddEb29C33c63173d0E8B7a2A4c62e",
            "blockCreated": 8610406,
          },
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 6507670,
          },
        },
        "id": 5,
        "name": "Goerli",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Goerli Ether",
          "symbol": "ETH",
        },
        "network": "goerli",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://eth-goerli.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://eth-goerli.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://rpc.ankr.com/eth_goerli",
            ],
          },
          "infura": {
            "http": [
              "https://goerli.infura.io/v3",
            ],
            "webSocket": [
              "wss://goerli.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://rpc.ankr.com/eth_goerli",
            ],
          },
        },
        "testnet": true,
      },
      "haqqMainnet": {
        "blockExplorers": {
          "default": {
            "name": "HAQQ Explorer",
            "url": "https://explorer.haqq.network",
          },
        },
        "id": 11235,
        "name": "HAQQ Mainnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Islamic Coin",
          "symbol": "ISLM",
        },
        "network": "haqq-mainnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.eth.haqq.network",
            ],
          },
          "public": {
            "http": [
              "https://rpc.eth.haqq.network",
            ],
          },
        },
      },
      "haqqTestedge2": {
        "blockExplorers": {
          "default": {
            "name": "HAQQ Explorer",
            "url": "https://explorer.testedge2.haqq.network",
          },
        },
        "id": 54211,
        "name": "HAQQ Testedge 2",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Islamic Coin",
          "symbol": "ISLMT",
        },
        "network": "haqq-testedge-2",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.eth.testedge2.haqq.network",
            ],
          },
          "public": {
            "http": [
              "https://rpc.eth.testedge2.haqq.network",
            ],
          },
        },
      },
      "hardhat": {
        "id": 31337,
        "name": "Hardhat",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "hardhat",
        "rpcUrls": {
          "default": {
            "http": [
              "http://127.0.0.1:8545",
            ],
          },
          "public": {
            "http": [
              "http://127.0.0.1:8545",
            ],
          },
        },
      },
      "harmonyOne": {
        "blockExplorers": {
          "default": {
            "name": "Harmony Explorer",
            "url": "https://explorer.harmony.one",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 24185753,
          },
        },
        "id": 1666600000,
        "name": "Harmony One",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Harmony",
          "symbol": "ONE",
        },
        "network": "harmony",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.ankr.com/harmony",
            ],
          },
          "public": {
            "http": [
              "https://rpc.ankr.com/harmony",
            ],
          },
        },
      },
      "iotex": {
        "blockExplorers": {
          "default": {
            "name": "IoTeXScan",
            "url": "https://iotexscan.io",
          },
        },
        "id": 4689,
        "name": "IoTeX",
        "nativeCurrency": {
          "decimals": 18,
          "name": "IoTeX",
          "symbol": "IOTX",
        },
        "network": "iotex",
        "rpcUrls": {
          "default": {
            "http": [
              "https://babel-api.mainnet.iotex.io",
            ],
            "webSocket": [
              "wss://babel-api.mainnet.iotex.io",
            ],
          },
          "public": {
            "http": [
              "https://babel-api.mainnet.iotex.io",
            ],
            "webSocket": [
              "wss://babel-api.mainnet.iotex.io",
            ],
          },
        },
      },
      "iotexTestnet": {
        "blockExplorers": {
          "default": {
            "name": "IoTeXScan",
            "url": "https://testnet.iotexscan.io",
          },
        },
        "id": 4690,
        "name": "IoTeX Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "IoTeX",
          "symbol": "IOTX",
        },
        "network": "iotex-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://babel-api.testnet.iotex.io",
            ],
            "webSocket": [
              "wss://babel-api.testnet.iotex.io",
            ],
          },
          "public": {
            "http": [
              "https://babel-api.testnet.iotex.io",
            ],
            "webSocket": [
              "wss://babel-api.testnet.iotex.io",
            ],
          },
        },
      },
      "klaytn": {
        "blockExplorers": {
          "default": {
            "name": "KlaytnScope",
            "url": "https://scope.klaytn.com",
          },
          "etherscan": {
            "name": "KlaytnScope",
            "url": "https://scope.klaytn.com",
          },
        },
        "id": 8217,
        "name": "Klaytn",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Klaytn",
          "symbol": "KLAY",
        },
        "network": "klaytn",
        "rpcUrls": {
          "default": {
            "http": [
              "https://cypress.fautor.app/archive",
            ],
          },
          "public": {
            "http": [
              "https://cypress.fautor.app/archive",
            ],
          },
        },
      },
      "lineaTestnet": {
        "blockExplorers": {
          "default": {
            "name": "BlockScout",
            "url": "https://explorer.goerli.linea.build",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 498623,
          },
        },
        "id": 59140,
        "name": "Linea Goerli Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Linea Ether",
          "symbol": "ETH",
        },
        "network": "linea-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.goerli.linea.build",
            ],
            "webSocket": [
              "wss://rpc.goerli.linea.build",
            ],
          },
          "infura": {
            "http": [
              "https://consensys-zkevm-goerli-prealpha.infura.io/v3",
            ],
            "webSocket": [
              "wss://consensys-zkevm-goerli-prealpha.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://rpc.goerli.linea.build",
            ],
            "webSocket": [
              "wss://rpc.goerli.linea.build",
            ],
          },
        },
        "testnet": true,
      },
      "localhost": {
        "id": 1337,
        "name": "Localhost",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "localhost",
        "rpcUrls": {
          "default": {
            "http": [
              "http://127.0.0.1:8545",
            ],
          },
          "public": {
            "http": [
              "http://127.0.0.1:8545",
            ],
          },
        },
      },
      "mainnet": {
        "blockExplorers": {
          "default": {
            "name": "Etherscan",
            "url": "https://etherscan.io",
          },
          "etherscan": {
            "name": "Etherscan",
            "url": "https://etherscan.io",
          },
        },
        "contracts": {
          "ensRegistry": {
            "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          },
          "ensUniversalResolver": {
            "address": "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
            "blockCreated": 16773775,
          },
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 14353601,
          },
        },
        "id": 1,
        "name": "Ethereum",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "homestead",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://eth-mainnet.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://eth-mainnet.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://cloudflare-eth.com",
            ],
          },
          "infura": {
            "http": [
              "https://mainnet.infura.io/v3",
            ],
            "webSocket": [
              "wss://mainnet.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://cloudflare-eth.com",
            ],
          },
        },
      },
      "metis": {
        "blockExplorers": {
          "default": {
            "name": "Andromeda Explorer",
            "url": "https://andromeda-explorer.metis.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 2338552,
          },
        },
        "id": 1088,
        "name": "Metis",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Metis",
          "symbol": "METIS",
        },
        "network": "andromeda",
        "rpcUrls": {
          "default": {
            "http": [
              "https://andromeda.metis.io/?owner=1088",
            ],
          },
          "public": {
            "http": [
              "https://andromeda.metis.io/?owner=1088",
            ],
          },
        },
      },
      "metisGoerli": {
        "blockExplorers": {
          "default": {
            "name": "Metis Goerli Explorer",
            "url": "https://goerli.explorer.metisdevops.link",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 1006207,
          },
        },
        "id": 599,
        "name": "Metis Goerli",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Metis Goerli",
          "symbol": "METIS",
        },
        "network": "metis-goerli",
        "rpcUrls": {
          "default": {
            "http": [
              "https://goerli.gateway.metisdevops.link",
            ],
          },
          "public": {
            "http": [
              "https://goerli.gateway.metisdevops.link",
            ],
          },
        },
      },
      "moonbaseAlpha": {
        "blockExplorers": {
          "default": {
            "name": "Moonscan",
            "url": "https://moonbase.moonscan.io",
          },
          "etherscan": {
            "name": "Moonscan",
            "url": "https://moonbase.moonscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
            "blockCreated": 1850686,
          },
        },
        "id": 1287,
        "name": "Moonbase Alpha",
        "nativeCurrency": {
          "decimals": 18,
          "name": "DEV",
          "symbol": "DEV",
        },
        "network": "moonbase-alpha",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.api.moonbase.moonbeam.network",
            ],
            "webSocket": [
              "wss://wss.api.moonbase.moonbeam.network",
            ],
          },
          "public": {
            "http": [
              "https://rpc.api.moonbase.moonbeam.network",
            ],
            "webSocket": [
              "wss://wss.api.moonbase.moonbeam.network",
            ],
          },
        },
        "testnet": true,
      },
      "moonbeam": {
        "blockExplorers": {
          "default": {
            "name": "Moonscan",
            "url": "https://moonscan.io",
          },
          "etherscan": {
            "name": "Moonscan",
            "url": "https://moonscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
            "blockCreated": 609002,
          },
        },
        "id": 1284,
        "name": "Moonbeam",
        "nativeCurrency": {
          "decimals": 18,
          "name": "GLMR",
          "symbol": "GLMR",
        },
        "network": "moonbeam",
        "rpcUrls": {
          "default": {
            "http": [
              "https://moonbeam.public.blastapi.io",
            ],
            "webSocket": [
              "wss://moonbeam.public.blastapi.io",
            ],
          },
          "public": {
            "http": [
              "https://moonbeam.public.blastapi.io",
            ],
            "webSocket": [
              "wss://moonbeam.public.blastapi.io",
            ],
          },
        },
        "testnet": false,
      },
      "moonriver": {
        "blockExplorers": {
          "default": {
            "name": "Moonscan",
            "url": "https://moonriver.moonscan.io",
          },
          "etherscan": {
            "name": "Moonscan",
            "url": "https://moonriver.moonscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
            "blockCreated": 1597904,
          },
        },
        "id": 1285,
        "name": "Moonriver",
        "nativeCurrency": {
          "decimals": 18,
          "name": "MOVR",
          "symbol": "MOVR",
        },
        "network": "moonriver",
        "rpcUrls": {
          "default": {
            "http": [
              "https://moonriver.public.blastapi.io",
            ],
            "webSocket": [
              "wss://moonriver.public.blastapi.io",
            ],
          },
          "public": {
            "http": [
              "https://moonriver.public.blastapi.io",
            ],
            "webSocket": [
              "wss://moonriver.public.blastapi.io",
            ],
          },
        },
        "testnet": false,
      },
      "neonDevnet": {
        "blockExplorers": {
          "default": {
            "name": "Neonscan",
            "url": "https://neonscan.org",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 205206112,
          },
        },
        "id": 245022926,
        "name": "Neon EVM DevNet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "NEON",
          "symbol": "NEON",
        },
        "network": "neonDevnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://devnet.neonevm.org",
            ],
          },
          "public": {
            "http": [
              "https://devnet.neonevm.org",
            ],
          },
        },
        "testnet": true,
      },
      "nexi": {
        "blockExplorers": {
          "default": {
            "name": "NexiScan",
            "url": "https://www.nexiscan.com",
          },
          "etherscan": {
            "name": "NexiScan",
            "url": "https://www.nexiscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0x0277A46Cc69A57eE3A6C8c158bA874832F718B8E",
            "blockCreated": 25770160,
          },
        },
        "id": 4242,
        "name": "Nexi",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Nexi",
          "symbol": "NEXI",
        },
        "network": "nexi",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.chain.nexi.technology",
            ],
          },
          "public": {
            "http": [
              "https://rpc.chain.nexi.technology",
            ],
          },
        },
      },
      "oasys": {
        "blockExplorers": {
          "default": {
            "name": "OasysScan",
            "url": "https://scan.oasys.games",
          },
        },
        "id": 248,
        "name": "Oasys",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Oasys",
          "symbol": "OAS",
        },
        "network": "oasys",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.mainnet.oasys.games",
            ],
          },
          "public": {
            "http": [
              "https://rpc.mainnet.oasys.games",
            ],
          },
        },
      },
      "okc": {
        "blockExplorers": {
          "default": {
            "name": "oklink",
            "url": "https://www.oklink.com/okc",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 10364792,
          },
        },
        "id": 66,
        "name": "OKC",
        "nativeCurrency": {
          "decimals": 18,
          "name": "OKT",
          "symbol": "OKT",
        },
        "network": "okc",
        "rpcUrls": {
          "default": {
            "http": [
              "https://exchainrpc.okex.org",
            ],
          },
          "public": {
            "http": [
              "https://exchainrpc.okex.org",
            ],
          },
        },
      },
      "optimism": {
        "blockExplorers": {
          "default": {
            "name": "Optimism Explorer",
            "url": "https://explorer.optimism.io",
          },
          "etherscan": {
            "name": "Etherscan",
            "url": "https://optimistic.etherscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 4286263,
          },
        },
        "id": 10,
        "name": "Optimism",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "optimism",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://opt-mainnet.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://opt-mainnet.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://mainnet.optimism.io",
            ],
          },
          "infura": {
            "http": [
              "https://optimism-mainnet.infura.io/v3",
            ],
            "webSocket": [
              "wss://optimism-mainnet.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.optimism.io",
            ],
          },
        },
      },
      "optimismGoerli": {
        "blockExplorers": {
          "default": {
            "name": "Etherscan",
            "url": "https://goerli-optimism.etherscan.io",
          },
          "etherscan": {
            "name": "Etherscan",
            "url": "https://goerli-optimism.etherscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 49461,
          },
        },
        "id": 420,
        "name": "Optimism Goerli",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Goerli Ether",
          "symbol": "ETH",
        },
        "network": "optimism-goerli",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://opt-goerli.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://opt-goerli.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://goerli.optimism.io",
            ],
          },
          "infura": {
            "http": [
              "https://optimism-goerli.infura.io/v3",
            ],
            "webSocket": [
              "wss://optimism-goerli.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://goerli.optimism.io",
            ],
          },
        },
        "testnet": true,
      },
      "polygon": {
        "blockExplorers": {
          "default": {
            "name": "PolygonScan",
            "url": "https://polygonscan.com",
          },
          "etherscan": {
            "name": "PolygonScan",
            "url": "https://polygonscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 25770160,
          },
        },
        "id": 137,
        "name": "Polygon",
        "nativeCurrency": {
          "decimals": 18,
          "name": "MATIC",
          "symbol": "MATIC",
        },
        "network": "matic",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://polygon-mainnet.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://polygon-mainnet.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://polygon-rpc.com",
            ],
          },
          "infura": {
            "http": [
              "https://polygon-mainnet.infura.io/v3",
            ],
            "webSocket": [
              "wss://polygon-mainnet.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://polygon-rpc.com",
            ],
          },
        },
      },
      "polygonMumbai": {
        "blockExplorers": {
          "default": {
            "name": "PolygonScan",
            "url": "https://mumbai.polygonscan.com",
          },
          "etherscan": {
            "name": "PolygonScan",
            "url": "https://mumbai.polygonscan.com",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 25770160,
          },
        },
        "id": 80001,
        "name": "Polygon Mumbai",
        "nativeCurrency": {
          "decimals": 18,
          "name": "MATIC",
          "symbol": "MATIC",
        },
        "network": "maticmum",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://polygon-mumbai.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://polygon-mumbai.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://matic-mumbai.chainstacklabs.com",
            ],
          },
          "infura": {
            "http": [
              "https://polygon-mumbai.infura.io/v3",
            ],
            "webSocket": [
              "wss://polygon-mumbai.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://matic-mumbai.chainstacklabs.com",
            ],
          },
        },
        "testnet": true,
      },
      "polygonZkEvm": {
        "blockExplorers": {
          "default": {
            "name": "PolygonScan",
            "url": "https://zkevm.polygonscan.com",
          },
        },
        "id": 1101,
        "name": "Polygon zkEVM",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "polygon-zkevm",
        "rpcUrls": {
          "default": {
            "http": [
              "https://zkevm-rpc.com",
            ],
          },
          "public": {
            "http": [
              "https://zkevm-rpc.com",
            ],
          },
        },
      },
      "polygonZkEvmTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Blockscout",
            "url": "https://explorer.public.zkevm-test.net",
          },
        },
        "id": 1442,
        "name": "Polygon zkEVM Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "polygon-zkevm-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.public.zkevm-test.net",
            ],
          },
          "public": {
            "http": [
              "https://rpc.public.zkevm-test.net",
            ],
          },
        },
        "testnet": true,
      },
      "pulsechain": {
        "blockExplorers": {
          "default": {
            "name": "Etherscan",
            "url": "https://scan.pulsechain.com",
          },
        },
        "contracts": {
          "ensRegistry": {
            "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          },
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 14353601,
          },
        },
        "id": 369,
        "name": "Pulsechain",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Pulse",
          "symbol": "PLS",
        },
        "network": "pulsechain",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.pulsechain.com",
            ],
            "webSocket": [
              "wss://ws.pulsechain.com",
            ],
          },
          "public": {
            "http": [
              "https://rpc.pulsechain.com",
            ],
            "webSocket": [
              "wss://ws.pulsechain.com",
            ],
          },
        },
      },
      "pulsechainV4": {
        "blockExplorers": {
          "default": {
            "name": "Blockscout",
            "url": "https://scan.v4.testnet.pulsechain.com",
          },
        },
        "contracts": {
          "ensRegistry": {
            "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          },
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 14353601,
          },
        },
        "id": 943,
        "name": "Pulsechain V4",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Pulse",
          "symbol": "PLS",
        },
        "network": "pulsechainV4",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.v4.testnet.pulsechain.com",
            ],
            "webSocket": [
              "wss://ws.v4.testnet.pulsechain.com",
            ],
          },
          "public": {
            "http": [
              "https://rpc.v4.testnet.pulsechain.com",
            ],
            "webSocket": [
              "wss://ws.v4.testnet.pulsechain.com",
            ],
          },
        },
        "testnet": true,
      },
      "scrollTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Blockscout",
            "url": "https://blockscout.scroll.io",
          },
        },
        "id": 534353,
        "name": "Scroll Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "scroll-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://alpha-rpc.scroll.io/l2",
            ],
            "webSocket": [
              "wss://alpha-rpc.scroll.io/l2/ws",
            ],
          },
          "public": {
            "http": [
              "https://alpha-rpc.scroll.io/l2",
            ],
            "webSocket": [
              "wss://alpha-rpc.scroll.io/l2/ws",
            ],
          },
        },
        "testnet": true,
      },
      "sepolia": {
        "blockExplorers": {
          "default": {
            "name": "Etherscan",
            "url": "https://sepolia.etherscan.io",
          },
          "etherscan": {
            "name": "Etherscan",
            "url": "https://sepolia.etherscan.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 6507670,
          },
        },
        "id": 11155111,
        "name": "Sepolia",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Sepolia Ether",
          "symbol": "SEP",
        },
        "network": "sepolia",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://eth-sepolia.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://eth-sepolia.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://rpc.sepolia.org",
            ],
          },
          "infura": {
            "http": [
              "https://sepolia.infura.io/v3",
            ],
            "webSocket": [
              "wss://sepolia.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://rpc.sepolia.org",
            ],
          },
        },
        "testnet": true,
      },
      "shardeumSphinx": {
        "blockExplorers": {
          "default": {
            "name": "Shardeum Explorer",
            "url": "https://explorer-sphinx.shardeum.org",
          },
        },
        "id": 8082,
        "name": "Shardeum Sphinx",
        "nativeCurrency": {
          "decimals": 18,
          "name": "SHARDEUM",
          "symbol": "SHM",
        },
        "network": "shmSphinx",
        "rpcUrls": {
          "default": {
            "http": [
              "https://sphinx.shardeum.org",
            ],
          },
          "public": {
            "http": [
              "https://sphinx.shardeum.org",
            ],
          },
        },
        "testnet": true,
      },
      "skaleBlockBrawlers": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://frayed-decent-antares.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://frayed-decent-antares.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 391845894,
        "name": "SKALE | Block Brawlers",
        "nativeCurrency": {
          "decimals": 18,
          "name": "BRAWL",
          "symbol": "BRAWL",
        },
        "network": "skale-brawl",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/frayed-decent-antares",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/frayed-decent-antares",
            ],
          },
        },
      },
      "skaleCalypso": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 1564830818,
        "name": "SKALE | Calypso NFT Hub",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-calypso",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
            ],
          },
        },
      },
      "skaleCalypsoTestnet": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 344106930,
        "name": "SKALE | Calypso NFT Hub Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-calypso-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
            ],
          },
          "public": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
            ],
          },
        },
        "testnet": true,
      },
      "skaleChaosTestnet": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 1351057110,
        "name": "SKALE | Chaos Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-chaos-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
            ],
          },
          "public": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
            ],
          },
        },
        "testnet": true,
      },
      "skaleCryptoBlades": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 1026062157,
        "name": "SKALE | CryptoBlades",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-cryptoblades",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux",
            ],
          },
        },
      },
      "skaleCryptoColosseum": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 2046399126,
        "name": "SKALE | Crypto Colosseum",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-crypto-coloseeum",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/haunting-devoted-deneb",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/haunting-devoted-deneb",
            ],
          },
        },
      },
      "skaleEuropa": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://elated-tan-skat.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://elated-tan-skat.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 2046399126,
        "name": "SKALE | Europa Liquidity Hub",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-europa",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/elated-tan-skat",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/elated-tan-skat",
            ],
          },
        },
      },
      "skaleEuropaTestnet": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://staging-legal-crazy-castor.explorer.staging-v3.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 476158412,
        "name": "SKALE | Europa Liquidity Hub Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-europa-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
            ],
          },
          "public": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
            ],
          },
        },
        "testnet": true,
      },
      "skaleExorde": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://light-vast-diphda.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://light-vast-diphda.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 2139927552,
        "name": "SKALE | Exorde",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-exorde",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/light-vast-diphda",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/light-vast-diphda",
            ],
          },
        },
      },
      "skaleHumanProtocol": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://wan-red-ain.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://wan-red-ain.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 1273227453,
        "name": "SKALE | Human Protocol",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-human-protocol",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/wan-red-ain",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/wan-red-ain",
            ],
          },
        },
      },
      "skaleNebula": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://green-giddy-denebola.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://green-giddy-denebola.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 1482601649,
        "name": "SKALE | Nebula Gaming Hub",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-nebula",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
            ],
          },
        },
      },
      "skaleNebulaTestnet": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://staging-faint-slimy-achird.explorer.staging-v3.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 503129905,
        "name": "SKALE | Nebula Gaming Hub Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-nebula-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
            ],
          },
          "public": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
            ],
          },
        },
        "testnet": true,
      },
      "skaleRazor": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 278611351,
        "name": "SKALE | Razor Network",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-razor",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/turbulent-unique-scheat",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/turbulent-unique-scheat",
            ],
          },
        },
      },
      "skaleTitan": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://parallel-stormy-spica.explorer.mainnet.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://parallel-stormy-spica.explorer.mainnet.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 1350216234,
        "name": "SKALE | Titan Community Hub",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-titan",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.skalenodes.com/v1/parallel-stormy-spica",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.skalenodes.com/v1/parallel-stormy-spica",
            ],
          },
        },
      },
      "skaleTitanTestnet": {
        "blockExplorers": {
          "default": {
            "name": "SKALE Explorer",
            "url": "https://staging-aware-chief-gianfar.explorer.staging-v3.skalenodes.com",
          },
          "etherscan": {
            "name": "SKALE Explorer",
            "url": "https://staging-aware-chief-gianfar.explorer.staging-v3.skalenodes.com",
          },
        },
        "contracts": {},
        "id": 1517929550,
        "name": "SKALE | Titan Community Hub Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "sFUEL",
          "symbol": "sFUEL",
        },
        "network": "skale-titan-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar",
            ],
          },
          "public": {
            "http": [
              "https://staging-v3.skalenodes.com/v1/staging-aware-chief-gianfar",
            ],
          },
        },
        "testnet": true,
      },
      "songbird": {
        "blockExplorers": {
          "default": {
            "name": "Songbird Explorer",
            "url": "https://songbird-explorer.flare.network",
          },
        },
        "id": 19,
        "name": "Songbird Mainnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "songbird",
          "symbol": "SGB",
        },
        "network": "songbird-mainnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://songbird-api.flare.network/ext/C/rpc",
            ],
          },
          "public": {
            "http": [
              "https://songbird-api.flare.network/ext/C/rpc",
            ],
          },
        },
      },
      "songbirdTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Coston Explorer",
            "url": "https://coston-explorer.flare.network",
          },
        },
        "id": 16,
        "name": "Coston",
        "nativeCurrency": {
          "decimals": 18,
          "name": "costonflare",
          "symbol": "CFLR",
        },
        "network": "coston",
        "rpcUrls": {
          "default": {
            "http": [
              "https://coston-api.flare.network/ext/C/rpc",
            ],
          },
          "public": {
            "http": [
              "https://coston-api.flare.network/ext/C/rpc",
            ],
          },
        },
        "testnet": true,
      },
      "syscoin": {
        "blockExplorers": {
          "default": {
            "name": "SyscoinExplorer",
            "url": "https://explorer.syscoin.org",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0x000562033783B1136159E10d976B519C929cdE8e",
            "blockCreated": 80637,
          },
        },
        "id": 57,
        "name": "Syscoin Mainnet",
        "nativeCurrency": {
          "decimals": 8,
          "name": "Syscoin",
          "symbol": "SYS",
        },
        "network": "syscoin",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.syscoin.org",
            ],
          },
          "public": {
            "http": [
              "https://rpc.syscoin.org",
            ],
          },
        },
      },
      "taraxa": {
        "blockExplorers": {
          "default": {
            "name": "Taraxa Explorer",
            "url": "https://explorer.mainnet.taraxa.io",
          },
        },
        "id": 841,
        "name": "Taraxa Mainnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Tara",
          "symbol": "TARA",
        },
        "network": "taraxa",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.mainnet.taraxa.io",
            ],
          },
          "public": {
            "http": [
              "https://rpc.mainnet.taraxa.io",
            ],
          },
        },
      },
      "taraxaTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Taraxa Explorer",
            "url": "https://explorer.testnet.taraxa.io",
          },
        },
        "id": 842,
        "name": "Taraxa Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Tara",
          "symbol": "TARA",
        },
        "network": "taraxa-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.testnet.taraxa.io",
            ],
          },
          "public": {
            "http": [
              "https://rpc.testnet.taraxa.io",
            ],
          },
        },
        "testnet": true,
      },
      "telos": {
        "blockExplorers": {
          "default": {
            "name": "Teloscan",
            "url": "https://www.teloscan.io/",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcA11bde05977b3631167028862bE2a173976CA11",
            "blockCreated": 246530709,
          },
        },
        "id": 40,
        "name": "Telos",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Telos",
          "symbol": "TLOS",
        },
        "network": "telos",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.telos.net/evm",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.telos.net/evm",
            ],
          },
        },
      },
      "telosTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Teloscan (testnet)",
            "url": "https://testnet.teloscan.io/",
          },
        },
        "id": 41,
        "name": "Telos",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Telos",
          "symbol": "TLOS",
        },
        "network": "telosTestnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://testnet.telos.net/evm",
            ],
          },
          "public": {
            "http": [
              "https://testnet.telos.net/evm",
            ],
          },
        },
        "testnet": true,
      },
      "thunderTestnet": {
        "blockExplorers": {
          "default": {
            "name": "5ireChain Explorer",
            "url": "https://explorer.5ire.network",
          },
        },
        "id": 997,
        "name": "5ireChain Thunder Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "5ire Token",
          "symbol": "5IRE",
        },
        "network": "5ireChain",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc-testnet.5ire.network",
            ],
          },
          "public": {
            "http": [
              "https://rpc-testnet.5ire.network",
            ],
          },
        },
        "testnet": true,
      },
      "wanchain": {
        "blockExplorers": {
          "default": {
            "name": "WanScan",
            "url": "https://wanscan.org",
          },
          "etherscan": {
            "name": "WanScan",
            "url": "https://wanscan.org",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0xcDF6A1566e78EB4594c86Fe73Fcdc82429e97fbB",
            "blockCreated": 25312390,
          },
        },
        "id": 888,
        "name": "Wanchain",
        "nativeCurrency": {
          "decimals": 18,
          "name": "WANCHAIN",
          "symbol": "WAN",
        },
        "network": "wanchain",
        "rpcUrls": {
          "default": {
            "http": [
              "https://gwan-ssl.wandevs.org:56891",
              "https://gwan2-ssl.wandevs.org",
            ],
          },
          "public": {
            "http": [
              "https://gwan-ssl.wandevs.org:56891",
              "https://gwan2-ssl.wandevs.org",
            ],
          },
        },
      },
      "wanchainTestnet": {
        "blockExplorers": {
          "default": {
            "name": "WanScanTest",
            "url": "https://wanscan.org",
          },
          "etherscan": {
            "name": "WanScanTest",
            "url": "https://wanscan.org",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0x11c89bF4496c39FB80535Ffb4c92715839CC5324",
            "blockCreated": 24743448,
          },
        },
        "id": 999,
        "name": "Wanchain Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "WANCHAIN",
          "symbol": "WANt",
        },
        "network": "wanchainTestnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://gwan-ssl.wandevs.org:46891",
            ],
          },
          "public": {
            "http": [
              "https://gwan-ssl.wandevs.org:46891",
            ],
          },
        },
        "testnet": true,
      },
      "xdc": {
        "blockExplorers": {
          "default": {
            "name": "Blocksscan",
            "url": "https://xdc.blocksscan.io",
          },
          "xinfin": {
            "name": "XinFin",
            "url": "https://explorer.xinfin.network",
          },
        },
        "id": 50,
        "name": "XinFin Network",
        "nativeCurrency": {
          "decimals": 18,
          "name": "XDC",
          "symbol": "XDC",
        },
        "network": "xdc",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.xinfin.network",
            ],
          },
          "public": {
            "http": [
              "https://rpc.xinfin.network",
            ],
          },
        },
      },
      "xdcTestnet": {
        "blockExplorers": {
          "default": {
            "name": "Blocksscan",
            "url": "https://apothem.blocksscan.io",
          },
          "xinfin": {
            "name": "XinFin",
            "url": "https://explorer.apothem.network",
          },
        },
        "id": 51,
        "name": "Apothem Network",
        "nativeCurrency": {
          "decimals": 18,
          "name": "TXDC",
          "symbol": "TXDC",
        },
        "network": "xdc-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://erpc.apothem.network",
            ],
          },
          "public": {
            "http": [
              "https://erpc.apothem.network",
            ],
          },
        },
      },
      "zhejiang": {
        "blockExplorers": {
          "beaconchain": {
            "name": "Etherscan",
            "url": "https://zhejiang.beaconcha.in",
          },
          "blockscout": {
            "name": "Blockscout",
            "url": "https://blockscout.com/eth/zhejiang-testnet",
          },
          "default": {
            "name": "Beaconchain",
            "url": "https://zhejiang.beaconcha.in",
          },
        },
        "id": 1337803,
        "name": "Zhejiang",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Zhejiang Ether",
          "symbol": "ZhejETH",
        },
        "network": "zhejiang",
        "rpcUrls": {
          "default": {
            "http": [
              "https://rpc.zhejiang.ethpandaops.io",
            ],
          },
          "public": {
            "http": [
              "https://rpc.zhejiang.ethpandaops.io",
            ],
          },
        },
        "testnet": true,
      },
      "zkSync": {
        "blockExplorers": {
          "default": {
            "name": "zkExplorer",
            "url": "https://explorer.zksync.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0x47898B2C52C957663aE9AB46922dCec150a2272c",
          },
        },
        "id": 324,
        "name": "zkSync Era",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "zksync-era",
        "rpcUrls": {
          "default": {
            "http": [
              "https://mainnet.era.zksync.io",
            ],
            "webSocket": [
              "wss://mainnet.era.zksync.io/ws",
            ],
          },
          "public": {
            "http": [
              "https://mainnet.era.zksync.io",
            ],
            "webSocket": [
              "wss://mainnet.era.zksync.io/ws",
            ],
          },
        },
      },
      "zkSyncTestnet": {
        "blockExplorers": {
          "default": {
            "name": "zkExplorer",
            "url": "https://goerli.explorer.zksync.io",
          },
        },
        "contracts": {
          "multicall3": {
            "address": "0x89e4EDbEC85362a285d7a1D5D255ccD2b8106be2",
          },
        },
        "id": 280,
        "name": "zkSync Era Testnet",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "zksync-era-testnet",
        "rpcUrls": {
          "default": {
            "http": [
              "https://testnet.era.zksync.dev",
            ],
            "webSocket": [
              "wss://testnet.era.zksync.dev/ws",
            ],
          },
          "public": {
            "http": [
              "https://testnet.era.zksync.dev",
            ],
            "webSocket": [
              "wss://testnet.era.zksync.dev/ws",
            ],
          },
        },
        "testnet": true,
      },
    }
  `)
})
