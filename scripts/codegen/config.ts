export const items = [
  {
    type: 'query',
    name: 'call',
    required: [],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
      compute: {
        parameters: false,
      },
    },
    query: {
      cast: {
        parameters: true,
      },
    },
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getBlockNumber',
    required: [],
    action: {
      type: 'config',
      parameters: ['config', 'chainId'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react', 'vue'],
    },
  },
  {
    type: 'query',
    name: 'getBlockTransactionCount',
    required: [],
    action: {
      type: 'config',
      parameters: ['config', 'chainId'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getBytecode',
    required: ['address'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {
      cast: {
        return: true,
      },
    },
    primitive: {
      types: ['react', 'vue'],
    },
  },
  // {
  //   type: 'query',
  //   name: 'getCallsStatus',
  //   required: ['id', 'connector'],
  //   action: {
  //     type: 'connector',
  //     parameters: ['config'],
  //     returnType: [],
  //   },
  //   query: {},
  // },
  // {
  //   type: 'query',
  //   name: 'getCapabilities',
  //   required: ['connector'],
  //   action: {
  //     type: 'connector',
  //     parameters: [
  //       'config',
  //       {
  //         name: 'chainId',
  //         type: "config['chains'][number]['id'] | undefined",
  //         default: 'undefined',
  //       },
  //     ],
  //     returnType: [
  //       'config',
  //       {
  //         name: 'chainId',
  //         type: "config['chains'][number]['id'] | undefined",
  //       },
  //     ],
  //   },
  //   query: {},
  // },
  {
    type: 'query',
    name: 'getEnsAddress',
    required: ['name'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react', 'vue'],
    },
  },
  {
    type: 'query',
    name: 'getEnsAvatar',
    required: ['name'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react', 'vue'],
    },
  },
  {
    type: 'query',
    name: 'getEnsName',
    required: ['address'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react', 'vue'],
    },
  },
  {
    type: 'query',
    name: 'getEnsResolver',
    required: ['name'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getEnsText',
    required: ['name', 'key'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getFeeHistory',
    required: ['blockCount', 'rewardPercentiles'],
    action: {
      type: 'config',
      parameters: ['config', 'chainId'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getGasPrice',
    required: [],
    action: {
      type: 'config',
      parameters: ['config', 'chainId'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getProof',
    required: ['address', 'storageKeys'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getStorageAt',
    required: ['address', 'slot'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {
      cast: {
        return: true,
      },
    },
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'getTransactionCount',
    required: ['address'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  {
    type: 'query',
    name: 'verifyMessage',
    required: ['address', 'message', 'signature'],
    action: {
      type: 'config',
      parameters: ['config'],
      returnType: [],
    },
    query: {},
    primitive: {
      types: ['react'],
    },
  },
  // {
  //   type: 'query',
  //   name: 'waitForCallsStatus',
  //   required: ['id', 'connector'],
  //   action: {
  //     type: 'connector',
  //     parameters: ['config'],
  //     returnType: [],
  //   },
  //   query: {
  //     cast: {
  //       return: true,
  //     },
  //   },
  // },
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
        variables: (typeParameter & { default?: string })[]
        optionalParameters?: true
      }
    }
  | {
      type: 'query'
      name: string
      required: (requiredItem | requiredItem[])[]
      action: {
        type: 'config' | 'connector'
        parameters: (
          | 'chainId'
          | 'config'
          | (typeParameter & { default?: string })
        )[]
        returnType: ('chainId' | 'config' | typeParameter)[]
        compute?: {
          parameters?: boolean
        }
      }
      query: {
        imports?: { names: string[]; path: string }[]
        cast?: {
          options?: true
          parameters?: true
          queryKey?: true
          return?: true
        }
      }
      primitive: {
        types: ('react' | 'vue')[]
      }
    }

export type typeParameter = { name: string; type: string }

export type requiredItem =
  | string
  | {
      name: string
      cond: (options: string, name: string) => string
    }
