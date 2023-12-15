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
    "import { createWatchContractEvent, createReadContract, createWriteContract, createSimulateContract } from 'wagmi/codegen'
    "
  `)
  expect(result.content).toMatchInlineSnapshot(`
    "/**
     * Wraps __{@link useWatchErc20Event}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWatchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi })

    /**
     * Wraps __{@link useReadErc20}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useReadErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi })

    /**
     * Wraps __{@link useWriteErc20}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWriteErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi })

    /**
     * Wraps __{@link useSimulateErc20}__ with \`abi\` set to __{@link erc20Abi}__
     */
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
    "/**
     * Wraps __{@link useWatchErc20Event}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWatchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useReadErc20}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useReadErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useWriteErc20}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWriteErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useSimulateErc20}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useSimulateErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address })"
  `)
})

test('legacy hook names', async () => {
  const result = await react({ getHookName: 'legacy' }).run({
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
    "/**
     * Wraps __{@link useErc20Event}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useErc20Read}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useErc20Read = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useErc20Write}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useErc20Write = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link usePrepareErc20Write}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const usePrepareErc20Write = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address })"
  `)
})
