import { buildHooksSystem } from '@css-hooks/core'
import type { JSX } from 'solid-js'

const createHooks = buildHooksSystem<JSX.CSSProperties>()

export const { and, not, on, or, styleSheet } = createHooks(
  "[data-theme='auto'] &",
  "[data-theme='dark'] &",
  '&:active',
  '&:empty',
  '&:focus',
  '&:focus-visible',
  '&:has(*)',
  '&:has(:focus-visible)',
  '&:hover',
  '&:only-child',
  '@media (hover: hover)',
  '@media (prefers-color-scheme: dark)',
)

export const dark = or(
  "[data-theme='dark'] &",
  and("[data-theme='auto'] &", '@media (prefers-color-scheme: dark)'),
)

export const hover = and('&:hover', '@media (hover: hover)')
