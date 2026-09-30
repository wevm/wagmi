import { accounts, config } from '@wagmi/test'
import { avalanche } from 'viem/chains'
import { expect, test, vi } from 'vitest'

import { mock } from '../connectors/mock.js'
import { addChain } from './addChain.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  try {
    await expect(
      addChain(config, { chain: avalanche }),
    ).resolves.toBeUndefined()
  } finally {
    await disconnect(config, { connector })
  }
})

test('parameters: connector and chain', async () => {
  const connector_ = config._internal.connectors.setup(mock({ accounts }))
  const provider = await connector_.getProvider()
  const request = vi.spyOn(provider, 'request')
  vi.spyOn(connector_, 'getProvider').mockResolvedValue(provider)
  await connect(config, { connector: connector_ })
  request.mockClear()

  try {
    await addChain(config, {
      chain: { ...avalanche, blockExplorers: undefined },
      connector: connector_,
    })
    expect(request).toHaveBeenCalledWith(
      {
        method: 'wallet_addEthereumChain',
        params: [
          expect.objectContaining({
            blockExplorerUrls: undefined,
            chainId: '0xa86a',
            chainName: 'Avalanche',
          }),
        ],
      },
      undefined,
    )
  } finally {
    await disconnect(config, { connector: connector_ })
  }
})

test('behavior: connector error', async () => {
  const error = new Error('Failed to add chain.')
  const connector_ = config._internal.connectors.setup(
    mock({ accounts, features: { addChainError: error } }),
  )
  await connect(config, { connector: connector_ })
  try {
    await expect(
      addChain(config, { chain: avalanche, connector: connector_ }),
    ).rejects.toMatchObject({
      details: error.message,
      name: 'UnknownRpcError',
    })
  } finally {
    await disconnect(config, { connector: connector_ })
  }
})
