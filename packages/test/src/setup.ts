import { afterAll } from 'vitest'

import { testClient } from './clients.js'

afterAll(async () => {
  // If you are using a fork, you can reset your anvil instance to the initial fork block.
  await Promise.all(Object.values(testClient).map((client) => client.restart()))
})
