import pico from 'picocolors'

import util from 'util'

function format(args: any[]) {
  return util
    .format(...args)
    .split('\n')
    .join('\n')
}

export function success(...args: Array<any>) {
  console.log(pico.green(format(args)))
}

export function info(...args: Array<any>) {
  console.info(pico.blue(format(args)))
}

export function log(...args: Array<any>) {
  console.log(pico.white(format(args)))
}

export function warn(...args: Array<any>) {
  console.warn(pico.yellow(format(args)))
}

export function error(...args: Array<any>) {
  console.error(pico.red(format(args)))
}
