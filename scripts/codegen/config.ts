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
  // TODO: showCallsStatus
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
        imports: { names: string[]; path: string }[]
        data: typeParameter[]
        variables: (typeParameter & { const?: true; default?: string })[]
        optionalParameters?: true
      }
    }
  | {
      type: 'query'
      name: string
      required: (requiredItem | requiredItem[])[]
      query: {
        imports: { names: string[]; path: string }[]
        options: (
          | 'chainId'
          | 'config'
          | (typeParameter & { const?: true; default?: string })
        )[]
        data: ('chainId' | 'config' | typeParameter)[]
        cast?: {
          options?: true
          parameters?: true
          queryKey?: true
          return?: true
        }
      }
    }

export type typeParameter = { name: string; type: string }

export type requiredItem =
  | string
  | {
      name: string
      cond: (options: string, name: string) => string
    }
