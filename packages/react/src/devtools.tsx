'use client'

import type { Config } from '@wagmi/core'
import { Devtools, type DevtoolsProps } from '@wagmi/devtools'
import * as React from 'react'

import { useConfig } from './hooks/useConfig.js'
import { getVersion } from './utils/getVersion.js'

export type WagmiDevtoolsProps = {
  buttonPosition?: DevtoolsProps['buttonPosition'] | undefined
  config?: Config | undefined
  initialIsOpen?: boolean | undefined
  position?: DevtoolsProps['position']
  shadowDOMTarget?: ShadowRoot | undefined
  styleNonce?: string | undefined
}

export function WagmiDevtools(
  props: WagmiDevtoolsProps,
): React.ReactElement | null {
  const config = useConfig(props)
  const ref = React.useRef<HTMLDivElement>(null)
  const {
    buttonPosition,
    position,
    initialIsOpen,
    styleNonce,
    shadowDOMTarget,
  } = props
  const [devtools] = React.useState(
    new Devtools({
      buttonPosition,
      config,
      framework: 'react',
      initialIsOpen,
      position,
      shadowDOMTarget,
      styleNonce,
      version: getVersion(),
    }),
  )

  React.useEffect(() => {
    devtools.setConfig(config)
  }, [config, devtools])

  React.useEffect(() => {
    if (buttonPosition) devtools.setButtonPosition(buttonPosition)
  }, [buttonPosition, devtools])

  React.useEffect(() => {
    if (position) devtools.setPosition(position)
  }, [position, devtools])

  React.useEffect(() => {
    devtools.setInitialIsOpen(initialIsOpen || false)
  }, [initialIsOpen, devtools])

  React.useEffect(() => {
    if (ref.current) devtools.mount(ref.current)
    return () => {
      devtools.unmount()
    }
  }, [devtools])

  return <div className="wd-parent-container" ref={ref} />
}
