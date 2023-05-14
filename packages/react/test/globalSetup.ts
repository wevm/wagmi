import { startProxy } from '@viem/anvil'

import { chainId, forkBlockNumber, forkUrl, port } from './constants.js'

export default async function () {
  return await startProxy({
    port,
    host: '::',
    options: {
      chainId,
      forkUrl,
      forkBlockNumber,
    },
  })
}
