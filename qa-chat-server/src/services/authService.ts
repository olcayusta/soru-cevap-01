import crypto from 'crypto'
import fs from 'fs'
import jose from 'jose'
import db from '../config/db'
import { User } from '../models/user.model'

class AuthService {
  async emailValidate(email: string): Promise<User> {
    try {
      const sql = `SELECT id, email, "displayName", "avatarUrl"
                   FROM "user"
                   WHERE email = $1`
      const {rows} = await db.query(sql, [email])
      console.log(rows)
      return rows[0]
    } catch (e) {
      throw e
    }
  }

  async signJWT(userId: number) {
    const privateKey = jose.JWK.asKey(fs.readFileSync('private.key'))
    /*        const privateKey = jose.JWK.generateSync('RSA', 2048);
            console.log(privateKey.toPEM());
            console.log(privateKey.toPEM(true));*/

    return jose.JWT.sign(
      {'foo': 'bar'},
      privateKey,
      {
        expiresIn: '24 hour',
        header: {
          typ: 'JWT'
        },
        issuer: 'http://localhost',
        subject: userId.toString()
      }
    )
  }

  async passwordValidate(email: string, password: string) {
    try {
      const sql = `SELECT *
                   FROM "user"
                   WHERE email = $1`;
      const {rows} = await db.query(sql, [email])

      const {passwordHash, passwordSalt} = rows[0] as User
      const newHash = crypto.pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512').toString('hex')

      if (newHash === passwordHash) {
        const {id, email, displayName, avatarUrl} = rows[0]
        return {id, email, displayName, avatarUrl}
      } else {
        return {
          error: true
        }
      }
    } catch (e) {
      throw e
    }
  }
}

export default new AuthService()
