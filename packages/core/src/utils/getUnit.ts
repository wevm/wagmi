import { weiUnits } from 'viem'

import type { Unit } from '../types'

export function getUnit(unit: Unit) {
  if (typeof unit === 'number') return unit
  if (unit === 'wei') return 0
  return Math.abs(weiUnits[unit])
}
