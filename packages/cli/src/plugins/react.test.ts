import { erc20Abi } from 'viem'
import { expect, test } from 'vitest'

import { react } from './react.js'

test('default', async () => {
  const result = await react().run({
    contracts: [
      {
        name: 'erc20',
        abi: erc20Abi,
        content: '',
        meta: {
          abiName: 'erc20Abi',
        },
      },
    ],
    isTypeScript: true,
    outputs: [],
  })

  expect(result.imports).toMatchInlineSnapshot(`
    "import { createReadContract, createWriteContract, createSimulateContract } from 'wagmi/codegen'
    "
  `)
  expect(result.content).toMatchInlineSnapshot(`
    "export const useReadErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi })

    export const useWriteErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi })

    export const useSimulateErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi })"
  `)
})

test('address', async () => {
  const result = await react().run({
    contracts: [
      {
        name: 'erc20',
        abi: erc20Abi,
        content: '',
        meta: {
          abiName: 'erc20Abi',
          addressName: 'erc20Address',
        },
      },
    ],
    isTypeScript: true,
    outputs: [],
  })

  expect(result.content).toMatchInlineSnapshot(`
    "export const useReadErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address })

    export const useWriteErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address })

    export const useSimulateErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address })"
  `)
})
