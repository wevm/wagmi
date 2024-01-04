import { usePageContext } from './usePageContext'

type LinkProps = {
  children: React.ReactNode
  className?: string | undefined
  href?: string | undefined
}

export function Link(props: LinkProps) {
  const pageContext = usePageContext()
  const className = [
    props.className,
    pageContext.urlPathname === props.href && 'is-active',
  ]
    .filter(Boolean)
    .join(' ')
  return <a {...props} className={className} />
}
