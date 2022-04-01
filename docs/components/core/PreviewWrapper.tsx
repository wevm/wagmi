import * as React from 'react'
import { useTheme as useNextThemes } from 'next-themes'
import { Box, useTheme } from 'degen'

type Props = {
  children: React.ReactNode
}

export function PreviewWrapper({ children }: Props) {
  const { resolvedTheme } = useNextThemes()
  const { setMode } = useTheme()

  React.useEffect(() => {
    if (!resolvedTheme) return
    if (resolvedTheme === 'system') return
    setMode(resolvedTheme as any)
  }, [resolvedTheme, setMode])

  return (
    <Box
      borderColor="foregroundSecondary"
      borderRadius="2xLarge"
      borderWidth="0.5"
      marginY="8"
      overflow="hidden"
      padding="6"
      width="full"
      minHeight="24"
    >
      {children}
    </Box>
  )
}
