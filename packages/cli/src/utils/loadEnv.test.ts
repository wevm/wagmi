import { afterEach, describe, expect, it, vi } from 'vitest'

import { createFixture } from '../../test'
import { loadEnv } from './loadEnv'

describe('loadEnv', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads env', async () => {
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

  it('loads env from envDir', async () => {
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

  it('loads env with mode', async () => {
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

  it('throws error when mode is "local"', async () => {
    expect(() => {
      loadEnv({ mode: 'local' })
    }).toThrowErrorMatchingInlineSnapshot(
      '"\\"local\\" cannot be used as a mode name because it conflicts with the .local postfix for .env files."',
    )
  })
})
