import type { Config } from '@wagmi/core'
import type { Component, Signal } from 'solid-js'
import { createSignal, lazy } from 'solid-js'
import { render } from 'solid-js/web'

import { setupStyleSheet } from './utils.js'

export type DevtoolsProps = {
  readonly config: Config
  readonly framework: string
  readonly version: string

  buttonPosition?: `${YPosition}-${XPosition}` | 'relative' | undefined
  initialIsOpen?: boolean | undefined
  onClose?: (() => unknown) | undefined
  position?: XPosition | YPosition | undefined
  shadowDOMTarget?: ShadowRoot | undefined
}

type XPosition = 'left' | 'right'
type YPosition = 'top' | 'bottom'

export type DevtoolsComponentType = Component<DevtoolsProps> & {
  shadowDOMTarget?: ShadowRoot
}

export interface DevtoolsParameters extends DevtoolsProps {
  styleNonce?: string
  shadowDOMTarget?: ShadowRoot
}

export class Devtools {
  #Component: DevtoolsComponentType | undefined
  #buttonPosition: Signal<DevtoolsProps['buttonPosition']>
  #config: Signal<Config>
  #dispose?: () => void
  #framework: string
  #initialIsOpen: Signal<boolean | undefined>
  #isMounted = false
  #position: Signal<DevtoolsProps['position']>
  #shadowDOMTarget?: ShadowRoot
  #styleNonce?: string
  #version: string

  constructor(parameters: DevtoolsParameters) {
    const {
      buttonPosition,
      config,
      framework,
      initialIsOpen,
      position,
      shadowDOMTarget,
      styleNonce,
      version,
    } = parameters
    this.#buttonPosition = createSignal(buttonPosition)
    this.#config = createSignal(config)
    this.#framework = framework
    this.#initialIsOpen = createSignal(initialIsOpen)
    this.#position = createSignal(position)
    this.#shadowDOMTarget = shadowDOMTarget
    this.#styleNonce = styleNonce
    this.#version = version
  }

  setButtonPosition(position: DevtoolsProps['buttonPosition']) {
    this.#buttonPosition[1](position)
  }

  setConfig(config: Config) {
    this.#config[1](config)
  }

  setInitialIsOpen(isOpen: boolean) {
    this.#initialIsOpen[1](isOpen)
  }

  setPosition(position: DevtoolsProps['position']) {
    this.#position[1](position)
  }

  mount<type extends HTMLElement>(el: type) {
    if (this.#isMounted) throw new Error('Devtools is already mounted')

    const dispose = render(() => {
      const [btnPosition] = this.#buttonPosition
      const [config] = this.#config
      const [isOpen] = this.#initialIsOpen
      const [position] = this.#position

      let Devtools: DevtoolsComponentType
      if (this.#Component) Devtools = this.#Component
      else {
        Devtools = lazy(() => import('./root.js'))
        this.#Component = Devtools
      }

      setupStyleSheet(this.#styleNonce, this.#shadowDOMTarget)
      return (
        <Devtools
          framework={this.#framework}
          version={this.#version}
          shadowDOMTarget={this.#shadowDOMTarget}
          {...{
            get config() {
              return config()
            },
            get buttonPosition() {
              return btnPosition()
            },
            get position() {
              return position()
            },
            get initialIsOpen() {
              return isOpen()
            },
          }}
        />
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
