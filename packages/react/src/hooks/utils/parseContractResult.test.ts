import { BigNumber } from 'ethers'

import { parseContractResult } from './parseContractResult'

const contractInterface = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'gms',
    outputs: [
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

describe('parseContractResult', () => {
  it('should parse the data to an ethers Result if there are no named keys', () => {
    const data = [
      BigNumber.from(1654322661),
      '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    ]
    expect(
      parseContractResult({
        contractInterface,
        data,

        functionName: 'gms',
      }),
    ).toEqual(Object.assign(data, { timestamp: data[0], sender: data[1] }))
  })
})
