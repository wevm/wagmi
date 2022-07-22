import { BigNumber } from 'ethers'

import { renderHook } from '../../../test'
import { usePrepareSendTransaction } from './usePrepareSendTransaction'

describe('usePrepareSendTransaction', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      usePrepareSendTransaction({
        request: {
          to: 'moxey.eth',
          value: BigNumber.from('10000000000000000'),
        },
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "config": {
          "mode": "prepared",
          "request": {
            "gasLimit": {
              "hex": "0x5208",
              "type": "BigNumber",
            },
            "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
            "value": {
              "hex": "0x2386f26fc10000",
              "type": "BigNumber",
            },
          },
        },
        "data": {
          "mode": "prepared",
          "request": {
            "gasLimit": {
              "hex": "0x5208",
              "type": "BigNumber",
            },
            "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
            "value": {
              "hex": "0x2386f26fc10000",
              "type": "BigNumber",
            },
          },
        },
        "error": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": true,
        "isFetching": false,
        "isIdle": false,
        "isLoading": false,
        "isRefetching": false,
        "isSuccess": true,
        "refetch": [Function],
        "status": "success",
      }
    `)
  })
})
