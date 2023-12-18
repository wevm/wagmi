import { erc20Abi } from 'viem'
import { expect, test } from 'vitest'

import { actions } from './actions.js'

test('default', async () => {
  const result = await actions().run({
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
    "import { createWatchContractEvent, createReadContract, createWriteContract, createSimulateContract } from '@wagmi/core/codegen'
    "
  `)
  expect(result.content).toMatchInlineSnapshot(`
    "/**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const simulateErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi })"
  `)
})

test('address', async () => {
  const result = await actions().run({
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
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const simulateErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address })"
  `)
})

test('legacy hook names', async () => {
  const result = await actions({ getActionName: 'legacy' }).run({
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
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const prepareWriteErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address })"
  `)
})

test('override package name', async () => {
  const result = await actions({ overridePackageName: 'wagmi' }).run({
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
})
