import { defineConfig, etherscan, foundry } from '@wagmi/cli'

const apiKey = 'MK9NWF5JSK6JPWDMVTIJF4RZ466VD2XEPZ'

export default defineConfig({
  contracts: [
    // etherscan({
    //   name: 'WagmiMintEtherscan',
    //   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    //   apiKey,
    //   chainId: 1,
    // }),
    // etherscan({
    //   name: 'EnsRegistry',
    //   address: {
    //     1: '0x314159265dd8dbb310642f98f50c066173c1259b',
    //     5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
    //   },
    //   apiKey,
    //   chainId: 1,
    // }),
    foundry({
      // namePrefix: 'HelloFoundry',
      // out: 'artifacts',
      project: '../hello_foundry',
      // watch: true,
    }),

    ////////////////////////////////////////////////////////////////
    // {
    //   name: 'WagmiMintInline',
    //   address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
    //   source: [
    //     {
    //       inputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'constructor',
    //     },
    //   ],
    // },
    // blockExplorer({
    //   name: 'WagmiMintBlockScout',
    //   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    //   getApiUrl({ address }) {
    //     return `https://blockscout.com/eth/mainnet/api?module=contract&action=getabi&address=${address}`
    //   },
    //   async parseAbi({ response }) {
    //     const json = (await response.json()) as
    //       | { status: '0'; result: string }
    //       | { status: '1'; result: any[] }
    //     if (json.status === '0') throw new Error(json.result)
    //     return json.result
    //   },
    // }),

    // {
    //   address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
    //   name: 'WagmiMintFs',
    //   source: fs({ path: './src/contracts/wagmi.json' }),
    // },
    // {
    //   address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
    //   name: 'WagmiMintInline',
    //   source: [
    //     {
    //       inputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'constructor',
    //     },
    //     {
    //       anonymous: false,
    //       inputs: [
    //         {
    //           indexed: true,
    //           internalType: 'address',
    //           name: 'owner',
    //           type: 'address',
    //         },
    //         {
    //           indexed: true,
    //           internalType: 'address',
    //           name: 'approved',
    //           type: 'address',
    //         },
    //         {
    //           indexed: true,
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'Approval',
    //       type: 'event',
    //     },
    //     {
    //       anonymous: false,
    //       inputs: [
    //         {
    //           indexed: true,
    //           internalType: 'address',
    //           name: 'owner',
    //           type: 'address',
    //         },
    //         {
    //           indexed: true,
    //           internalType: 'address',
    //           name: 'operator',
    //           type: 'address',
    //         },
    //         {
    //           indexed: false,
    //           internalType: 'bool',
    //           name: 'approved',
    //           type: 'bool',
    //         },
    //       ],
    //       name: 'ApprovalForAll',
    //       type: 'event',
    //     },
    //     {
    //       anonymous: false,
    //       inputs: [
    //         {
    //           indexed: true,
    //           internalType: 'address',
    //           name: 'from',
    //           type: 'address',
    //         },
    //         {
    //           indexed: true,
    //           internalType: 'address',
    //           name: 'to',
    //           type: 'address',
    //         },
    //         {
    //           indexed: true,
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'Transfer',
    //       type: 'event',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'address',
    //           name: 'to',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'approve',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'address',
    //           name: 'owner',
    //           type: 'address',
    //         },
    //       ],
    //       name: 'balanceOf',
    //       outputs: [
    //         {
    //           internalType: 'uint256',
    //           name: '',
    //           type: 'uint256',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'getApproved',
    //       outputs: [
    //         {
    //           internalType: 'address',
    //           name: '',
    //           type: 'address',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'address',
    //           name: 'owner',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'address',
    //           name: 'operator',
    //           type: 'address',
    //         },
    //       ],
    //       name: 'isApprovedForAll',
    //       outputs: [
    //         {
    //           internalType: 'bool',
    //           name: '',
    //           type: 'bool',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [],
    //       name: 'mint',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [],
    //       name: 'name',
    //       outputs: [
    //         {
    //           internalType: 'string',
    //           name: '',
    //           type: 'string',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'ownerOf',
    //       outputs: [
    //         {
    //           internalType: 'address',
    //           name: '',
    //           type: 'address',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'address',
    //           name: 'from',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'address',
    //           name: 'to',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'safeTransferFrom',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'address',
    //           name: 'from',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'address',
    //           name: 'to',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //         {
    //           internalType: 'bytes',
    //           name: '_data',
    //           type: 'bytes',
    //         },
    //       ],
    //       name: 'safeTransferFrom',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'address',
    //           name: 'operator',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'bool',
    //           name: 'approved',
    //           type: 'bool',
    //         },
    //       ],
    //       name: 'setApprovalForAll',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'bytes4',
    //           name: 'interfaceId',
    //           type: 'bytes4',
    //         },
    //       ],
    //       name: 'supportsInterface',
    //       outputs: [
    //         {
    //           internalType: 'bool',
    //           name: '',
    //           type: 'bool',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [],
    //       name: 'symbol',
    //       outputs: [
    //         {
    //           internalType: 'string',
    //           name: '',
    //           type: 'string',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'tokenURI',
    //       outputs: [
    //         {
    //           internalType: 'string',
    //           name: '',
    //           type: 'string',
    //         },
    //       ],
    //       stateMutability: 'pure',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [],
    //       name: 'totalSupply',
    //       outputs: [
    //         {
    //           internalType: 'uint256',
    //           name: '',
    //           type: 'uint256',
    //         },
    //       ],
    //       stateMutability: 'view',
    //       type: 'function',
    //     },
    //     {
    //       inputs: [
    //         {
    //           internalType: 'address',
    //           name: 'from',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'address',
    //           name: 'to',
    //           type: 'address',
    //         },
    //         {
    //           internalType: 'uint256',
    //           name: 'tokenId',
    //           type: 'uint256',
    //         },
    //       ],
    //       name: 'transferFrom',
    //       outputs: [],
    //       stateMutability: 'nonpayable',
    //       type: 'function',
    //     },
    //   ],
    // },
  ],
})
