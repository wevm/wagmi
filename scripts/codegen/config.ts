export const items = [
  {
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
    name: 'estimateGas',
    required: [['account', 'connector']],
    query: {
      imports: [],
      data: [],
      options: [
        { name: 'config', type: 'Config' },
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
      ],
      optionsType: (t, typePrefix, slots) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        parameters: true,
        options: true,
      },
    },
  },
  {
    name: 'estimateMaxPriorityFeePerGas',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    name: 'getBalance',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
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
      optionsType: (t, typePrefix, slots) =>
        `${t}.Compute<${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter>`,
    },
  },
  {
    name: 'getBlockNumber',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    name: 'getBlockTransactionCount',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  // TODO: getBytecode -> getCode
  // TODO: getCallsStatus
  // TODO: getCapabilities
  {
    name: 'getEnsAddress',
    required: ['name'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    name: 'getEnsAvatar',
    required: ['name'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    name: 'getEnsName',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    name: 'getEnsResolver',
    required: ['name'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    name: 'getEnsText',
    required: ['name'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  // TODO: getFeeHistory
  {
    name: 'getGasPrice',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    name: 'getProof',
    required: ['address', 'storageKeys'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    // TODO: null to return data
    name: 'getStorageAt',
    required: ['address', 'slot'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  // TODO: getTransaction
  // TODO: getTransactionConfirmations
  {
    name: 'getTransactionCount',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  // TODO: getTransactionReceipt
  {
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
        { name: 'config', type: 'Config' },
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
        {
          name: 'request',
          type: 'PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
        },
      ],
      optionsType: (t, typePrefix, slots) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
  {
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
      imports: ['Abi', 'ContractFunctionArgs', 'ContractFunctionName'],
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
      optionsType: (t, typePrefix, slots) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
  // TODO: readContracts
  {
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
      optionsType: (t, typePrefix, slots) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
  {
    name: 'verifyMessage',
    required: ['address', 'message', 'signature'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
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
      optionsType: (t, typePrefix, slots) =>
        `${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        parameters: true,
      },
    },
  },
  // {
  //   // TODO: retry
  //   name: 'waitForCallsStatus',
  //   required: ['id'],
  //   query: {
  //     imports: [],
  //     data: [],
  //     options: [],
  //     cast: {
  //       return: true,
  //     },
  //   },
  // },
  {
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
] satisfies Item[]

export type Item = {
  name: string
  required: (
    | string
    | { name: string; cond: (options: string, name: string) => string }
    | (
        | string
        | { name: string; cond: (options: string, name: string) => string }
      )[]
  )[]
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
      | { name: string; type: string; const?: true; default?: string }
    )[]
    optionsType?: (t: string, typePrefix: string, slots: string) => string
    data: ('chainId' | 'config' | { name: string; type: string })[]
    cast?: {
      options?: true
      parameters?: true
      queryKey?: true
      return?: true
    }
    skipped?: string[]
  }
}
