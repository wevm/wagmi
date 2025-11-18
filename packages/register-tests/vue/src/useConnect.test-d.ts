import { useConnect, useConnectors } from '@wagmi/vue'
import type { Address, Hex } from 'viem'
import { expectTypeOf, test } from 'vitest'

test('infers connect parameters', () => {
  const connect = useConnect()
  const connectors = useConnectors()
  const connector = connectors.value[0]!

  expectTypeOf(connect.variables.value?.foo).toEqualTypeOf<string | undefined>()
  connect.mutate({
    connector,
    foo: 'bar',
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
              capabilities: {
                foo: { bar: Hex }
              }
            },
            ...{
              address: Address
              capabilities: {
                foo: { bar: Hex }
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
                capabilities: {
                  foo: { bar: Hex }
                }
              },
              ...{
                address: Address
                capabilities: {
                  foo: { bar: Hex }
                }
              }[],
            ]
          | undefined
        >()
      },
    },
  )

  ;(async () => {
    const res = await connect.mutateAsync({
      connector,
      foo: 'bar',
      withCapabilities: true,
    })
    expectTypeOf(res.accounts).toEqualTypeOf<
      readonly [
        {
          address: Address
          capabilities: {
            foo: { bar: Hex }
          }
        },
        ...{
          address: Address
          capabilities: {
            foo: { bar: Hex }
          }
        }[],
      ]
    >()
  })()
})
