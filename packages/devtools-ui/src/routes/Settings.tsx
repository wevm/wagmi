import { useTheme } from '../contexts/theme.js'

export function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <div>Settings</div>
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
