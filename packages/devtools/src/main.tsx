import type { QueryClient } from '@tanstack/solid-query'
import type { Config } from '@wagmi/solid'
import type { Component, Signal } from 'solid-js'
import { createSignal, lazy } from 'solid-js'
import { render } from 'solid-js/web'

import { DevtoolsContext } from './context.js'
import { setupStyleSheet } from './utils.js'

export class Devtools {
  #Component: Component | undefined
  #buttonPosition: Signal<Devtools.Props['buttonPosition']>
  #config: Signal<Config>
  #dispose?: (() => void) | undefined
  #framework: string
  #initialIsOpen: Signal<boolean | undefined>
  #isMounted = false
  #position: Signal<Devtools.Props['position']>
  #queryClient: Signal<QueryClient>
  #shadowDOMTarget?: ShadowRoot | undefined
  #styleNonce?: string | undefined
  #version: string

  constructor(parameters: Devtools.Parameters) {
    const {
      buttonPosition,
      config,
      framework,
      initialIsOpen,
      position,
      queryClient,
      shadowDOMTarget,
      styleNonce,
      version,
    } = parameters
    this.#buttonPosition = createSignal(buttonPosition)
    this.#config = createSignal(config)
    this.#framework = framework
    this.#initialIsOpen = createSignal(initialIsOpen)
    this.#position = createSignal(position)
    this.#queryClient = createSignal(queryClient)
    this.#shadowDOMTarget = shadowDOMTarget
    this.#styleNonce = styleNonce
    this.#version = version
  }

  setButtonPosition(position: Devtools.Props['buttonPosition']) {
    this.#buttonPosition[1](position)
  }

  setConfig(config: Config) {
    this.#config[1](config)
  }

  setInitialIsOpen(isOpen: boolean) {
    this.#initialIsOpen[1](isOpen)
  }

  setPosition(position: Devtools.Props['position']) {
    this.#position[1](position)
  }

  setQueryClient(queryClient: QueryClient) {
    this.#queryClient[1](queryClient)
  }

  mount<type extends HTMLElement>(el: type) {
    if (this.#isMounted) throw new Error('Devtools is already mounted')

    const dispose = render(() => {
      const [buttonPosition] = this.#buttonPosition
      const [config] = this.#config
      const [initialIsOpen] = this.#initialIsOpen
      const [position] = this.#position
      const [queryClient] = this.#queryClient

      const App = (() => {
        if (this.#Component) return this.#Component
        this.#Component = lazy(() => import('./App.js'))
        return this.#Component
      })()

      setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget)
      const value = {
        framework: this.#framework,
        shadowDOMTarget: this.#shadowDOMTarget,
        version: this.#version,
        get config() {
          return config()
        },
        get buttonPosition() {
          return buttonPosition()
        },
        get initialIsOpen() {
          return initialIsOpen()
        },
        get position() {
          return position()
        },
        get queryClient() {
          return queryClient()
        },
      }
      return (
        <DevtoolsContext.Provider value={value}>
          <App />
        </DevtoolsContext.Provider>
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

    buttonPosition?: `${YPosition}-${XPosition}` | 'relative' | undefined
    initialIsOpen?: boolean | undefined
    onClose?: (() => unknown) | undefined
    position?: XPosition | YPosition | undefined
    shadowDOMTarget?: ShadowRoot | undefined
  }

  interface Parameters extends Devtools.Props {
    styleNonce?: string
    shadowDOMTarget?: ShadowRoot
  }
}

type XPosition = 'left' | 'right'
type YPosition = 'top' | 'bottom'
