import type { Address, Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useConnect, useConnectors } from 'wagmi'

test('infers connect parameters', () => {
  const connect = useConnect()
  const connectors = useConnectors()
  const connector = connectors[0]!

  connect.mutate({
    connector,
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

  if (connect.variables && 'foo' in connect.variables)
    expectTypeOf(connect.variables?.foo).toEqualTypeOf<string | undefined>()
  if (connect.variables && 'capabilities' in connect.variables)
    expectTypeOf(
      connect.variables?.capabilities?.signInWithEthereum,
    ).toEqualTypeOf<{ nonce: string } | undefined>()

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
