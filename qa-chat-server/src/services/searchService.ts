import db from '../config/db'

class SearchService {
  async searchQuestion(searchTerm: string) {
    try {
      const words = searchTerm.split(' ')
      let myStr = ''
      for (let i = 0; i < words.length; i++) {
        myStr += `${words[i]}:*`
        if (i < words.length - 1) {
          myStr += ' | '
        }
      }

      const tsQuery = `${searchTerm}:*`
      const values = [myStr.toUpperCase()]
      const sql = `SELECT q.*,
                          jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl', u."avatarUrl")
                              AS "user",
                          (
                              SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                              FROM tag t
                                       LEFT JOIN question_tag qt ON qt."tagId" = t.id
                              WHERE qt."questionId" = q.id
                          )   AS "tags"
                   FROM question q
                            LEFT JOIN "user" u ON u.id = q."userId"
                   WHERE to_tsquery(lower($1)) @@ to_tsvector(lower(title))
                   ORDER BY q.id DESC`
      const {rows} = await db.query(sql, values)
      return rows
    } catch (e) {
      throw e
    }
  }

  async searchTag(searchTerm: string) {
    try {
      const tsQuery = `${searchTerm}:*`
      const values = [tsQuery]
      const sql = `SELECT *
                   FROM tag
                   WHERE to_tsquery($1) @@ to_tsvector(title)`
      const {rows} = await db.query(sql, values)
      return rows
    } catch (e) {
      throw e
    }
  }
}

export default new SearchService()
