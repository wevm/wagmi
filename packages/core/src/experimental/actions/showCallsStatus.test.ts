import { accounts, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'
import { test } from 'vitest'

import { connect } from '../../actions/connect.js'
import { disconnect } from '../../actions/disconnect.js'
import { sendCalls } from './sendCalls.js'
import { showCallsStatus } from './showCallsStatus.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const id = await sendCalls(config, {
    calls: [
      {
        data: '0xdeadbeef',
        to: accounts[1],
        value: parseEther('1'),
      },
      {
        to: accounts[2],
        value: parseEther('2'),
      },
      {
        to: accounts[3],
        value: parseEther('3'),
      },
    ],
  })
  await testClient.mainnet.mine({ blocks: 1 })
  await showCallsStatus(config, {
    id,
  })
  await disconnect(config, { connector })
})
