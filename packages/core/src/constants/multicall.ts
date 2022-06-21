export const multicallInterface = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'allowFailure',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall3.Call3[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall3.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
