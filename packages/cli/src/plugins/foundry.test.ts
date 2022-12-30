import { describe, expect, it } from 'vitest'

import { foundry } from './foundry'

describe('foundry', () => {
  it('validate', async () => {
    await expect(
      foundry({
        project: '../hello_foundry',
        forge: {
          path: '/path/to/forge',
        },
      }).validate(),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "forge must be installed to use Foundry plugin.
      To install, follow the instructions at https://book.getfoundry.sh/getting-started/installation"
    `)
  })
})
