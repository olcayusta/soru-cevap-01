import { Request, Response, NextFunction } from 'express'
import jose from 'jose'
import fs from 'fs'

// const privateKey = jose.JWK.asKey(fs.readFileSync('key.json.pem'));
const privateKey = jose.JWK.asKey(fs.readFileSync('public.key'))

interface DecodedPayload {
  foo: string
  sub: number
  iss: string
  iat: number
  exp: number
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      let token = authHeader!.split(' ')[1]
      const decoded = await jose.JWT.verify(
        token,
        privateKey
      ) as DecodedPayload
      req.userId = +decoded.sub
      next()
    }
  } catch (e) {
    res.json({
      error: true
    })
  }
}
