import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

import { ironOptions } from '../../lib/iron'
import ssx from './_ssx'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      req.session.nonce = ssx.generateNonce()
      await req.session.save()
      res.setHeader('Content-Type', 'text/plain')
      res.send(req.session.nonce)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withIronSessionApiRoute(handler, ironOptions)
