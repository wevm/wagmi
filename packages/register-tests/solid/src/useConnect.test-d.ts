import { useConnect, useConnectors } from '@wagmi/solid'
import type { Address, Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'

test('infers connect parameters', () => {
  const connect = useConnect()
  const connectors = useConnectors()
  const connector = connectors()[0]! as ReturnType<typeof connectors>[number]

  connect.mutate({
    connector,
    foo: 'bar',
  })
  connect.mutate({
    connector: connectors()[1],
    // @ts-expect-error
    foo: 'bar',
  })
  connect.mutate({
    connector,
    capabilities: {
      signInWithEthereum: {
        nonce: 'foobarbaz',
      },
    },
  })
  connect.mutate({
    connector: connectors()[0],
    // @ts-expect-error
    capabilities: {
      signInWithEthereum: {
        nonce: 'foobarbaz',
      },
    },
  })

  connect.mutate(
    {
      connector,
      foo: 'bar',
      withCapabilities: true,
    },
    {
      onSuccess(data, _variables, _context) {
        expectTypeOf(data.accounts).toEqualTypeOf<
          readonly [
            {
              address: Address
              capabilities:
                | {
                    foo: { bar: Hex }
                  }
                | {
                    signInWithEthereum: {
                      message: string
                      signature: string
                    }
                  }
            },
            ...{
              address: Address
              capabilities:
                | {
                    foo: { bar: Hex }
                  }
                | {
                    signInWithEthereum: {
                      message: string
                      signature: string
                    }
                  }
            }[],
          ]
        >()
      },
      onSettled(data, _error, _variables, _context) {
        expectTypeOf(data?.accounts).toEqualTypeOf<
          | readonly [
              {
                address: Address
                capabilities:
                  | {
                      foo: { bar: Hex }
                    }
                  | {
                      signInWithEthereum: {
                        message: string
                        signature: string
                      }
                    }
              },
              ...{
                address: Address
                capabilities:
                  | {
                      foo: { bar: Hex }
                    }
                  | {
                      signInWithEthereum: {
                        message: string
                        signature: string
                      }
                    }
              }[],
            ]
          | undefined
        >()
      },
    },
  )

  ;(async () => {
    await connect.mutateAsync({
      connector,
      foo: 'bar',
      withCapabilities: true,
    })
    const res = await connect.mutateAsync({
      connector,
      capabilities: {
        signInWithEthereum: {
          nonce: 'foobarbaz',
        },
      },
      withCapabilities: true,
    })
    expectTypeOf(res.accounts).toEqualTypeOf<
      readonly [
        {
          address: Address
          capabilities:
            | {
                foo: { bar: Hex }
              }
            | {
                signInWithEthereum: {
                  message: string
                  signature: string
                }
              }
        },
        ...{
          address: Address
          capabilities:
            | {
                foo: { bar: Hex }
              }
            | {
                signInWithEthereum: {
                  message: string
                  signature: string
                }
              }
        }[],
      ]
    >()
  })()
})
