export function uniqueBy<
  key extends string,
  items extends { [_ in key]: string }[],
>(items: items, key: key): items {
  const filtered = [] as unknown as items

  for (const item of items)
    if (!filtered.some((x) => x[key] === item[key])) filtered.push(item)

  return filtered
}
