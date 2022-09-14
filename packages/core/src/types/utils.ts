export type IsNever<T> = [T] extends [never] ? true : false
export type NotEqual<T, U> = [T] extends [U] ? false : true
export type Or<T, U> = T extends true ? true : U extends true ? true : false

export type UnwrapArray<T> = T extends infer _T extends readonly any[]
  ? _T['length'] extends 0
    ? void
    : _T['length'] extends 1
    ? _T[0]
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _T extends readonly [...infer _]
    ? _T
    : any
  : never
