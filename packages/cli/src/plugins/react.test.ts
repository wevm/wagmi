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
    "import { createUseReadContract, createUseWriteContract, createUseSimulateContract, createUseWatchContractEvent } from 'wagmi/codegen'
    "
  `)
  expect(result.content).toMatchInlineSnapshot(`
    "/**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useReadErc20 = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"allowance\\"\`
     */
    export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, functionName: 'allowance' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"balanceOf\\"\`
     */
    export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, functionName: 'balanceOf' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"decimals\\"\`
     */
    export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, functionName: 'decimals' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"name\\"\`
     */
    export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, functionName: 'name' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"symbol\\"\`
     */
    export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, functionName: 'symbol' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"totalSupply\\"\`
     */
    export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, functionName: 'totalSupply' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, functionName: 'approve' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, functionName: 'transfer' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, functionName: 'transferFrom' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, functionName: 'approve' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, functionName: 'transfer' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const useSimulateErc20TransferFrom = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, functionName: 'transferFrom' })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Approval\\"\`
     */
    export const useWatchErc20ApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, eventName: 'Approval' })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Transfer\\"\`
     */
    export const useWatchErc20TransferEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, eventName: 'Transfer' })"
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
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useReadErc20 = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"allowance\\"\`
     */
    export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'allowance' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"balanceOf\\"\`
     */
    export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'balanceOf' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"decimals\\"\`
     */
    export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'decimals' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"name\\"\`
     */
    export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'name' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"symbol\\"\`
     */
    export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'symbol' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"totalSupply\\"\`
     */
    export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'totalSupply' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const useSimulateErc20TransferFrom = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Approval\\"\`
     */
    export const useWatchErc20ApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Approval' })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Transfer\\"\`
     */
    export const useWatchErc20TransferEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Transfer' })"
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
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useErc20Read = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"allowance\\"\`
     */
    export const useErc20Allowance = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'allowance' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"balanceOf\\"\`
     */
    export const useErc20BalanceOf = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'balanceOf' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"decimals\\"\`
     */
    export const useErc20Decimals = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'decimals' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"name\\"\`
     */
    export const useErc20Name = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'name' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"symbol\\"\`
     */
    export const useErc20Symbol = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'symbol' })

    /**
     * Wraps __{@link useReadContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"totalSupply\\"\`
     */
    export const useErc20TotalSupply = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi, address: erc20Address, functionName: 'totalSupply' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useErc20Write = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const useErc20Approve = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const useErc20Transfer = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link useWriteContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const useErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const usePrepareErc20Write = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"approve\\"\`
     */
    export const usePrepareErc20Approve = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'approve' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transfer\\"\`
     */
    export const usePrepareErc20Transfer = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transfer' })

    /**
     * Wraps __{@link useSimulateContract}__ with \`abi\` set to __{@link erc20Abi}__ and \`functionName\` set to \`\\"transferFrom\\"\`
     */
    export const usePrepareErc20TransferFrom = /*#__PURE__*/ createUseSimulateContract({ abi: erc20Abi, address: erc20Address, functionName: 'transferFrom' })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__
     */
    export const useErc20Event = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, address: erc20Address })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Approval\\"\`
     */
    export const useErc20ApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Approval' })

    /**
     * Wraps __{@link useWatchContractEvent}__ with \`abi\` set to __{@link erc20Abi}__ and \`eventName\` set to \`\\"Transfer\\"\`
     */
    export const useErc20TransferEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: erc20Abi, address: erc20Address, eventName: 'Transfer' })"
  `)
})
