import { useDevtoolsContext } from '../contexts/devtools.js'
import { useTheme } from '../contexts/theme.js'

export function Settings() {
  const value = useDevtoolsContext()
  const { theme, setTheme } = useTheme()

  return (
    <div class="p-4">
      <div>Settings</div>
      <div>
        {value.framework} devtools {value.version}
      </div>
      <div>
        <div>Theme: {theme()}</div>
        <button type="button" onClick={() => setTheme('dark')}>
          dark
        </button>
        <button type="button" onClick={() => setTheme('auto')}>
          auto
        </button>
        <button type="button" onClick={() => setTheme('light')}>
          light
        </button>
      </div>
    </div>
  )
}
