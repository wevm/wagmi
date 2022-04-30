import { NextRequest, NextResponse } from 'next/server'
import { locales } from 'nextra/locales'

const redirects: Record<string, string> = {
  '/docs/migrating-to-030': '/docs/migrating-to-03',
}

export function middleware(request: NextRequest) {
  // Tweeted wrong link: https://twitter.com/awkweb/status/1518607780332122116
  // Handle redirect in `_middleware.ts` because of bug using `next.config.js`
  // https://github.com/shuding/nextra/issues/384
  if (request.nextUrl.pathname in redirects) {
    const url = request.nextUrl.clone()
    url.pathname = redirects[request.nextUrl.pathname]
    return NextResponse.redirect(url)
  }

  return locales(request)
}
