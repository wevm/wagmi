import type { Component } from 'solid-js'

export const Devtools: Component = (props) => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(props)
  return <div>devtools</div>
}
