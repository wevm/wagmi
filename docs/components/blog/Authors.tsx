type AuthorsProps = {
  date: string
  children: React.ReactNode
}

export function Authors({ date, children }: AuthorsProps) {
  return (
    <div className="mt-4 mb-8 text-gray-400 text-sm">
      {date} by{children}
    </div>
  )
}

type AuthorProps = { name: string; link: string }

export function Author({ name, link }: AuthorProps) {
  return (
    <span className="after:content-[','] last:after:content-['']">
      <a
        key={name}
        href={link}
        target="_blank"
        className="mx-1 text-gray-800 dark:text-gray-100"
      >
        {name}
      </a>
    </span>
  )
}
