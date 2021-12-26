import { Unit } from '../types'

// https://github.com/ethers-io/ethers.js/blob/master/packages/units/src.ts/index.ts#L10-L18
export const units = ['wei', 'kwei', 'mwei', 'gwei', 'szabo', 'finney', 'ether']

export const unitDecimalsByName: Record<Unit, number> = {
  wei: 18,
  kwei: 15,
  mwei: 12,
  gwei: 9,
  szabo: 6,
  finney: 3,
  ether: 1,
}
