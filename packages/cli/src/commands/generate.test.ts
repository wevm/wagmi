import dedent from 'dedent'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createFixture, mockConsole, mockCwd } from '../../test'

import { generate } from './generate'

describe('generate', () => {
  let mockedConsole: ReturnType<typeof mockConsole>
  let temp: string
  beforeEach(() => {
    mockedConsole = mockConsole()
    temp = mockCwd()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.todo('generates output')
  it.todo('generates typescript')
  it.todo('generates output with plugins')

  describe('behavior', () => {
    it('invalid cli options', async () => {
      await expect(
        generate({
          // @ts-expect-error possible to pass untyped options through from cli
          config: 1,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Invalid option
        - Expected string, received number at \`config\`"
      `)
    })

    describe('config', () => {
      it('not found', async () => {
        await expect(generate()).rejects.toThrowErrorMatchingInlineSnapshot(
          '"Config not found"',
        )
      })

      it('not found for path', async () => {
        try {
          await generate({ config: 'wagmi.config.js' })
        } catch (error) {
          expect(
            (error as Error).message.replace(temp, 'path/to/project'),
          ).toMatchInlineSnapshot('"Config not found at wagmi.config.js"')
        }
      })
    })

    it('config out not unique', async () => {
      await createFixture({
        dir: temp,
        files: {
          'wagmi.config.js': dedent`
            export default [
              {
                out: 'generated.ts',
                contracts: [
                  {
                    abi: [],
                    name: 'Foo',
                  },
                ]
              },
              {
                out: 'generated.ts',
                contracts: [
                  {
                    abi: [],
                    name: 'Foo',
                  },
                ],
              },
            ]
          `,
        },
      })
      await expect(generate()).rejects.toThrowErrorMatchingInlineSnapshot(
        '"out \\"generated.ts\\" must be unique."',
      )
    })

    describe('contracts', () => {
      it('config contract names not unique', async () => {
        await createFixture({
          dir: temp,
          files: {
            'wagmi.config.js': dedent`
            export default {
              out: 'generated.ts',
              contracts: [
                {
                  abi: [],
                  name: 'Foo',
                },
                {
                  abi: [],
                  name: 'Foo',
                },
              ],
            }
          `,
          },
        })
        await expect(generate()).rejects.toThrowErrorMatchingInlineSnapshot(
          '"Contract name \\"Foo\\" must be unique."',
        )
      })

      it('displays message if no contracts found', async () => {
        await createFixture({
          dir: temp,
          files: {
            'wagmi.config.js': 'export default {}',
          },
        })
        await generate()
        expect(mockedConsole.formatted).toMatchInlineSnapshot(
          `
          "Using config wagmi.config.js
          ⠏ Validating plugins
          ✔ Validating plugins
          ⠏ Resolving contracts
          ✖ Resolving contracts
          No contracts found."
        `,
        )
      })

      it.todo('throws when abi is invalid')
      it.todo('throws when address is invalid')
    })

    describe.todo('watch', () => {
      it.todo('save config file logs change')
      it.todo('updates on add file')
      it.todo('updates on change file')
      it.todo('updates on unlink file')
      it.todo('runs watch command')
      it.todo('shuts down watch on SIGINT/SIGTERM')

      it('displays message if using --watch flag without watchers configured', async () => {
        await createFixture({
          dir: temp,
          files: {
            'wagmi.config.js': dedent`
            export default {
              contracts: [
                {
                  abi: [],
                  name: 'Foo',
                },
              ],
            }
          `,
          },
        })
        await generate({ watch: true })
        expect(mockedConsole.formatted).toMatchInlineSnapshot(
          '"[37m[90mUsed --watch flag, but no plugins are watching.[37m[39m"',
        )
      })
    })
  })
})
