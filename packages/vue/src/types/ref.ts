// Credit: https://github.com/TanStack/query/blob/01ce023826b81e6c41e354f27691f65c9725af67/packages/vue-query/src/types.ts

import type { Config, Connector } from '@wagmi/core'
import type { MaybeRef, Ref, UnwrapRef } from 'vue'

type Primitive = string | number | boolean | bigint | symbol | undefined | null
type UnwrapLeaf =
  | Primitive
  // biome-ignore lint/complexity/noBannedTypes: we need to support all types
  | Function
  | Date
  | Error
  | RegExp
  | Map<any, any>
  | WeakMap<any, any>
  | Set<any>
  | WeakSet<any>

export type DeepMaybeRef<value> = MaybeRef<
  // biome-ignore lint/complexity/noBannedTypes:
  value extends Function | Config | Connector
    ? value
    : value extends object | any[]
      ? {
          [key in keyof value]: DeepMaybeRef<value[key]>
        }
      : value
>

export type DeepUnwrapRef<T> = T extends UnwrapLeaf
  ? T
  : T extends Ref<infer U>
    ? DeepUnwrapRef<U>
    : // biome-ignore lint/complexity/noBannedTypes:
      T extends {}
      ? {
          [Property in keyof T]: DeepUnwrapRef<T[Property]>
        }
      : UnwrapRef<T>
