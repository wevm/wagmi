import type { IsNarrowable, Merge } from './utils.js'
import type { Chain, Formatters } from 'viem'

/** Filters {@link chains} by {@link chainId} or simplifies if no `Formatters` are present. */
export type SelectChains<
  chains extends readonly Chain[],
  chainId extends chains[number]['id'] | undefined = undefined,
> = number extends chains[number]['id']
  ? readonly [Chain] // chains not narrowable
  : chainId extends chains[number]['id']
  ? readonly [Extract<chains[number], { id: chainId }>] // select chain
  : HasFormatter<chains> extends true
  ? chains
  : readonly [Merge<chains[0], Pick<chains[number], 'id'>>]

type HasFormatter<chains extends readonly Chain[]> = chains extends readonly [
  infer head extends Chain,
  ...infer tail extends readonly Chain[],
]
  ? IsNarrowable<head['formatters'], Formatters | undefined> extends true
    ? true
    : HasFormatter<tail>
  : false
