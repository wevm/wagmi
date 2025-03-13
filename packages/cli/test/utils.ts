import { spawnSync } from 'node:child_process'
import { cp, mkdir, symlink, writeFile } from 'node:fs/promises'
import fixtures from 'fixturez'
import { http, HttpResponse } from 'msw'
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
  await mkdir(dir, { recursive: true })

  // Create test files
  const paths: { [_ in keyof TFiles]: string } = {} as any
  await Promise.all(
    (Object.keys(config.files ?? {}) as (keyof TFiles)[]).map(
      async (filename_) => {
        let file: Json | true | undefined
        let filename = filename_
        if (filename === 'tsconfig') {
          filename = 'tsconfig.json'
          file = getTsConfig(dir)
        } else file = config.files![filename]

        const filePath = path.join(dir, filename.toString())
        await mkdir(path.dirname(filePath), { recursive: true })

        await writeFile(
          filePath,
          typeof file === 'string' ? file : JSON.stringify(file, null, 2),
        )
        paths[filename === 'tsconfig.json' ? 'tsconfig' : filename] = filePath
      },
    ),
  )

  if (config.copyNodeModules) {
    await symlink(
      path.join(__dirname, '../node_modules'),
      path.join(dir, 'node_modules'),
      'dir',
    )
    await cp(
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
        '@wagmi/cli': [path.relative(baseUrl, 'packages/cli/src')],
        '@wagmi/cli/*': [path.relative(baseUrl, 'packages/cli/src/*')],
        '@wagmi/connectors': [
          path.relative(baseUrl, 'packages/connectors/src'),
        ],
        '@wagmi/connectors/*': [
          path.relative(baseUrl, 'packages/connectors/src/*'),
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
    const result = spawnSync(
      'tsc',
      ['--noEmit', '--target', 'es2021', '--pretty', 'false', '-p', project],
      {
        encoding: 'utf-8',
        stdio: 'pipe',
      },
    )
    if (result.error) throw result.error
    if (result.status !== 0)
      throw new Error(`Failed with code ${result.status}`)
    if (result.signal) throw new Error('Process terminated by signal')
    return result.stdout
  } catch (error) {
    throw new Error(
      (error as Error).message.replaceAll(
        path.dirname(project),
        '/path/to/project',
      ),
    )
  }
}

export const baseUrl = 'https://api.etherscan.io/v2/api'
export const apiKey = 'abc'
export const invalidApiKey = 'xyz'
export const address = '0xaf0326d92b97df1221759476b072abfd8084f9be'
export const proxyAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
export const implementationAddress =
  '0x43506849d7c04f9138d1a2050bbf3a0c054402dd'
export const unverifiedContractAddress =
  '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
export const timeoutAddress = '0xecb504d39723b0be0e3a9aa33d646642d1051ee1'

export const handlers = [
  http.get(baseUrl, async ({ request }) => {
    const url = new URL(request.url)
    const search = url.search.replace(/^\?chainId=\d&/, '?')

    if (
      search ===
      `?module=contract&action=getabi&address=${unverifiedContractAddress}&apikey=${apiKey}`
    )
      return HttpResponse.json({
        status: '0',
        message: 'NOTOK',
        result: 'Contract source code not verified',
      })

    if (
      search ===
      `?module=contract&action=getabi&address=${timeoutAddress}&apikey=${invalidApiKey}`
    )
      return HttpResponse.json({
        status: '0',
        message: 'NOTOK',
        result: 'Invalid API Key',
      })

    if (
      search ===
      `?module=contract&action=getabi&address=${address}&apikey=${apiKey}`
    )
      return HttpResponse.json({
        status: '1',
        message: 'OK',
        result:
          '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
      })

    if (
      search ===
      `?module=contract&action=getabi&address=${timeoutAddress}&apikey=${apiKey}`
    ) {
      await new Promise((resolve) => setTimeout(resolve, 10_000))
      return HttpResponse.json({})
    }

    if (
      search ===
      `?module=contract&action=getabi&address=${implementationAddress}&apikey=${apiKey}`
    )
      return HttpResponse.json({
        status: '1',
        message: 'OK',
        result:
          '[{"constant":false,"inputs":[{"name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newImplementation","type":"address"},{"name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"implementation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_implementation","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"previousAdmin","type":"address"},{"indexed":false,"name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"implementation","type":"address"}],"name":"Upgraded","type":"event"}]',
      })

    if (
      search ===
      `?module=contract&action=getsourcecode&address=${proxyAddress}&apikey=${apiKey}`
    )
      return HttpResponse.json({
        status: '1',
        message: 'OK',
        result: [
          {
            SourceCode: '...',
            ABI: '[{"constant":false,"inputs":[{"name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newImplementation","type":"address"},{"name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"implementation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_implementation","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"previousAdmin","type":"address"},{"indexed":false,"name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"implementation","type":"address"}],"name":"Upgraded","type":"event"}]',
            ContractName: 'FiatTokenProxy',
            CompilerVersion: 'v0.4.24+commit.e67f0147',
            OptimizationUsed: '0',
            Runs: '200',
            ConstructorArguments:
              '0000000000000000000000000882477e7895bdc5cea7cb1552ed914ab157fe56',
            EVMVersion: 'Default',
            Library: '',
            LicenseType: '',
            Proxy: '1',
            Implementation: '0x43506849d7c04f9138d1a2050bbf3a0c054402dd',
            SwarmSource:
              'bzzr://a4a547cfc7202c5acaaae74d428e988bc62ad5024eb0165532d3a8f91db4ed24',
          },
        ],
      })

    if (
      search ===
      `?module=contract&action=getsourcecode&address=${address}&apikey=${apiKey}`
    )
      return HttpResponse.json({
        status: '1',
        message: 'OK',
        result: [
          {
            SourceCode: '...',
            ABI: '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
            ContractName: 'WagmiMintExample',
            CompilerVersion: 'v0.8.11+commit.d7f03943',
            OptimizationUsed: '1',
            Runs: '10000',
            ConstructorArguments: '',
            EVMVersion: 'Default',
            Library: '',
            LicenseType: '',
            Proxy: '0',
            Implementation: '',
            SwarmSource: '',
          },
        ],
      })

    throw new Error(`Unhandled request: ${search}`)
  }),
]
