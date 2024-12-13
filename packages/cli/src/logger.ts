import { format as utilFormat } from 'node:util'
import { createSpinner } from 'nanospinner'
import pc from 'picocolors'

function format(args: any[]) {
  return utilFormat(...args)
    .split('\n')
    .join('\n')
}

export function success(...args: any[]) {
  // biome-ignore lint/suspicious/noConsoleLog: console.log is used for logging
  console.log(pc.green(format(args)))
}

export function info(...args: any[]) {
  console.info(pc.blue(format(args)))
}

export function log(...args: any[]) {
  // biome-ignore lint/suspicious/noConsoleLog: console.log is used for logging
  console.log(pc.white(format(args)))
}

export function warn(...args: any[]) {
  console.warn(pc.yellow(format(args)))
}

export function error(...args: any[]) {
  console.error(pc.red(format(args)))
}

export function spinner(text: string) {
  return createSpinner(text, {
    color: 'yellow',
  })
}
