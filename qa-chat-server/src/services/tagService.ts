import db from '../config/db'
import {Tag} from '../models/tag.model'

class TagService {
  async index(): Promise<Tag[]> {
    try {
      const sql = `SELECT t.id,
                          t.title,
                          t.description,
                          (
                            SELECT COUNT(qt.id)
                            FROM question_tag qt
                            WHERE qt."tagId" = t.id
                          ) AS "questionCount"
                   FROM "tag" t`
      const {rows} = await db.query(sql)
      return rows
    } catch (e) {
      throw e
    }
  }

  async save(): Promise<Tag> {
    try {
      const sql = `SELECT t.id,
                          t.title,
                          t.description,
                          (
                            SELECT COUNT(qt.id)
                            FROM question_tag qt
                            WHERE qt."tagId" = t.id
                          ) AS "questionCount"
                   FROM "tag" t`
      const {rows} = await db.query(sql)
      return rows[0]
    } catch (e) {
      throw e
    }
  }
}

export default new TagService()
