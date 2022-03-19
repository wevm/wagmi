const LIMIT_REPLACE_NODE = '[...]'
const CIRCULAR_REPLACE_NODE = '[Circular]'

const arr: any[] = []
const replacerStack: any[] = []

type Options = { depthLimit?: number; edgesLimit?: number }
const defaultOptions: Options = {
  depthLimit: Number.MAX_SAFE_INTEGER,
  edgesLimit: Number.MAX_SAFE_INTEGER,
}

// Regular stringify
export function serialize(
  obj: Record<string, any>,
  replacer?: Replacer,
  spacer?: string | number,
  options: Options = defaultOptions,
) {
  decirc(obj, '', 0, [], undefined, 0, options)

  let res: string
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer)
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify(
      '[unable to serialize, circular reference is too complex to analyze]',
    )
  } finally {
    while (arr.length !== 0) {
      const part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }

  return res
}

function setReplace(
  replace: string,
  val: any,
  k: string | number,
  parent: any,
) {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
  if (propertyDescriptor?.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, { value: replace })
      arr.push([parent, k, val, propertyDescriptor])
    } else {
      replacerStack.push([val, k, replace])
    }
  } else {
    parent[k] = replace
    arr.push([parent, k, val])
  }
}

function decirc(
  val: any,
  k: number | string,
  edgeIndex: number,
  stack: any[],
  parent: any,
  depth: number,
  options: Options,
) {
  depth += 1
  let i: number
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      const keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        const key = keys[i]
        decirc(val[key], key, i, stack, val, depth, options)
      }
    }
    stack.pop()
  }
}

type Replacer = (key: string, value: any) => string

// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues(replacer: Replacer = (_k, v) => v) {
  return (key: string, val: any) => {
    if (replacerStack.length > 0) {
      for (let i = 0; i < replacerStack.length; i++) {
        const part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = part[2]
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.apply(key, val)
  }
}
