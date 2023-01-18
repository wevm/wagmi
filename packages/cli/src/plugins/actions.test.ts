import { describe, expect, it } from 'vitest'

import { wagmiAbi } from '../../test'
import { format } from '../utils'
import { actions } from './actions'

describe('actions', () => {
  describe('run', () => {
    describe('isTypeScript', () => {
      it('true', async () => {
        const { imports, content } = await actions().run({
          contracts: [
            {
              name: 'Wagmi',
              address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
              abi: wagmiAbi,
              content: '',
              meta: {
                abiName: 'WagmiAbi',
                addressName: 'WagmiAddress',
                configName: 'WagmiConfig',
              },
            },
          ],
          isTypeScript: true,
          outputs: [],
        })
        await expect(
          format(`${imports}\n\n${content}`),
        ).resolves.toMatchSnapshot()
      })

      it('false', async () => {
        const { imports, content } = await actions().run({
          contracts: [
            {
              name: 'Wagmi',
              address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
              abi: wagmiAbi,
              content: '',
              meta: {
                abiName: 'WagmiAbi',
                addressName: 'WagmiAddress',
                configName: 'WagmiConfig',
              },
            },
          ],
          isTypeScript: false,
          outputs: [],
        })
        await expect(
          format(`${imports}\n\n${content}`),
        ).resolves.toMatchSnapshot()
      })
    })
  })
})
