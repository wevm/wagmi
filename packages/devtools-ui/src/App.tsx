import { Icon } from '@iconify-icon/solid'
import { createShortcut } from '@solid-primitives/keyboard'
import { A } from '@solidjs/router'
import { type ParentProps, Show } from 'solid-js'

import { Resizable } from './components/Resizable.jsx'
import { usePreferences } from './contexts/preferences.js'
import { useTheme } from './contexts/theme.js'

export function App(props: App.Props) {
  const { resolvedTheme } = useTheme()
  const { preferences, setPreferences } = usePreferences()

  createShortcut(
    ['Control', 'Shift', 'D'],
    () => {
      setPreferences((x) => ({ ...x, open: !x.open }))
    },
    { preventDefault: false, requireReset: false },
  )

  return (
    <div
      data-theme={resolvedTheme()}
      class="antialiased font-sans text-gray-900"
    >
      <Show when={!preferences.open}>
        <button
          type="button"
          onClick={() => setPreferences((x) => ({ ...x, open: true }))}
        >
          Open Devtools
        </button>
      </Show>

      <Show when={preferences.open}>
        <Resizable position={preferences.position}>
          <button
            type="button"
            classList={{
              'absolute cursor-pointer z-[5]': true,
              'bottom-0 right-4': preferences.position === 'top',
              'top-0 right-4': preferences.position === 'bottom',
              'right-0 bottom-4': preferences.position === 'left',
              'left-0 bottom-4': preferences.position === 'right',
            }}
            onClick={() => setPreferences((x) => ({ ...x, open: false }))}
          >
            Close Devtools
          </button>

          <nav class="bg-background-200 border-b border-gray-200 font-medium px-3 py-1 flex gap-3 text-sm w-full">
            <A
              href="/"
              class="flex items-center gap-1"
              activeClass="text-gray-1000"
              end
            >
              <Icon icon="lucide:link-2" />
              <span>Connections</span>
            </A>
            <A
              href="/settings"
              class="flex items-center gap-1"
              activeClass="text-gray-1000"
            >
              <Icon icon="lucide:settings-2" />
              <span>Settings</span>
            </A>
          </nav>

          <div class="font-medium px-3 py-1 flex gap-3 text-sm w-full">
            <button
              type="button"
              onClick={() => setPreferences((x) => ({ ...x, position: 'top' }))}
              class="flex items-center gap-1"
            >
              <Icon icon="mdi:dock-top" />
              <span>Top</span>
            </button>

            <button
              type="button"
              onClick={() =>
                setPreferences((x) => ({ ...x, position: 'left' }))
              }
              class="flex items-center gap-1"
            >
              <Icon icon="mdi:dock-left" />
              <span>Left</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setPreferences((x) => ({ ...x, position: 'right' }))
              }
              class="flex items-center gap-1"
            >
              <Icon icon="mdi:dock-right" />
              <span>Right</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setPreferences((x) => ({ ...x, position: 'bottom' }))
              }
              class="flex items-center gap-1"
            >
              <Icon icon="mdi:dock-bottom" />
              <span>Bottom</span>
            </button>
          </div>

          {props.children}
        </Resizable>
      </Show>
    </div>
  )
}

export declare namespace App {
  type Props = ParentProps
}
