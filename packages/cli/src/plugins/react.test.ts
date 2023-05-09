import dedent from 'dedent'
import { default as fse } from 'fs-extra'
import { describe, expect, it } from 'vitest'

import { createFixture, typecheck, wagmiAbi } from '../../test'
import { format } from '../utils'
import { react } from './react'

describe('react', () => {
  describe('run', () => {
    it(
      'with TypeScript',
      async () => {
        const { imports, content } = await react().run({
          contracts: [
            {
              name: 'Wagmi',
              abi: wagmiAbi,
              content: '',
              meta: {
                abiName: 'wagmiAbi',
                configName: 'wagmiConfig',
              },
            },
          ],
          isTypeScript: true,
          outputs: [],
        })
        await expect(
          format(`${imports}\n\n${content}`),
        ).resolves.toMatchSnapshot()

        const { paths } = await createFixture({
          copyNodeModules: true,
          files: {
            tsconfig: true,
            'generated.ts': dedent`
              ${imports}

              export const wagmiAbi = ${JSON.stringify(wagmiAbi)} as const

              ${content}
            `,
            'index.ts': dedent`
              import { usePrepareWagmiWrite, useWagmiWrite } from './generated'
    
              const { config } = usePrepareWagmiWrite({
                functionName: 'approve',
                args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 123n],
              })
              const { write: preparedWrite } = useWagmiWrite(config)
              preparedWrite?.()
              
              const { write: unpreparedWrite } = useWagmiWrite({
                functionName: 'approve',
              })
              unpreparedWrite({
                args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 123n],
              })
            `,
          },
        })

        const tsconfig = await fse.readJSON(paths.tsconfig)
        await fse.writeJSON(paths.tsconfig, {
          ...tsconfig,
          include: [paths['generated.ts'], paths['index.ts']],
        })

        await expect(typecheck(paths.tsconfig)).resolves.toMatchInlineSnapshot(
          '""',
        )
      },
      {
        timeout: 20_000,
      },
    )

    it('without TypeScript', async () => {
      const { imports, content } = await react().run({
        contracts: [
          {
            name: 'Wagmi',
            address: '0xaf0326d92b97df1221759476b072abfd8084f9be',
            abi: wagmiAbi,
            content: '',
            meta: {
              abiName: 'wagmiAbi',
              addressName: 'wagmiAddress',
              configName: 'wagmiConfig',
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
