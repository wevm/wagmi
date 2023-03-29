import { describe, expect, it } from 'vitest'

import { wagmiAbi } from '../../test'
import { format } from '../utils'
import { actions } from './actions'

describe('actions', () => {
  describe('run', () => {
    it('with TypeScript', async () => {
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

    it('without TypeScript', async () => {
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

    it('without TypeScript', async () => {
      const { imports, content } = await actions({
        overridePackageName: '@wagmi/core',
      }).run({
        contracts: [
          {
            name: 'Wagmi',
            address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
            abi: [],
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
      await expect(format(`${imports}\n\n${content}`)).resolves
        .toMatchInlineSnapshot(`
        "import { getContract } from '@wagmi/core'

        /**
         * Wraps __{@link getContract}__ with \`abi\` set to __{@link WagmiAbi}__.
         */
        export function getWagmi(config) {
          return getContract({ abi: WagmiAbi, address: WagmiAddress, ...config })
        }
        "
      `)
    })

    it('throws for duplicate action names', async () => {
      await expect(
        actions().run({
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
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Action name \\"getWagmi\\" must be unique for contract \\"Wagmi\\"."',
      )
    })
  })
})
