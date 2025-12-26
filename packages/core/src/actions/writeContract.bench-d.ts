import { attest } from '@ark/attest'
import type { abi } from '@wagmi/test'
import { parseAbi } from 'viem'
import viemPackageJson from 'viem/package.json' with { type: 'json' }
import { test } from 'vitest'
import type { WriteContractParameters } from './writeContract.js'

test('default', () => {
  type Result = WriteContractParameters<(typeof abi)['erc20'], 'approve'>
  const res = {} as Result
  attest.instantiations([143162, 'instantiations'])
  attest<readonly [spender: `0x${string}`, amount: bigint]>(res.args)
  if (viemPackageJson.version.startsWith('2.43'))
    attest(res.args).type.toString.snap(
      // biome-ignore lint/style/noUnusedTemplateLiteral: stable
      `readonly [spender: \`0x\${string}\`, amount: bigint]`,
    )
})

const abiOverload = parseAbi([
  'function foo() returns (int8)',
  'function foo(address account) returns (string)',
  'function foo(address sender, address account) returns ((address foo, address bar))',
  'function bar() returns (int8)',
])
test('overloads', () => {
  type Result = WriteContractParameters<typeof abiOverload, 'foo'>
  const res = {} as Result
  attest.instantiations([21691, 'instantiations'])
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
