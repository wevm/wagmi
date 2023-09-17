type PageProps = {
  is404: boolean
}

export function Page(props: PageProps) {
  const { is404 } = props

  if (is404)
    return (
      <>
        <h1>404 Page Not Found</h1>
        <p>This page could not be found.</p>
      </>
    )

  return (
    <>
      <h1>500 Internal Error</h1>
      <p>Something went wrong.</p>
    </>
  )
}
