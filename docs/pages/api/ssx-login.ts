import { SiweMessage } from '@spruceid/ssx-server'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ironOptions } from '../../lib/iron'
import ssx from './_ssx'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { siwe, signature } = req.body
        const siweMessage = new SiweMessage(siwe)
        await ssx.login(
          siwe,
          signature,
          req.body.daoLogin,
          req.body.resolveEns,
          req.cookies.nonce || '',
          req.body.resolveLens,
        )

        req.session.siwe = siweMessage
        await req.session.save()

        res.json({ ok: true })
      } catch (_error) {
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
