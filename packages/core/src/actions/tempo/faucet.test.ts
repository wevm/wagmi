import { config } from '@wagmi/test'
import { expect, test } from 'vitest'
import { fundSync } from './faucet.js'

test.skip('default', async () => {
  const result = await fundSync(config, { account: '0x' })
  console.log(result)
  expect(result).toBeDefined()
})
