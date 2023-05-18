import type { CallParameters, SendTransactionParameters } from 'viem'

export function getCallParameters(
  args: Omit<CallParameters, 'account'>,
): Omit<CallParameters, 'account'> {
  return {
    accessList: args.accessList,
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
  }
}

export function getSendTransactionParameters(
  args: Omit<SendTransactionParameters, 'account' | 'chain'>,
): Omit<SendTransactionParameters, 'account' | 'chain'> {
  return {
    accessList: args.accessList,
    data: args.data,
    gas: args.gas,
    gasPrice: args.gasPrice,
    maxFeePerGas: args.maxFeePerGas,
    maxPriorityFeePerGas: args.maxPriorityFeePerGas,
    nonce: args.nonce,
    to: args.to,
    value: args.value,
  }
}
