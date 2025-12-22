// TODO (query): infiniteReadContracts, readContracts
// TODO (mutation): connect, deployContract, disconnect, reconnect, sendCalls, sendCallsSync, sendTransaction, sendTransactionSync, showCallsStatus, signMessage, signTypedData, switchChain, switchConnection, watchAsset, writeContract

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
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.Compute<${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}>`,
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
  {
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
    name: 'getCallsStatus',
    required: ['id', 'connector'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
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
    required: ['name', 'key'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    name: 'getFeeHistory',
    required: ['blockCount', 'rewardPercentiles'],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
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
    name: 'getTransactionCount',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    name: 'getTransactionReceipt',
    required: ['hash'],
    query: {
      imports: [],
      data: ['config', 'chainId'],
      options: ['config', 'chainId'],
    },
  },
  {
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
      optionsType: (t, typePrefix, slots, extras) =>
        `${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ${extras}`,
      cast: {
        parameters: true,
      },
    },
  },
  {
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
