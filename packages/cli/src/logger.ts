import ora from 'ora'
import pc from 'picocolors'

import util from 'util'

function format(args: any[]) {
  return util
    .format(...args)
    .split('\n')
    .join('\n')
}

export function success(...args: any[]) {
  console.log(pc.green(format(args)))
}

export function info(...args: any[]) {
  console.info(pc.blue(format(args)))
}

export function log(...args: any[]) {
  console.log(pc.white(format(args)))
}

export function warn(...args: any[]) {
  console.warn(pc.yellow(format(args)))
}

export function error(...args: any[]) {
  console.error(pc.red(format(args)))
}

export function spinner() {
  return ora({
    color: 'yellow',
    spinner: 'dots',
  })
}
