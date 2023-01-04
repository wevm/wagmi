import Link from 'next/link'
import type { Page } from 'nextra'
// eslint-disable-next-line import/no-unresolved
import { getPagesUnderRoute } from 'nextra/context'

export function BlogIndex({ more = 'Read more' }) {
  return (
    <>
      <h1 className="text-center font-extrabold text-3xl mb-10 md:text-5xl mt-10 md:mb-14">
        wagmi Blog
      </h1>

      {getPagesUnderRoute('/blog').map(
        (
          page: Page & {
            frontMatter?: {
              date?: string
              description?: string
              title?: string
            }
          },
        ) => {
          return (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-4">
                <Link
                  href={page.route}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {page.meta?.title || page.frontMatter?.title || page.name}
                </Link>
              </h3>

              <p className="opacity-80 mb-3">
                {page.frontMatter?.description}{' '}
                <Link
                  href={page.route}
                  className="nx-text-primary-500 underline"
                >
                  {more + ' →'}
                </Link>
              </p>

              {page.frontMatter?.date ? (
                <p className="opacity-50 text-sm">{page.frontMatter.date}</p>
              ) : null}
            </div>
          )
        },
      )}
    </>
  )
}
