// #region erc20Abi-balanceOf
export const erc20Abi = [
  // ...
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'account',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
  },
  // ...
] as const
// #endregion erc20Abi-balanceOf

// #region erc20Abi-totalSupply
export const erc20Abi = [
  // ...
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: 'supply',
        type: 'uint256',
      },
    ],
  },
  // ...
] as const
// #endregion erc20Abi-totalSupply
