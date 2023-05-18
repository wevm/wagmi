import { execa } from 'execa'
import fixtures from 'fixturez'
import { default as fse } from 'fs-extra'
import * as path from 'pathe'
import { vi } from 'vitest'

const f = fixtures(__dirname)

type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

export async function createFixture<
  TFiles extends { [filename: string]: string | Json } & {
    tsconfig?: true
  },
>(
  config: {
    copyNodeModules?: boolean
    dir?: string
    files?: TFiles
  } = {},
) {
  const dir = config.dir ?? f.temp()
  await fse.ensureDir(dir)

  // Create test files
  const paths: { [_ in keyof TFiles]: string } = {} as any
  await Promise.all(
    (Object.keys(config.files ?? {}) as (keyof TFiles)[]).map(
      async (filename) => {
        let file: Json | true | undefined
        if (filename === 'tsconfig') {
          filename = 'tsconfig.json'
          file = getTsConfig(dir)
        } else file = config.files![filename]

        const filePath = path.join(dir, filename.toString())
        await fse.ensureDir(path.dirname(filePath))

        await fse.writeFile(
          filePath,
          typeof file === 'string' ? file : JSON.stringify(file, null, 2),
        )
        paths[filename === 'tsconfig.json' ? 'tsconfig' : filename] = filePath
      },
    ),
  )

  if (config.copyNodeModules) {
    await fse.symlink(
      path.join(__dirname, '../node_modules'),
      path.join(dir, 'node_modules'),
      'dir',
    )
    await fse.copy(
      path.join(__dirname, '../package.json'),
      path.join(dir, 'package.json'),
    )
  }

  return {
    dir,
    paths: paths,
  }
}

type TsConfig = {
  compilerOptions: { [property: string]: any }
  exclude: string[]
  include: string[]
}
function getTsConfig(baseUrl: string) {
  return {
    compilerOptions: {
      allowJs: true,
      baseUrl: '.',
      esModuleInterop: true,
      forceConsistentCasingInFileNames: true,
      incremental: true,
      isolatedModules: true,
      jsx: 'preserve',
      lib: ['dom', 'dom.iterable', 'esnext'],
      module: 'esnext',
      moduleResolution: 'node',
      noEmit: true,
      paths: {
        '@wagmi/chains': [
          path.relative(baseUrl, 'references/packages/chains/src'),
        ],
        '@wagmi/cli': [path.relative(baseUrl, 'packages/cli/src')],
        '@wagmi/cli/*': [path.relative(baseUrl, 'packages/cli/src/*')],
        '@wagmi/connectors': [
          path.relative(baseUrl, 'references/packages/connectors/src'),
        ],
        '@wagmi/connectors/*': [
          path.relative(baseUrl, 'references/packages/connectors/src/*'),
        ],
        '@wagmi/core': [path.relative(baseUrl, 'packages/core/src')],
        '@wagmi/core/*': [path.relative(baseUrl, 'packages/core/src/*')],
        wagmi: [path.relative(baseUrl, 'packages/react/src')],
        'wagmi/*': [path.relative(baseUrl, 'packages/react/src/*')],
      },
      resolveJsonModule: true,
      skipLibCheck: true,
      strict: true,
      target: 'es6',
    },
    include: [`${baseUrl}/**/*.ts`, `${baseUrl}/**/*.tsx`],
    exclude: ['node_modules'],
  } as TsConfig
}

export function watchConsole() {
  type Console = 'info' | 'log' | 'warn' | 'error'
  const output: { [_ in Console | 'all']: string[] } = {
    info: [],
    log: [],
    warn: [],
    error: [],
    all: [],
  }
  function handleOutput(method: Console) {
    return (message: string) => {
      output[method].push(message)
      output.all.push(message)
    }
  }
  return {
    debug: console.debug,
    info: vi.spyOn(console, 'info').mockImplementation(handleOutput('info')),
    log: vi.spyOn(console, 'log').mockImplementation(handleOutput('log')),
    warn: vi.spyOn(console, 'warn').mockImplementation(handleOutput('warn')),
    error: vi.spyOn(console, 'error').mockImplementation(handleOutput('error')),
    output,
    get formatted() {
      return output.all.join('\n')
    },
  }
}

export async function typecheck(project: string) {
  try {
    const res = await execa('tsc', [
      '--noEmit',
      '--target',
      'es2021',
      '--pretty',
      'false',
      '-p',
      project,
    ])
    return res.stdout
  } catch (error) {
    throw new Error(
      (error as Error).message.replaceAll(
        path.dirname(project),
        '/path/to/project',
      ),
    )
  }
}
