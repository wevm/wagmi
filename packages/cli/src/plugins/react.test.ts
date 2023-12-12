import { erc20Abi } from 'viem'
import { test } from 'vitest'

import { react } from './react.js'

test('react', async () => {
  await react().run({
    contracts: [
      {
        name: 'erc20',
        abi: erc20Abi,
        content: '',
        meta: {
          abiName: 'erc20Abi',
        },
      },
    ],
    isTypeScript: true,
    outputs: [],
  })
})
