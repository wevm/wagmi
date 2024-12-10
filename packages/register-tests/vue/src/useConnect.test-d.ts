import { useConnect } from '@wagmi/vue'
import { expectTypeOf, test } from 'vitest'

test('infers connect parameters', () => {
  const { connect, connectors, variables } = useConnect()
  const connector = connectors[0]!

  expectTypeOf(variables.value?.foo).toEqualTypeOf<string | undefined>()
  connect({
    connector,
    foo: 'bar',
  })
})
