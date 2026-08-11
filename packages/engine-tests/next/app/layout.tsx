import type { ReactNode } from 'react'

export default function Layout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  )
}
