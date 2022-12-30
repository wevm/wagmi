import fixtures from 'fixturez'
import { describe, expect, it, vi } from 'vitest'

import { react } from './react'

const f = fixtures(__dirname)

describe('react', () => {
  it('validate', async () => {
    const temp = f.temp()
    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => temp)

    await expect(react().validate()).rejects
      .toThrowErrorMatchingInlineSnapshot(`
      "wagmi must be installed to use React plugin.
      To install, run: pnpm add wagmi"
    `)

    vi.restoreAllMocks()
  })

  describe('run', () => {
    describe('isTypeScript', () => {
      const abi = [
        {
          inputs: [{ name: 'name', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: 'balance', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ] as const

      it('true', async () => {
        await expect(
          react().run({
            contracts: [
              {
                name: 'Wagmi',
                address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
                abi,
                content: '',
                meta: {
                  abiName: 'WagmiAbi',
                  addressName: 'WagmiAddress',
                  configName: 'WagmiConfig',
                },
              },
            ],
            isTypeScript: true,
          }),
        ).resolves.toMatchSnapshot()
      })

      it('false', async () => {
        await expect(
          react().run({
            contracts: [
              {
                name: 'Wagmi',
                address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
                abi,
                content: '',
                meta: {
                  abiName: 'WagmiAbi',
                  addressName: 'WagmiAddress',
                  configName: 'WagmiConfig',
                },
              },
            ],
            isTypeScript: false,
          }),
        ).resolves.toMatchSnapshot()
      })
    })
  })
})
