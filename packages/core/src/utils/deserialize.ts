export type Reviver = (this: any, key: string, value: any) => any

export function deserialize(cachedString: string, reviver?: Reviver) {
  return JSON.parse(cachedString, (key, value_) => {
    let value = value_
    if (value?.__type === 'bigint') value = BigInt(value.value)
    if (value?.__type === 'Map') value = new Map(value.value)
    return reviver?.(key, value) ?? value
  })
}
