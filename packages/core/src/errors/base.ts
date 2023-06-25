import type { Evaluate, OneOf } from '../types/utils.js'
import { getVersion } from '../utils/getVersion.js'

type BaseErrorParameters = Evaluate<
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

  constructor(shortMessage: string, parameters: BaseErrorParameters = {}) {
    super()

    const details =
      parameters.cause instanceof BaseError
        ? parameters.cause.details
        : parameters.cause?.message
        ? parameters.cause.message
        : parameters.details!
    const docsPath =
      parameters.cause instanceof BaseError
        ? parameters.cause.docsPath || parameters.docsPath
        : parameters.docsPath

    this.message = [
      shortMessage || 'An error occurred.',
      '',
      ...(parameters.metaMessages ? [...parameters.metaMessages, ''] : []),
      ...(docsPath
        ? [
            `Docs: ${this.docsBaseUrl}${docsPath}.html${
              parameters.docsSlug ? `#${parameters.docsSlug}` : ''
            }`,
          ]
        : []),
      ...(details ? [`Details: ${details}`] : []),
      `Version: ${this.version}`,
    ].join('\n')

    if (parameters.cause) this.cause = parameters.cause
    this.details = details
    this.docsPath = docsPath
    this.metaMessages = parameters.metaMessages
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
