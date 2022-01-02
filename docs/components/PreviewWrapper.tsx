import * as React from 'react'
import { useTheme as useNextThemes } from 'next-themes'
import { Box, useTheme } from 'degen'

type Props = {
  children: React.ReactNode
}

export const PreviewWrapper = ({ children }: Props) => {
  const { theme } = useNextThemes()
  const { setMode } = useTheme()

  React.useEffect(() => {
    if (!theme) return
    setMode(theme as any)
  }, [theme, setMode])

  return (
    <Box
      borderColor="foregroundSecondary"
      borderRadius="2xLarge"
      borderWidth="0.5"
      marginY="8"
      overflow="hidden"
      padding="6"
      width="full"
    >
      {children}
    </Box>
  )
}
