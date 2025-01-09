import { expectTypeOf, test } from 'vitest'
import { useConnect } from 'wagmi'

test('infers connect parameters', () => {
  const { connect, connectors, variables } = useConnect()
  const connector = connectors[0]!

  expectTypeOf(variables?.foo).toEqualTypeOf<string | undefined>()
  connect({
    connector,
    foo: 'bar',
  })
})
