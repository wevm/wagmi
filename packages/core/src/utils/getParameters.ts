import type { CallParameters, SendTransactionParameters } from 'viem'

import type { PartialBy } from '../types/utils'

export function getCallParameters(
  args: Omit<CallParameters, 'chain'>,
): CallParameters {
  return {
    accessList: args.accessList,
    account: args.account,
    blockNumber: args.blockNumber,
    blockTag: args.blockTag,
    data: args.data,
    gas: args.gas,
    gasPrice: args.gasPrice,
    maxFeePerGas: args.maxFeePerGas,
    maxPriorityFeePerGas: args.maxPriorityFeePerGas,
    nonce: args.nonce,
    to: args.to,
    value: args.value,
    gasPerPubdata: args.gasPerPubdata,
    factoryDeps: args.factoryDeps,
    paymaster: args.paymaster,
    paymasterInput: args.paymasterInput,
    customSignature: args.customSignature,
  } as CallParameters
}

export function getSendTransactionParameters(
  args: PartialBy<Omit<SendTransactionParameters, 'chain'>, 'account'>,
): PartialBy<Omit<SendTransactionParameters, 'chain'>, 'account'> {
  return {
    accessList: args.accessList,
    account: args.account,
    data: args.data,
    gas: args.gas,
    gasPrice: args.gasPrice,
    maxFeePerGas: args.maxFeePerGas,
    maxPriorityFeePerGas: args.maxPriorityFeePerGas,
    nonce: args.nonce,
    to: args.to,
    value: args.value,
    gasPerPubdata: args.gasPerPubdata,
    factoryDeps: args.factoryDeps,
    paymaster: args.paymaster,
    paymasterInput: args.paymasterInput,
    customSignature: args.customSignature,
  }
}
