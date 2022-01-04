import { actHook, renderHook } from '../../../test'
import { useFeeData } from './useFeeData'

describe('useFeeData', () => {
  describe('on mount', () => {
    it('fetches', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useFeeData())
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": true,
        }
      `)
      await waitForNextUpdate()
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": {
            "formatted": {
              "gasPrice": "73955459093",
              "maxFeePerGas": "147410918186",
              "maxPriorityFeePerGas": "2500000000",
            },
            "gasPrice": {
              "hex": "0x113816c015",
              "type": "BigNumber",
            },
            "maxFeePerGas": {
              "hex": "0x2252601b2a",
              "type": "BigNumber",
            },
            "maxPriorityFeePerGas": {
              "hex": "0x9502f900",
              "type": "BigNumber",
            },
          },
          "error": undefined,
          "loading": false,
        }
      `)
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useFeeData({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  it('getFeeData', async () => {
    const { result } = renderHook(() => useFeeData({ skip: true }))

    await actHook(async () => {
      const res = await result.current[1]()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "gasPrice": {
              "hex": "0x113816c015",
              "type": "BigNumber",
            },
            "maxFeePerGas": {
              "hex": "0x2252601b2a",
              "type": "BigNumber",
            },
            "maxPriorityFeePerGas": {
              "hex": "0x9502f900",
              "type": "BigNumber",
            },
          },
          "error": undefined,
        }
      `)
    })
  })
})
