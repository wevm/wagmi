import { BaseProvider } from '@ethersproject/providers'

export type WithProvider<T> = T & {
  /** Interface for connecting to network */
  provider: BaseProvider
}
