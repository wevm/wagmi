import { afterEach, describe, expect, it, vi } from 'vitest'

import { createFixture, mockCwd } from '../../test'
import { loadEnv } from './loadEnv'

describe('loadEnv', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads env', async () => {
    const dir = mockCwd()
    await createFixture({
      dir,
      files: {
        '.env': `
        FOO=bar
        SOME_ENV_VAR=1
        `,
      },
    })

    expect(loadEnv()).toMatchInlineSnapshot(`
      {
        "FOO": "bar",
        "SOME_ENV_VAR": "1",
      }
    `)
  })

  it('loads env from envDir', async () => {
    const { projectDir } = await createFixture({
      files: {
        '.env': `
        FOO=bar
        SOME_ENV_VAR=1
        `,
      },
    })

    expect(loadEnv({ envDir: projectDir })).toMatchInlineSnapshot(`
      {
        "FOO": "bar",
        "SOME_ENV_VAR": "1",
      }
    `)
  })

  it('loads env with mode', async () => {
    const dir = mockCwd()
    const mode = 'dev'
    await createFixture({
      dir,
      files: {
        [`.env.${mode}`]: `
        FOO=bar
        SOME_ENV_VAR=1
        `,
      },
    })

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
