import 'abitype'
import { BigNumber } from 'ethers'

declare module 'abitype' {
  // TODO: Drop `BigNumber` once ethers supports `bigint` natively
  export interface Config {
    IntType: number | BigNumber
    BigIntType: BigNumber
  }
}
