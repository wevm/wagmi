import { describe, expect, it } from 'vitest'

import { foundry } from './foundry'

describe('foundry', () => {
  it('validate', async () => {
    await expect(
      foundry({
        project: '../hello_foundry',
        forge: {
          path: '/path/does/not/exist/forge',
        },
      }).contracts(),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Forge not installed. Install with Foundry:
      https://book.getfoundry.sh/getting-started/installation"
    `)
  })

  it.todo('Scaffold temp foundry project for testing')
})
