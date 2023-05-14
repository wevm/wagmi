import { startProxy } from '@viem/anvil'

import { forkBlockNumber, forkUrl } from './constants.js'

export default async function () {
  return await startProxy({
    port: 8545,
    host: '::',
    options: {
      chainId: 123,
      forkUrl,
      forkBlockNumber,
    },
  })
}
