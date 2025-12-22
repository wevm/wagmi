// TODO (query): infiniteReadContracts, readContracts
// TODO (mutation): deployContract, sendCalls, sendCallsSync, sendTransaction, sendTransactionSync, showCallsStatus, signTypedData, switchChain, switchConnection, writeContract

export const items = [
  {
    type: 'query',
    name: 'call',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config'],
      cast: {
        parameters: true,
      },
    },
  },
  {
    type: 'mutation',
    name: 'connect',
    query: {
      imports: [
        { names: ['Connector'], path: '../createConfig.js' },
        {
          names: ['CreateConnectorFn'],
          path: '../connectors/createConnector.js',
        },
      ],
      data: [
        { name: 'config', type: 'Config' },
        { name: 'connector', type: 'Connector | CreateConnectorFn' },
        { name: 'withCapabilities', type: 'boolean' },
      ],
      variables: [
        { name: 'config', type: 'Config' },
        {
          name: 'connector',
          type: "config['connectors'][number] | Connector | CreateConnectorFn",
        },
        { name: 'withCapabilities', type: 'boolean', default: 'false' },
      ],
    },
  },
  {
    type: 'mutation',
    name: 'disconnect',
    query: {
      imports: [],
      data: [],
      variables: [],
      optionalParameters: true,
    },
  },
  {
    type: 'query',
    name: 'estimateFeesPerGas',
    required: [],
    query: {
      imports: ['FeeValuesType'],
      data: [{ name: 'type', type: 'FeeValuesType' }],
      options: [
        { name: 'type', type: 'FeeValuesType', default: "'eip1559'" },
        'config',
      ],
    },
  },
  {
    type: 'query',
    name: 'estimateGas',
    required: [['account', 'connector']],
    query: {
      imports: [],
      data: [],
      options: [
        'config',
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
      ],
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}`,
      cast: {
        parameters: true,
        options: true,
      },
    },
  },
  {
    type: 'query',
    name: 'estimateMaxPriorityFeePerGas',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    type: 'query',
    name: 'getBalance',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getBlock',
    required: [],
    query: {
      imports: ['BlockTag'],
      data: [
        { name: 'includeTransactions', type: 'boolean' },
        { name: 'blockTag', type: 'BlockTag' },
        'config',
        'chainId',
      ],
      options: [
        { name: 'includeTransactions', type: 'boolean', default: 'false' },
        { name: 'blockTag', type: 'BlockTag', default: "'latest'" },
        'config',
        'chainId',
      ],
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.Compute<${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}>`,
    },
  },
  {
    type: 'query',
    name: 'getBlockNumber',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    type: 'query',
    name: 'getBlockTransactionCount',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    type: 'query',
    name: 'getBytecode',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
      cast: {
        return: true,
      },
    },
  },
  {
    type: 'query',
    name: 'getCallsStatus',
    required: ['id', 'connector'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getCapabilities',
    required: ['connector'],
    query: {
      imports: [],
      data: [
        'config',
        {
          name: 'chainId',
          type: "config['chains'][number]['id'] | undefined",
        },
      ],
      options: [
        'config',
        {
          name: 'chainId',
          type: "config['chains'][number]['id'] | undefined",
          default: 'undefined',
        },
      ],
    },
  },
  {
    type: 'query',
    name: 'getConnectorClient',
    required: [
      {
        name: 'connector',
        cond: (options, name) => `${options}.${name}?.getProvider`,
      },
    ],
    query: {
      imports: [],
      data: ['config', 'chainId'],
      options: ['config', 'chainId'],
      cast: {
        return: true,
      },
      extraOptions: [
        { name: 'gcTime', default: '0' },
        { name: 'staleTime', default: 'Number.POSITIVE_INFINITY' },
      ],
    },
  },
  {
    type: 'query',
    name: 'getEnsAddress',
    required: ['name'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getEnsAvatar',
    required: ['name'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getEnsName',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getEnsResolver',
    required: ['name'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getEnsText',
    required: ['name', 'key'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getFeeHistory',
    required: ['blockCount', 'rewardPercentiles'],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    type: 'query',
    name: 'getGasPrice',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    type: 'query',
    name: 'getProof',
    required: ['address', 'storageKeys'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getStorageAt',
    required: ['address', 'slot'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
      cast: {
        return: true,
      },
    },
  },
  {
    type: 'query',
    name: 'getTransaction',
    required: (o, p = o) => ({
      cond: `${p}.hash || (${p}.index && (${p}.blockHash || ${p}.blockNumber || ${p}.blockTag))`,
      message: 'hash OR index AND blockHash, blockNumber, blockTag is required',
    }),
    query: {
      imports: [],
      data: ['config', 'chainId'],
      options: ['config', 'chainId'],
      cast: {
        parameters: true,
        return: true,
      },
    },
  },
  {
    type: 'query',
    name: 'getTransactionConfirmations',
    required: ['hash', 'transactionReceipt'],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}`,
      cast: {
        options: true,
        parameters: true,
      },
    },
  },
  {
    type: 'query',
    name: 'getTransactionCount',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'getTransactionReceipt',
    required: ['hash'],
    query: {
      imports: [],
      data: ['config', 'chainId'],
      options: ['config', 'chainId'],
    },
  },
  {
    type: 'query',
    name: 'getWalletClient',
    required: [
      {
        name: 'connector',
        cond: (options, name) => `${options}.${name}?.getProvider`,
      },
    ],
    query: {
      imports: [],
      data: ['config', 'chainId'],
      options: ['config', 'chainId'],
      cast: {
        return: true,
      },
      extraOptions: [
        { name: 'gcTime', default: '0' },
        { name: 'staleTime', default: 'Number.POSITIVE_INFINITY' },
      ],
    },
  },
  {
    type: 'query',
    name: 'prepareTransactionRequest',
    required: ['to'],
    query: {
      imports: [
        'PrepareTransactionRequestRequest',
        { names: ['SelectChains'], path: '../types/chain.js' },
      ],
      data: [
        'config',
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
        {
          name: 'request',
          type: 'PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
        },
      ],
      options: [
        'config',
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
        {
          name: 'request',
          type: 'PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
        },
      ],
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
  {
    type: 'query',
    name: 'readContract',
    required: [
      [
        'address',
        {
          name: 'code',
          cond: (options, name) =>
            `('${name}' in ${options} && ${options}.${name})`,
        },
      ],
      'abi',
      'functionName',
    ],
    query: {
      imports: [
        'Abi',
        'ContractFunctionArgs',
        'ContractFunctionName',
        { names: ['structuralSharing'], path: './utils.js' },
      ],
      // biome-ignore format: no formatting
      data: [
        { name: "abi", type: "Abi | readonly unknown[]" },
        { name: "functionName", type: "ContractFunctionName<abi, 'pure' | 'view'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'pure' | 'view', functionName>" },
      ],
      // biome-ignore format: no formatting
      options: [
        { name: "abi", type: "Abi | readonly unknown[]", const: true },
        { name: "functionName", type: "ContractFunctionName<abi, 'pure' | 'view'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'pure' | 'view', functionName>", const: true },
        'config',
      ],
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
      extraOptions: [
        {
          name: 'structuralSharing',
          default: 'structuralSharing',
        },
      ],
    },
  },
  {
    type: 'mutation',
    name: 'reconnect',
    query: {
      imports: [],
      data: [],
      variables: [],
      optionalParameters: true,
    },
  },
  // {
  //   type: 'mutation',
  //   name: 'sendTransaction',
  //   query: {
  //     imports: [],
  //     data: [],
  //     variables: [
  //       { name: 'config', type: 'Config' },
  //       { name: 'chainId', type: "config['chains'][number]['id']" },
  //     ],
  //   },
  // },
  {
    type: 'mutation',
    name: 'signMessage',
    query: {
      imports: [],
      data: [],
      variables: [],
    },
  },
  {
    type: 'query',
    name: 'simulateContract',
    required: ['abi', 'address', 'connector', 'functionName'],
    query: {
      imports: ['Abi', 'ContractFunctionArgs', 'ContractFunctionName'],
      // biome-ignore format: no formatting
      data: [
        { name: "abi", type: "Abi | readonly unknown[]" },
        { name: "functionName", type: "ContractFunctionName<abi, 'nonpayable' | 'payable'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>" },
        'config',
        'chainId',
      ],
      // biome-ignore format: no formatting
      options: [
        { name: "abi", type: "Abi | readonly unknown[]", const: true },
        { name: "functionName", type: "ContractFunctionName<abi, 'nonpayable' | 'payable'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>", const: true },
        'config',
        'chainId',
      ],
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
  {
    type: 'query',
    name: 'verifyMessage',
    required: ['address', 'message', 'signature'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    type: 'query',
    name: 'verifyTypedData',
    required: ['address', 'message', 'primaryType', 'signature', 'types'],
    query: {
      imports: ['TypedData'],
      data: [],
      options: [
        {
          name: 'typedData',
          type: 'TypedData | Record<string, unknown>',
          const: true,
        },
        { name: 'primaryType', type: "keyof typedData | 'EIP712Domain'" },
        'config',
      ],
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}`,
      cast: {
        parameters: true,
      },
    },
  },
  {
    type: 'query',
    name: 'waitForCallsStatus',
    required: ['id', 'connector'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
      cast: {
        return: true,
      },
    },
  },
  {
    type: 'query',
    name: 'waitForTransactionReceipt',
    required: ['hash'],
    query: {
      imports: [],
      data: ['config', 'chainId'],
      options: ['config', 'chainId'],
      cast: {
        return: true,
      },
      skipped: ['onReplaced'],
    },
  },
  {
    type: 'mutation',
    name: 'watchAsset',
    query: {
      imports: [],
      data: [],
      variables: [],
    },
  },
] satisfies Item[]

export type Item =
  | {
      type: 'mutation'
      name: string
      query: {
        imports: (
          | 'Abi'
          | 'BlockTag'
          | 'ContractFunctionArgs'
          | 'ContractFunctionName'
          | 'FeeValuesType'
          | 'PrepareTransactionRequestRequest'
          | 'TypedData'
          | { names: string[]; path: string }
        )[]
        data: typeParameter[]
        variables: (typeParameter & { const?: true; default?: string })[]
        optionalParameters?: true
      }
    }
  | {
      type: 'query'
      name: string
      required:
        | ((
            options: string,
            parameters?: string,
          ) => { cond: string; message: string })
        | (requiredItem | requiredItem[])[]
      query: {
        imports: (
          | 'Abi'
          | 'BlockTag'
          | 'ContractFunctionArgs'
          | 'ContractFunctionName'
          | 'FeeValuesType'
          | 'PrepareTransactionRequestRequest'
          | 'TypedData'
          | { names: string[]; path: string }
        )[]
        options: (
          | 'chainId'
          | 'config'
          | (typeParameter & { const?: true; default?: string })
        )[]
        optionsType?: (
          t: string,
          typePrefix: string,
          slots: string,
          extras: string,
        ) => string
        data: ('chainId' | 'config' | typeParameter)[]
        cast?: {
          options?: true
          parameters?: true
          queryKey?: true
          return?: true
        }
        skipped?: string[]
        extraOptions?: { name: string; default: string }[]
      }
    }

export type typeParameter = { name: string; type: string }

export type requiredItem =
  | string
  | {
      name: string
      cond: (options: string, name: string) => string
    }
