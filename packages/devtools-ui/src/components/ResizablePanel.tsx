import {
  type ParentProps,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { createStore } from 'solid-js/store'

export function ResizablePanel(props: ResizablePanel.Props) {
  let panelRef: HTMLDivElement | undefined
  let observerRef: ResizeObserver | undefined

  const [state, setState] = createStore({
    isResizing: false,
    initialPos: 0,
    initialSize: 0,
    maxSize: 0,
  })

  const [size, setSize] = createSignal(props.initialSize || 300)

  const isHorizontal = () => ['left', 'right'].includes(props.position)

  const panelStyle = () => ({
    [props.position]: '0px',
    [isHorizontal() ? 'width' : 'height']: `${size()}px`,
  })

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    setState({
      isResizing: true,
      initialPos: isHorizontal() ? event.clientX : event.clientY,
      initialSize: size(),
    })
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!state.isResizing) return
    resizePanel(
      isHorizontal()
        ? event.clientX - state.initialPos
        : event.clientY - state.initialPos,
    )
  }

  const handleMouseUp = () => {
    setState({ isResizing: false })
  }

  const resizePanel = (delta: number) => {
    const newSize =
      props.position === 'right' || props.position === 'bottom'
        ? state.initialSize - delta
        : state.initialSize + delta
    setSize(Math.max(100, Math.min(newSize, state.maxSize)))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const step = 10
    let newSize = size()

    switch (e.key) {
      case 'Home':
        newSize = 100
        break
      case 'End':
        newSize = state.maxSize
        break
      case 'ArrowLeft':
        if (props.position === 'right') newSize += step
        else if (props.position === 'left') newSize -= step
        break
      case 'ArrowRight':
        if (props.position === 'right') newSize -= step
        else if (props.position === 'left') newSize += step
        break
      case 'ArrowUp':
        if (props.position === 'bottom') newSize += step
        else if (props.position === 'top') newSize -= step
        break
      case 'ArrowDown':
        if (props.position === 'bottom') newSize -= step
        else if (props.position === 'top') newSize += step
        break
      default:
        return
    }

    setSize(Math.max(100, Math.min(newSize, state.maxSize)))
    e.preventDefault()
  }

  onMount(() => {
    observerRef = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setState('maxSize', isHorizontal() ? width * 0.9 : height * 0.9)
      }
    })

    if (panelRef?.parentElement) observerRef.observe(panelRef.parentElement)
  })

  createEffect(() => {
    if (state.isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  onCleanup(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    if (observerRef) observerRef.disconnect()
  })

  return (
    <div
      ref={panelRef}
      style={panelStyle()}
      data-position={props.position}
      classList={{
        'bg-background-100 border-gray-200 fixed': true,
        'top-0 inset-x-0 border-b min-h-14': props.position === 'top',
        'bottom-0 inset-x-0 border-t min-h-14': props.position === 'bottom',
        'left-0 inset-y-0 border-r min-w-14': props.position === 'left',
        'right-0 inset-y-0 border-l min-w-14': props.position === 'right',
      }}
    >
      {props.children}
      <button
        classList={{
          'absolute z-[4] hover:bg-purple-800/90': true,
          'bottom-0 h-[3px] inset-x-0 cursor-ns-resize':
            props.position === 'top',
          'top-0 h-[3px] inset-x-0 cursor-ns-resize':
            props.position === 'bottom',
          'right-0 w-[3px] inset-y-0 cursor-ew-resize':
            props.position === 'left',
          'left-0 w-[3px] inset-y-0 cursor-ew-resize':
            props.position === 'right',
        }}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        aria-label={`Resize panel ${isHorizontal() ? 'horizontally' : 'vertically'}`}
        title={`Resize panel ${isHorizontal() ? 'horizontally' : 'vertically'}`}
      />
    </div>
  )
}

export declare namespace ResizablePanel {
  type Props = ParentProps<{
    initialSize?: number | undefined
    position: 'top' | 'bottom' | 'left' | 'right'
  }>
}
