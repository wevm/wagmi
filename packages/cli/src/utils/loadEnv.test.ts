import { afterEach, expect, test, vi } from 'vitest'

import { createFixture } from '../../test/utils.js'
import { loadEnv } from './loadEnv.js'

afterEach(() => {
  vi.restoreAllMocks()
})

test('loads env', async () => {
  const { dir } = await createFixture({
    files: {
      '.env': `
        FOO=bar
        SOME_ENV_VAR=1
        `,
    },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  expect(loadEnv()).toMatchInlineSnapshot(`
      {
        "FOO": "bar",
        "SOME_ENV_VAR": "1",
      }
    `)
})

test('loads env from envDir', async () => {
  const { dir } = await createFixture({
    files: {
      '.env': `
        FOO=bar
        SOME_ENV_VAR=1
        `,
    },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  expect(loadEnv({ envDir: dir })).toMatchInlineSnapshot(`
      {
        "FOO": "bar",
        "SOME_ENV_VAR": "1",
      }
    `)
})

test('loads env with mode', async () => {
  const mode = 'dev'
  const { dir } = await createFixture({
    files: {
      [`.env.${mode}`]: `
        FOO=bar
        SOME_ENV_VAR=1
        `,
    },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  expect(loadEnv({ mode })).toMatchInlineSnapshot(`
      {
        "FOO": "bar",
        "SOME_ENV_VAR": "1",
      }
    `)
})

test('throws error when mode is "local"', async () => {
  expect(() => {
    loadEnv({ mode: 'local' })
  }).toThrowErrorMatchingInlineSnapshot(
    `[Error: "local" cannot be used as a mode name because it conflicts with the .local postfix for .env files.]`,
  )
})
