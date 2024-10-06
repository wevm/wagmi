import type { QueryClient } from '@tanstack/solid-query'
import type { Config } from '@wagmi/solid'
import type { Component, Signal } from 'solid-js'
import { createSignal, lazy } from 'solid-js'
import { Portal, render } from 'solid-js/web'

import { DevtoolsContext } from './context.js'

import './style.css'

export class Devtools {
  #Component: Component | undefined
  #config: Signal<Config>
  #dispose?: (() => void) | undefined
  #framework: string
  #isMounted = false
  #queryClient: Signal<QueryClient>
  #version: string

  constructor(parameters: Devtools.Props) {
    const { config, framework, queryClient, version } = parameters
    this.#config = createSignal(config)
    this.#framework = framework
    this.#queryClient = createSignal(queryClient)
    this.#version = version
  }

  setConfig(config: Config) {
    this.#config[1](config)
  }

  setQueryClient(queryClient: QueryClient) {
    this.#queryClient[1](queryClient)
  }

  mount<type extends HTMLElement>(el: type) {
    if (this.#isMounted) throw new Error('Devtools is already mounted')

    const dispose = render(() => {
      const [config] = this.#config
      const [queryClient] = this.#queryClient

      const App = (() => {
        if (this.#Component) return this.#Component
        this.#Component = lazy(() => import('./App.js'))
        return this.#Component
      })()

      const value = {
        framework: this.#framework,
        version: this.#version,
        get config() {
          return config()
        },
        get queryClient() {
          return queryClient()
        },
      }
      return (
        <Portal>
          <div class="wagmi-devtools-content">
            <style innerHTML={styles} />
            <DevtoolsContext.Provider value={value}>
              <App />
            </DevtoolsContext.Provider>
          </div>
        </Portal>
      )
    }, el)

    this.#isMounted = true
    this.#dispose = dispose
  }

  unmount() {
    if (!this.#isMounted) throw new Error('Devtools is not mounted')
    this.#dispose?.()
    this.#isMounted = false
  }
}

export declare namespace Devtools {
  type Props = {
    readonly config: Config
    readonly queryClient: QueryClient
    readonly framework: string
    readonly version: string

    onClose?: (() => unknown) | undefined
  }
}

// replaced with bundled css
const styles = ''
