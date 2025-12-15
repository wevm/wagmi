import { attest } from '@ark/attest'
import type { abi } from '@wagmi/test'
import { parseAbi } from 'viem'
import viemPackageJson from 'viem/package.json' with { type: 'json' }
import { test } from 'vitest'
import type { ReadContractParameters } from './readContract.js'

test('default', () => {
  type Result = ReadContractParameters<(typeof abi)['erc20'], 'balanceOf'>
  const res = {} as Result
  attest.instantiations([132033, 'instantiations'])
  attest<readonly [account: `0x${string}`]>(res.args)
  if (viemPackageJson.version.startsWith('2.43'))
    attest(res.args).type.toString.snap(
      // biome-ignore lint/style/noUnusedTemplateLiteral: stable
      `readonly [account: \`0x\${string}\`]`,
    )
})

const abiOverload = parseAbi([
  'function foo() view returns (int8)',
  'function foo(address account) view returns (string)',
  'function foo(address sender, address account) view returns ((address foo, address bar))',
  'function bar() view returns (int8)',
])
test('overloads', () => {
  type Result = ReadContractParameters<typeof abiOverload, 'foo'>
  const res = {} as Result
  attest.instantiations([12984, 'instantiations'])
  attest<
    | readonly []
    | readonly [account: `0x${string}`]
    | readonly [sender: `0x${string}`, account: `0x${string}`]
    | undefined
  >(res.args)
  if (viemPackageJson.version.startsWith('2.43'))
    attest(res.args).type.toString.snap(`  | readonly []
  | readonly [account: \`0x\${string}\`]
  | readonly [sender: \`0x\${string}\`, account: \`0x\${string}\`]
  | undefined`)
})
