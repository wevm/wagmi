import * as React from 'react'

type Props = {
  title: string
}

export function CodeWrapper({
  children,
  title,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="code-wrapper flex flex-col gap-0 my-4">
      <header className="px-4 py-2.5 rounded-t-xl subpixel-antialiased text-xs font-mono border-b">
        {title}
      </header>

      {children}
    </div>
  )
}
