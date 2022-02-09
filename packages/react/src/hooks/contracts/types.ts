import { ethers } from 'ethers'

type GenericWrite = (...args: any) => Promise<ethers.ContractTransaction>

/**
 * need to check [T] extends [never], rather than T extends never, to stop it
 * being distributive
 *
 * https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
 */
type IfNeverThen<T, Then> = [T] extends [never] ? Then : T

export type WriteMethodNames<
  Contract extends ethers.Contract,
  Methods extends Contract['functions'] = Contract['functions'],
> = {
  [M in keyof Methods]: Methods[M] extends GenericWrite ? M : never
}[keyof Methods]

/**
 * Default to all keyof Methods if the inner mapped type evaluates to never.
 * This occurs when all Contract methods exten GenericWrite, which is the case
 * for ethers.Contract whose methods are defined as follows
 *
 * methods are mapped to -
 *  class Contract extends BaseContract {
 *    readonly [ key: string ]: ContractFunction | any;
 *  }
 *  type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;
 *
 *  this trick is really only necessary to allow users to use contract hooks
 *  without providing a generic.
 */
export type ReadMethodNames<
  Contract extends ethers.Contract,
  Methods extends Contract['functions'] = Contract['functions'],
> = IfNeverThen<
  {
    [M in keyof Methods]: Methods[M] extends GenericWrite ? never : M
  }[keyof Methods],
  keyof Methods
>

export type MethodNames<Contract extends ethers.Contract> =
  keyof Contract['functions']

export type Writes<Contract extends ethers.Contract> = Pick<
  Contract['functions'],
  WriteMethodNames<Contract>
>

export type Reads<Contract extends ethers.Contract> = Pick<
  Contract['functions'],
  ReadMethodNames<Contract>
>
