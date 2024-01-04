type Reviver = (key: string, value: any) => any

export function deserialize<type>(value: string, reviver?: Reviver): type {
  return JSON.parse(value, (key, value_) => {
    let value = value_
    if (value?.__type === 'bigint') value = BigInt(value.value)
    if (value?.__type === 'Map') value = new Map(value.value)
    return reviver?.(key, value) ?? value
  })
}
