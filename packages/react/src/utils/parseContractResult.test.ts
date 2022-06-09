import { BigNumber } from 'ethers'
import { Result } from 'ethers/lib/utils'

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
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'withoutNames',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'simpleTuples',
    outputs: [
      {
        components: [
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
        internalType: 'struct Gms[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'complexTuples',
    outputs: [
      {
        components: [
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
          {
            components: [
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
            internalType: 'struct Gms[]',
            name: 'gms',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct Gms[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

describe('parseContractResult', () => {
  describe('gms', () => {
    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data = [
        BigNumber.from(1654322661),
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      ]
      const result = parseContractResult({
        contractInterface,
        data,
        functionName: 'gms',
      })
      expect(result).toEqual(data)
      expect(Object.keys(result).length !== data.length).toBeTruthy()
      expect(result.timestamp).toEqual(data[0])
      expect(result.sender).toEqual(data[1])
    })

    it('should return the data if in sync with ethers Result', () => {
      const data = Object.assign(
        [
          BigNumber.from(1654322661),
          '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        ],
        {
          timestamp: BigNumber.from(1654322661),
          sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        },
      )
      const result = parseContractResult({
        contractInterface,
        data,
        functionName: 'gms',
      })
      expect(Object.keys(result).length !== data.length).toBeTruthy()
      expect(result).toEqual(data)
      expect(result.timestamp).toEqual(data.timestamp)
      expect(result.sender).toEqual(data.sender)
    })
  })

  describe('simpleTuples', () => {
    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data: [BigNumber, string][] = [
        [
          BigNumber.from(1654322661),
          '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        ],
        [
          BigNumber.from(1654322662),
          '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AD',
        ],
      ]
      const result = parseContractResult({
        contractInterface,
        data,
        functionName: 'simpleTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(result[0]).toEqual(data[0])
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.[0])
      expect(result[0].sender).toEqual(data?.[0]?.[1])
      expect(result[1]).toEqual(data[1])
      expect(Object.keys(result[1]).length !== data[1]?.length).toBeTruthy()
      expect(result[1].timestamp).toEqual(data[1]?.[0])
      expect(result[1].sender).toEqual(data[1]?.[1])
    })

    it('should return the data if in sync with ethers Result', () => {
      const data: Result = [
        Object.assign(
          [
            BigNumber.from(1654322661),
            '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          ],
          {
            timestamp: BigNumber.from(1654322661),
            sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          },
        ),
        Object.assign(
          [
            BigNumber.from(1654322662),
            '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AD',
          ],
          {
            timestamp: BigNumber.from(1654322662),
            sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AD',
          },
        ),
      ]
      const result = parseContractResult({
        contractInterface,
        data,
        functionName: 'complexTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(result[0]).toEqual(data[0])
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.timestamp)
      expect(result[0].sender).toEqual(data?.[0]?.sender)
      expect(result[1]).toEqual(data[1])
      expect(Object.keys(result[1]).length !== data[1]?.length).toBeTruthy()
      expect(result[1].timestamp).toEqual(data[1]?.timestamp)
      expect(result[1].sender).toEqual(data[1]?.sender)
    })
  })

  describe('complexTuples', () => {
    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data: [BigNumber, string, [BigNumber, string][]][] = [
        [
          BigNumber.from(1654322661),
          '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          [
            [
              BigNumber.from(1654322661),
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            ],
            [
              BigNumber.from(1654322661),
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            ],
          ],
        ],
        [
          BigNumber.from(1654322662),
          '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AD',
          [
            [
              BigNumber.from(1654322661),
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            ],
            [
              BigNumber.from(1654322661),
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            ],
          ],
        ],
      ]
      const result = parseContractResult({
        contractInterface,
        data,
        functionName: 'complexTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(result[0]).toEqual(data[0])
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.[0])
      expect(result[0].sender).toEqual(data?.[0]?.[1])
      expect(result[0].gms).toEqual(data?.[0]?.[2])
      expect(result[0].gms[0]).toEqual(data?.[0]?.[2]?.[0])
      expect(result[0].gms[0].timestamp).toEqual(data?.[0]?.[2]?.[0]?.[0])
      expect(result[0].gms[0].sender).toEqual(data?.[0]?.[2]?.[0]?.[1])
      expect(result[1]).toEqual(data[1])
      expect(Object.keys(result[1]).length !== data[1]?.length).toBeTruthy()
      expect(result[1].timestamp).toEqual(data[1]?.[0])
      expect(result[1].sender).toEqual(data[1]?.[1])
      expect(result[1].gms).toEqual(data?.[1]?.[2])
      expect(result[1].gms[0]).toEqual(data?.[1]?.[2]?.[0])
      expect(result[1].gms[0].timestamp).toEqual(data?.[1]?.[2]?.[0]?.[0])
      expect(result[1].gms[0].sender).toEqual(data?.[1]?.[2]?.[0]?.[1])
    })

    it('should return the data if in sync with ethers Result', () => {
      const data: Result = [
        Object.assign(
          [
            BigNumber.from(1654322661),
            '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            [
              [
                BigNumber.from(1654322661),
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              ],
              [
                BigNumber.from(1654322661),
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              ],
            ],
          ],
          {
            timestamp: BigNumber.from(1654322661),
            sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            gms: [
              Object.assign(
                [
                  BigNumber.from(1654322661),
                  '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                ],
                {
                  timestamp: BigNumber.from(1654322661),
                  sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                },
              ),
              Object.assign(
                [
                  BigNumber.from(1654322661),
                  '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                ],
                {
                  timestamp: BigNumber.from(1654322661),
                  sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                },
              ),
            ],
          },
        ),
        Object.assign(
          [
            BigNumber.from(1654322662),
            '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AD',
            [
              [
                BigNumber.from(1654322661),
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              ],
              [
                BigNumber.from(1654322661),
                '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              ],
            ],
          ],
          {
            timestamp: BigNumber.from(1654322662),
            sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AD',
            gms: [
              Object.assign(
                [
                  BigNumber.from(1654322661),
                  '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                ],
                {
                  timestamp: BigNumber.from(1654322661),
                  sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                },
              ),
              Object.assign(
                [
                  BigNumber.from(1654322661),
                  '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                ],
                {
                  timestamp: BigNumber.from(1654322661),
                  sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                },
              ),
            ],
          },
        ),
      ]
      const result = parseContractResult({
        contractInterface,
        data,
        functionName: 'complexTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(result[0]).toEqual(data[0])
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.timestamp)
      expect(result[0].sender).toEqual(data?.[0]?.sender)
      expect(result[0].gms[0].timestamp).toEqual(data[0].gms[0].timestamp)
      expect(result[0].gms[0].sender).toEqual(data[0].gms[0].sender)
      expect(result[1]).toEqual(data[1])
      expect(Object.keys(result[1]).length !== data[1]?.length).toBeTruthy()
      expect(result[1].timestamp).toEqual(data[1]?.timestamp)
      expect(result[1].sender).toEqual(data[1]?.sender)
      expect(result[1].gms[0].timestamp).toEqual(data[1].gms[0].timestamp)
      expect(result[1].gms[0].sender).toEqual(data[1].gms[0].sender)
    })
  })

  describe('withoutNames', () => {
    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data = [
        BigNumber.from(1654322661),
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      ]
      const result = parseContractResult({
        contractInterface,
        data,
        functionName: 'withoutNames',
      })
      expect(result).toEqual(data)
      expect(Object.keys(result).length === data.length).toBeTruthy()
    })
  })
})
