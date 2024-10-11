import { createResizeObserver } from '@solid-primitives/resize-observer'
import { makePersisted } from '@solid-primitives/storage'
import {
  type JSX,
  type ParentProps,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { createStore } from 'solid-js/store'

import type { PreferencesContext } from '../contexts/preferences.js'

const [panelWidth, setPanelWidth] = createSignal(0)

export function Resizable(props: Resizable.Props) {
  const [isResizing, setIsResizing] = createSignal(false)
  const [store, setStore] = makePersisted(
    createStore({
      height: '300',
      width: '300',
    }),
  )

  createEffect(() => {
    const root = panelRef.parentElement as HTMLElement
    const height = store.height || 500
    const width = store.width || 500
    const panelPosition = props.position
    root.style.setProperty(
      '--tsqd-panel-height',
      `${panelPosition === 'top' ? '-' : ''}${height}px`,
    )
    root.style.setProperty(
      '--tsqd-panel-width',
      `${panelPosition === 'left' ? '-' : ''}${width}px`,
    )
  })

  const position = createMemo(() => props.position || 'bottom')

  const handleDragStart: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    const panelElement = event.currentTarget.parentElement
    if (!panelElement) return

    setIsResizing(true)
    const { height, width } = panelElement.getBoundingClientRect()
    const startX = event.clientX
    const startY = event.clientY
    let newSize = 0
    const minHeight = convertRemToPixels(3.5)
    const minWidth = convertRemToPixels(12)
    const runDrag = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault()

      if (position() === 'left' || position() === 'right') {
        const valToAdd =
          position() === 'right'
            ? startX - moveEvent.clientX
            : moveEvent.clientX - startX
        newSize = Math.round(width + valToAdd)
        if (newSize < minWidth) {
          newSize = minWidth
        }
        setStore({ width: String(Math.round(newSize)) })

        const newWidth = panelElement.getBoundingClientRect().width
        // If the panel size didn't decrease, this means we have reached the minimum width
        // of the panel so we restore the original width in local storage
        // Restoring the width helps in smooth open/close transitions
        if (Number(store.width) < newWidth) {
          setStore({ width: String(newWidth) })
        }
      } else {
        const valToAdd =
          position() === 'bottom'
            ? startY - moveEvent.clientY
            : moveEvent.clientY - startY
        newSize = Math.round(height + valToAdd)
        // If the panel size is less than the minimum height,
        // we set the size to the minimum height
        if (newSize < minHeight) {
          newSize = minHeight
        }
        setStore({ height: String(Math.round(newSize)) })
      }
    }

    const unsubscribe = () => {
      if (isResizing()) {
        setIsResizing(false)
      }
      document.removeEventListener('mousemove', runDrag, false)
      document.removeEventListener('mouseUp', unsubscribe, false)
    }

    document.addEventListener('mousemove', runDrag, false)
    document.addEventListener('mouseup', unsubscribe, false)
  }

  let panelRef!: HTMLDivElement

  onMount(() => {
    createResizeObserver(panelRef, ({ width }, el) => {
      if (el === panelRef) {
        setPanelWidth(width)
      }
    })
  })

  createEffect(() => {
    const rootContainer = panelRef.parentElement?.parentElement?.parentElement
    if (!rootContainer) return
    const currentPosition = props.position || 'bottom'
    const styleProp = getSidedProp('padding', currentPosition)
    const isVertical = props.position === 'left' || props.position === 'right'
    const previousPaddings = (({
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }) => ({
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }))(rootContainer.style)

    rootContainer.style[styleProp] = `${
      isVertical ? store.width : store.height
    }px`

    onCleanup(() => {
      for (const [property, previousValue] of Object.entries(
        previousPaddings,
      )) {
        rootContainer.style[property as keyof typeof previousPaddings] =
          previousValue
      }
    })
  })

  return (
    <aside
      // Some context for styles here
      // background-color - Changes to a lighter color create a harder contrast
      // between the queries and query detail panel
      // -
      // min-width - When the panel is in the left or right position, the panel
      // width is set to min-content to allow the panel to shrink to the lowest possible width
      classList={{
        'bg-background-100 border-gray-200 fixed': true,
        'top-0 inset-x-0 border-b max-h-[90%] min-h-14':
          props.position === 'top',
        'bottom-0 inset-x-0 border-t max-h-[90%] min-h-14':
          props.position === 'bottom',
        'left-0 inset-y-0 border-r max-w-[90%] min-w-14':
          props.position === 'left',
        'right-0 inset-y-0 border-l max-w-[90%] min-w-14':
          props.position === 'right',
        'min-w-min':
          panelWidth() < thirdBreakpoint &&
          (position() === 'right' || position() === 'left'),
      }}
      style={{
        height:
          position() === 'bottom' || position() === 'top'
            ? `${store.height || 500}px`
            : 'auto',
        width:
          position() === 'right' || position() === 'left'
            ? `${store.width || 500}px`
            : 'auto',
      }}
      ref={panelRef}
      aria-label="Tanstack query devtools"
    >
      <button
        classList={{
          'absolute z-[4] hover:bg-purple-800/90': true,
          'bottom-0 h-[3px] w-full cursor-ns-resize': props.position === 'top',
          'top-0 h-[3px] w-full cursor-ns-resize': props.position === 'bottom',
          'right-0 w-[3px] h-full cursor-ew-resize': props.position === 'left',
          'left-0 w-[3px] h-full cursor-ew-resize': props.position === 'right',
        }}
        onMouseDown={handleDragStart}
      />

      {props.children}
    </aside>
  )
}

export declare namespace Resizable {
  type Props = ParentProps<{
    position: PreferencesContext.Preferences['position']
  }>
}

const thirdBreakpoint = 700

function getSidedProp<prop extends string>(
  prop: prop,
  side: Resizable.Props['position'],
) {
  return `${prop}${
    side.charAt(0).toUpperCase() + side.slice(1)
  }` as `${prop}${Capitalize<Resizable.Props['position']>}`
}

const convertRemToPixels = (rem: number) => {
  return (
    rem * Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
  )
}
