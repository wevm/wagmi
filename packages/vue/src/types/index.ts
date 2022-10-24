import {
  Address,
  ResolvedConfig,
  TypedData,
  TypedDataDomain,
  TypedDataToPrimitiveTypes,
} from 'abitype'
import { BigNumber } from 'ethers'
import { Ref } from 'vue-demi'

declare module 'abitype' {
  export interface Config {
    // TODO: Drop `BigNumber` once ethers supports `bigint` natively
    BigIntType: BigNumber
    IntType: number
  }
}

declare module 'ethers/lib/utils' {
  export function getAddress(address: string): Address
  export function verifyTypedData<
    TTypedData extends TypedData,
    TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
  >(
    domain: TypedDataDomain,
    types: TTypedData,
    value: TSchema[keyof TSchema] extends infer TValue
      ? { [x: string]: any } extends TValue
        ? Record<string, any>
        : TValue
      : never,
    signature:
      | {
          r: string
          s?: string
          _vs?: string
          recoveryParam?: number
          v?: number
        }
      | ResolvedConfig['BytesType']
      | string,
  ): string
}

export type MaybeRef<T> = Ref<T> | T
