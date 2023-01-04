import { describe, expect, it } from 'vitest'

import { format } from './format'

describe('format', () => {
  it('formats code', async () => {
    await expect(format(`const           foo = "bar"`)).resolves
      .toMatchInlineSnapshot(`
      "const foo = 'bar'
      "
    `)
  })
})
