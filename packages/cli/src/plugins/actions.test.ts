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
    "import { createReadContract, createWriteContract, createSimulateContract, createWatchContractEvent } from '@wagmi/core/codegen'
    "
  `)
  expect(result.content).toMatchInlineSnapshot(`
    "/**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"allowance\\"\`
     */
    export const readErc20Allowance = /*#__PURE__*/ createReadContract({ abi: erc20Abi, functionName: 'allowance' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"balanceOf\\"\`
     */
    export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({ abi: erc20Abi, functionName: 'balanceOf' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"decimals\\"\`
     */
    export const readErc20Decimals = /*#__PURE__*/ createReadContract({ abi: erc20Abi, functionName: 'decimals' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"name\\"\`
     */
    export const readErc20Name = /*#__PURE__*/ createReadContract({ abi: erc20Abi, functionName: 'name' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"symbol\\"\`
     */
    export const readErc20Symbol = /*#__PURE__*/ createReadContract({ abi: erc20Abi, functionName: 'symbol' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"totalSupply\\"\`
     */
    export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({ abi: erc20Abi, functionName: 'totalSupply' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const writeErc20Approve = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, functionName: 'approve' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, functionName: 'transfer' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, functionName: 'transferFrom' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const simulateErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, functionName: 'approve' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, functionName: 'transfer' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, functionName: 'transferFrom' })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Approval\\"\`
     */
    export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, eventName: 'Approval' })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Transfer\\"\`
     */
    export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, eventName: 'Transfer' })"
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
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"allowance\\"\`
     */
    export const readErc20Allowance = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'allowance' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"balanceOf\\"\`
     */
    export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'balanceOf' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"decimals\\"\`
     */
    export const readErc20Decimals = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'decimals' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"name\\"\`
     */
    export const readErc20Name = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'name' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"symbol\\"\`
     */
    export const readErc20Symbol = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'symbol' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"totalSupply\\"\`
     */
    export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'totalSupply' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const writeErc20Approve = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const simulateErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Approval\\"\`
     */
    export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Approval' })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Transfer\\"\`
     */
    export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Transfer' })"
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
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"allowance\\"\`
     */
    export const readErc20Allowance = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'allowance' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"balanceOf\\"\`
     */
    export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'balanceOf' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"decimals\\"\`
     */
    export const readErc20Decimals = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'decimals' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"name\\"\`
     */
    export const readErc20Name = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'name' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"symbol\\"\`
     */
    export const readErc20Symbol = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'symbol' })

    /**
     * Wraps __{@link readContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"totalSupply\\"\`
     */
    export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'totalSupply' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const writeErc20Approve = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link writeContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const prepareWriteErc20 = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const prepareWriteErc20Approve = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const prepareWriteErc20Transfer = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link simulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const prepareWriteErc20TransferFrom = /*#__PURE__*/ createSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Approval\\"\`
     */
    export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Approval' })

    /**
     * Wraps __{@link watchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Transfer\\"\`
     */
    export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Transfer' })"
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
    "import { createReadContract, createWriteContract, createSimulateContract, createWatchContractEvent } from 'wagmi/codegen'
    "
  `)
})
