import type { Client } from 'viem'

/**
 * Retrieves and returns an action from the client (if exists), and falls
 * back to the tree-shakable action.
 *
 * Useful for extracting overridden actions from a client (ie. if a consumer
 * wants to override the `sendTransaction` implementation).
 */
export function getAction<params extends {}, returnType extends {}>(
  client: Client,
  action: (_: any, params: params) => returnType,
  // Some minifiers drop `Function.prototype.name`, meaning that `action.name`
  // will not work. For that case, the consumer needs to pass the name explicitly.
  name: string,
) {
  const clientAction = client[action.name ?? name]
  return (params: params): returnType => {
    if (typeof clientAction === 'function') clientAction(params)
    return action(client, params)
  }
}
