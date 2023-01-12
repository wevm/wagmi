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

  describe('behavior', () => {
    it('invalid cli options', async () => {
      await expect(
        generate({
          // @ts-expect-error possible to pass untyped options through from cli
          config: 1,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Invalid option
        - Expected string, received number at \\"config\\""
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
          ).toMatchInlineSnapshot(
            '"Config not found at \\"path/to/project/wagmi.config.js\\""',
          )
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
        '"out \\"generated.ts\\" is not unique."',
      )
    })

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
        '"Contract name \\"Foo\\" is not unique."',
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
        '"[37mNo contracts found.[39m"',
      )
    })

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
