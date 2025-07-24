import { expect, test } from 'vitest'

import { format } from './format.js'

test('formats code', async () => {
  await expect(
    format(`const           foo = "bar"`),
  ).resolves.toMatchInlineSnapshot(`
    "const foo = 'bar'
    "
  `)
})
