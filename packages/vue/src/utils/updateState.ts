// Credit: https://github.com/TanStack/query/blob/01ce023826b81e6c41e354f27691f65c9725af67/packages/vue-query/src/utils.ts#L11-L18

export function updateState(
  state: Record<string, unknown>,
  update: Record<string, any>,
): void {
  for (const key of Object.keys(state)) {
    state[key] = update[key]
  }
}
