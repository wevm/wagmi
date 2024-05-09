import { BaseError } from './base.js'

export type WagmiPluginNotFoundErrorType = WagmiPluginNotFoundError & {
  name: 'WagmiPluginNotFoundError'
}
export class WagmiPluginNotFoundError extends BaseError {
  override name = 'WagmiPluginNotFoundError'
  constructor() {
    super(
      'No `config` found in Vue context, use `WagmiPlugin` to properly initialize the library.',
      {
        docsPath: '/api/TODO',
      },
    )
  }
}

export type WagmiInjectionContextErrorType = WagmiInjectionContextError & {
  name: 'WagmiInjectionContextError'
}
export class WagmiInjectionContextError extends BaseError {
  override name = 'WagmiInjectionContextError'
  constructor() {
    super(
      'Wagmi composables can only be used inside `setup()` function or functions that support injection context.',
      {
        docsPath: '/api/TODO',
      },
    )
  }
}
