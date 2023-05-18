import type { OneOf, Prettify } from '../types/utils.js'
import { getVersion } from '../utils/getVersion.js'

type BaseErrorParameters = Prettify<
  {
    docsPath?: string
    docsSlug?: string
    metaMessages?: string[]
  } & OneOf<{ details?: string } | { cause: BaseError | Error }>
>

export class BaseError extends Error {
  details: string
  docsPath?: string | undefined
  metaMessages?: string[] | undefined
  shortMessage: string

  override name = 'WagmiCoreError'
  docsBaseUrl = 'https://wagmi.sh/core'
  version = getVersion()

  constructor(shortMessage: string, args: BaseErrorParameters = {}) {
    super()

    const details =
      args.cause instanceof BaseError
        ? args.cause.details
        : args.cause?.message
        ? args.cause.message
        : args.details!
    const docsPath =
      args.cause instanceof BaseError
        ? args.cause.docsPath || args.docsPath
        : args.docsPath

    this.message = [
      shortMessage || 'An error occurred.',
      '',
      ...(args.metaMessages ? [...args.metaMessages, ''] : []),
      ...(docsPath
        ? [
            `Docs: ${this.docsBaseUrl}${docsPath}.html${
              args.docsSlug ? `#${args.docsSlug}` : ''
            }`,
          ]
        : []),
      ...(details ? [`Details: ${details}`] : []),
      `Version: ${this.version}`,
    ].join('\n')

    if (args.cause) this.cause = args.cause
    this.details = details
    this.docsPath = docsPath
    this.metaMessages = args.metaMessages
    this.shortMessage = shortMessage
  }

  walk(fn?: (err: unknown) => boolean) {
    return this.#walk(this, fn)
  }

  #walk(err: unknown, fn?: (err: unknown) => boolean): unknown {
    if (fn?.(err)) return err
    if ((err as Error).cause) return this.#walk((err as Error).cause, fn)
    return err
  }
}
