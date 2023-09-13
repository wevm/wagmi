import type { z } from 'zod'

class ValidationError extends Error {
  details: Zod.ZodIssue[]

  constructor(
    message: string,
    options: {
      details: Zod.ZodIssue[]
    },
  ) {
    super(message)
    this.details = options.details
  }
}

// From https://github.com/causaly/zod-validation-error
export function fromZodError(
  zError: z.ZodError,
  {
    maxIssuesInMessage = 99,
    issueSeparator = '\n- ',
    prefixSeparator = '\n- ',
    prefix = 'Validation Error',
  }: {
    maxIssuesInMessage?: number
    issueSeparator?: string
    prefixSeparator?: string
    prefix?: string
  } = {},
): ValidationError {
  function joinPath(arr: Array<string | number>): string {
    return arr.reduce<string>((acc, value) => {
      if (typeof value === 'number') return `${acc}[${value}]`
      const separator = acc === '' ? '' : '.'
      return acc + separator + value
    }, '')
  }

  const reason = zError.errors
    // limit max number of issues printed in the reason section
    .slice(0, maxIssuesInMessage)
    // format error message
    .map((issue) => {
      const { message, path } = issue
      if (path.length > 0) return `${message} at \`${joinPath(path)}\``
      return message
    })
    // concat as string
    .join(issueSeparator)

  const message = reason ? [prefix, reason].join(prefixSeparator) : prefix

  return new ValidationError(message, {
    details: zError.errors,
  })
}
