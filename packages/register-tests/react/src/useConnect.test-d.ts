import type { Address, Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useConnect, useConnectors } from 'wagmi'

test('infers connect parameters', () => {
  const { connect, connectAsync, variables } = useConnect()
  const connectors = useConnectors()
  const connector = connectors[0]!

  connect({
    connector,
    foo: 'bar',
  })
  connect({
    connector,
    capabilities: {
      signInWithEthereum: {
        nonce: 'foobarbaz',
      },
    },
  })

  if (variables && 'foo' in variables)
    expectTypeOf(variables?.foo).toEqualTypeOf<string | undefined>()
  if (variables && 'capabilities' in variables)
    expectTypeOf(variables?.capabilities?.signInWithEthereum).toEqualTypeOf<
      { nonce: string } | undefined
    >()

  connect(
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
    await connectAsync({
      connector,
      foo: 'bar',
      withCapabilities: true,
    })
    const res = await connectAsync({
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
