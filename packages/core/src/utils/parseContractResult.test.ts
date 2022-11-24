import { BigNumber } from 'ethers'
import type { Result } from 'ethers/lib/utils.js'
import { describe, expect, it } from 'vitest'

import { parseContractResult } from './parseContractResult'

describe('parseContractResult', () => {
  describe('struct', () => {
    const abi = [
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

    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data = [
        BigNumber.from(1654322661),
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      ]
      const result = parseContractResult({
        abi,
        data,
        functionName: 'gms',
      })
      expect(JSON.stringify(result)).toEqual(JSON.stringify(data))
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
        abi,
        data,
        functionName: 'gms',
      })
      expect(Object.keys(result).length !== data.length).toBeTruthy()
      expect(result).toEqual(data)
      expect(result.timestamp).toEqual(data.timestamp)
      expect(result.sender).toEqual(data.sender)
    })
  })

  describe('struct with no named attributes', () => {
    const abi = [
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
    ]

    it('should parse the data to an ethers Result', () => {
      const data = [
        BigNumber.from(1654322661),
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      ]
      const result = parseContractResult({
        abi,
        data,
        functionName: 'withoutNames',
      })
      expect(result).toEqual(data)
      expect(Object.keys(result).length === data.length).toBeTruthy()
    })
  })

  describe('array', () => {
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'addresses',
        outputs: [
          {
            internalType: 'address[]',
            name: 'addresses',
            type: 'address[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ]

    it('should parse the data to an ethers Result', () => {
      const data = [
        '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      ]
      const result = parseContractResult({
        abi,
        data,
        functionName: 'addresses',
      })
      expect(result).toEqual(data)
    })
  })

  describe('array with no named attributes', () => {
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'indexes',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ]

    it('should parse the data to an ethers Result', () => {
      const data = [BigNumber.from(1), BigNumber.from(2), BigNumber.from(3)]
      const result = parseContractResult({
        abi,
        data,
        functionName: 'indexes',
      })
      expect(result).toEqual(data)
      expect(Object.keys(result).length === data.length).toBeTruthy()
    })
  })

  describe('array of simple tuples', () => {
    const abi = [
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
    ]

    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data: [BigNumber, string][] = [
        [
          BigNumber.from(1654322661),
          '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        ],
        [
          BigNumber.from(1654322662),
          '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
        ],
      ]
      const result = parseContractResult({
        abi,
        data,
        functionName: 'simpleTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(JSON.stringify(result[0])).toEqual(JSON.stringify(data[0]))
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.[0])
      expect(result[0].sender).toEqual(data?.[0]?.[1])
      expect(JSON.stringify(result[1])).toEqual(JSON.stringify(data[1]))
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
            '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
          ],
          {
            timestamp: BigNumber.from(1654322662),
            sender: '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
          },
        ),
      ]
      const result = parseContractResult({
        abi,
        data,
        functionName: 'simpleTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(JSON.stringify(result[0])).toEqual(JSON.stringify(data[0]))
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.timestamp)
      expect(result[0].sender).toEqual(data?.[0]?.sender)
      expect(result[1]).toEqual(data[1])
      expect(Object.keys(result[1]).length !== data[1]?.length).toBeTruthy()
      expect(result[1].timestamp).toEqual(data[1]?.timestamp)
      expect(result[1].sender).toEqual(data[1]?.sender)
    })
  })

  describe('array of complex tuples', () => {
    const abi = [
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
                internalType: 'address[]',
                name: 'senders',
                type: 'address[]',
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

    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data: [BigNumber, string[], [BigNumber, string][]][] = [
        [
          BigNumber.from(1654322661),
          [
            '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
          ],
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
          [
            '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
          ],
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
        abi,
        data,
        functionName: 'complexTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(JSON.stringify(result[0])).toEqual(JSON.stringify(data[0]))
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.[0])
      expect(result[0].senders).toEqual(data?.[0]?.[1])
      expect(JSON.stringify(result[0].gms)).toEqual(
        JSON.stringify(data?.[0]?.[2]),
      )
      expect(JSON.stringify(result[0].gms[0])).toEqual(
        JSON.stringify(data?.[0]?.[2]?.[0]),
      )
      expect(result[0].gms[0].timestamp).toEqual(data?.[0]?.[2]?.[0]?.[0])
      expect(result[0].gms[0].sender).toEqual(data?.[0]?.[2]?.[0]?.[1])
      expect(JSON.stringify(result[1])).toEqual(JSON.stringify(data[1]))
      expect(Object.keys(result[1]).length !== data[1]?.length).toBeTruthy()
      expect(result[1].timestamp).toEqual(data[1]?.[0])
      expect(result[1].senders).toEqual(data[1]?.[1])
      expect(JSON.stringify(result[1].gms)).toEqual(
        JSON.stringify(data?.[1]?.[2]),
      )
      expect(JSON.stringify(result[1].gms[0])).toEqual(
        JSON.stringify(data?.[1]?.[2]?.[0]),
      )
      expect(result[1].gms[0].timestamp).toEqual(data?.[1]?.[2]?.[0]?.[0])
      expect(result[1].gms[0].sender).toEqual(data?.[1]?.[2]?.[0]?.[1])
    })

    it('should return the data if in sync with ethers Result', () => {
      const data: Result = [
        Object.assign(
          [
            BigNumber.from(1654322661),
            [
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
            ],
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
            senders: [
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
            ],
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
            [
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
            ],
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
            senders: [
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
            ],
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
        abi,
        data,
        functionName: 'complexTuples',
      })

      expect(Object.keys(result).length === data.length).toBeTruthy()
      expect(JSON.stringify(result[0])).toEqual(JSON.stringify(data[0]))
      expect(Object.keys(result[0]).length !== data[0]?.length).toBeTruthy()
      expect(result[0].timestamp).toEqual(data?.[0]?.timestamp)
      expect(result[0].sender).toEqual(data?.[0]?.sender)
      expect(result[0].gms[0].timestamp).toEqual(data[0].gms[0].timestamp)
      expect(result[0].gms[0].sender).toEqual(data[0].gms[0].sender)
      expect(JSON.stringify(result[1])).toEqual(JSON.stringify(data[1]))
      expect(Object.keys(result[1]).length !== data[1]?.length).toBeTruthy()
      expect(result[1].timestamp).toEqual(data[1]?.timestamp)
      expect(result[1].sender).toEqual(data[1]?.sender)
      expect(result[1].gms[0].timestamp).toEqual(data[1].gms[0].timestamp)
      expect(result[1].gms[0].sender).toEqual(data[1].gms[0].sender)
    })
  })

  describe('tuple of complex types', () => {
    const abi = [
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
          {
            components: [
              {
                internalType: 'uint256',
                name: 'count',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'firstGmTimestamp',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lastGmTimestamp',
                type: 'uint256',
              },
            ],
            internalType: 'struct Sender',
            name: 'sender',
            type: 'tuple',
          },
          {
            internalType: 'uint256[]',
            name: 'timestamps',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ]

    it('should parse the data to an ethers Result if there are no named keys', () => {
      const data: [[BigNumber, string][], BigNumber[], BigNumber[]] = [
        [
          [
            BigNumber.from(1654322661),
            '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          ],
          [
            BigNumber.from(1654322662),
            '0xa5Cc3C03994DB5B0d9a5EEdD10CaBab0813678ad',
          ],
        ],
        [
          BigNumber.from(69),
          BigNumber.from(1654322661),
          BigNumber.from(1654322661),
        ],
        [
          BigNumber.from(1654322660),
          BigNumber.from(1654322661),
          BigNumber.from(1654322662),
        ],
      ]
      const [gms, sender, timestamps] = data

      const result = parseContractResult({
        abi,
        data,
        functionName: 'gms',
      })
      const [receivedGms, receivedSender, receivedTimestamps] = result

      expect(Object.keys(result).length !== data.length).toBeTruthy()

      expect(result.gms).toEqual(receivedGms)
      expect(result.sender).toEqual(receivedSender)
      expect(result.timestamps).toEqual(receivedTimestamps)

      expect(JSON.stringify(receivedGms)).toEqual(JSON.stringify(gms))
      expect(Object.keys(receivedGms[0]).length !== gms[0]?.length).toBeTruthy()
      expect(receivedGms[0].timestamp).toEqual(gms[0]?.[0])
      expect(receivedGms[0].sender).toEqual(gms[0]?.[1])

      expect(JSON.stringify(receivedSender)).toEqual(JSON.stringify(sender))
      expect(receivedSender.count).toEqual(sender[0])
      expect(receivedSender.firstGmTimestamp).toEqual(sender[1])
      expect(receivedSender.lastGmTimestamp).toEqual(sender[2])

      expect(JSON.stringify(receivedTimestamps)).toEqual(
        JSON.stringify(timestamps),
      )
    })
  })
})
