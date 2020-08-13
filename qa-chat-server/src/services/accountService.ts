import {nanoid} from 'nanoid'
import {extname, resolve} from 'path'
import sharp from 'sharp'
import db from '../config/db'
import {User} from '../models/user.model'

class AccountService {
  async index(authorId: number): Promise<User> {
    try {
      const sql = `SELECT *
                   FROM "user"
                   WHERE id = $1`
      const {rows} = await db.query(sql, [authorId])
      return rows[0]
    } catch (e) {
      throw (e)
    }
  }

  async getFavoriteQuestions(authorId: number) {
    try {
      const sql = `SELECT q.id,
                          q.title,
                          q."creationTime",
                          (
                            SELECT jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                                      u."avatarUrl")
                            FROM "user" u
                            WHERE u.id = q."userId"
                          ) AS "user",
                          (
                            SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                            FROM tag t
                                   LEFT JOIN question_tag qt ON qt."tagId" = t.id
                            WHERE qt."questionId" = q.id
                          ) AS "tags"
                   FROM question q,
                        user_favorite_question ufq
                   WHERE ufq."authorId" = $1
                     AND q.id = ufq."questionId"`
      const {rows} = await db.query(sql, [authorId])
      return rows
    } catch (e) {
      throw e
    }
  }

  async updateAbout(about: string, userId: number) {
    try {
      const {rows} = await db.query(`UPDATE "user"
                                     SET "about" = $1
                                     WHERE id = $2
                                     RETURNING *`, [about, userId])
      return rows[0]
    } catch (e) {
      throw e
    }
  }

  async updateProfilePhoto(file: Express.Multer.File, userId: number) {
    try {
      const {buffer, originalname} = file
      const randomId = nanoid(12)

      await sharp(buffer)
        .resize(128)
        .jpeg({
          quality: 70
        })
        .toFile(resolve('src/uploads' + '/resized', `${randomId}${extname(originalname)}`));

      const avatarUrl = `//192.168.1.6:3000/static/uploads/resized/${randomId}${extname(originalname)}`
      const {rows} = await db.query(`UPDATE "user"
                                     SET "avatarUrl" = $1
                                     WHERE id = $2
                                     RETURNING "avatarUrl"`, [avatarUrl, userId])
      return rows[0]
    } catch (e) {
      throw e
    }
  }
}

export default new AccountService()
