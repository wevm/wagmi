import { describe, expect, it } from 'vitest'

import { hardhat } from './hardhat'

describe('hardhat', () => {
  it('validate', async () => {
    await expect(
      hardhat({
        project: '../hello_foundry',
      }).contracts(),
    ).rejects.toThrowErrorMatchingInlineSnapshot()
  })

  it.todo('Scaffold temp hardhat project for testing')
})
