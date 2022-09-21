export type IsNever<T> = [T] extends [never] ? true : false
export type NotEqual<T, U> = [T] extends [U] ? false : true
export type Or<T, U> = T extends true ? true : U extends true ? true : false
