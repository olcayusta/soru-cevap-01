import db from '../config/db'

class VoteService {
  async upvote(questionId: number, authorId: number) {
    try {
      const values = [authorId, questionId, true]
      const sql = `INSERT INTO question_vote ("authorId", "questionId", vote)
                   VALUES ($1, $2, $3)
                   RETURNING *`
      const {rows} = await db.query(sql, values)
      return rows
    } catch (e) {
      throw e
    }
  }

  async downvote(questionId: number, authorId: number) {
    try {
      const values = [authorId, questionId, false]
      const sql = `INSERT INTO question_vote ("authorId", "questionId", vote)
                   VALUES ($1, $2, $3)
                   RETURNING *`
      const {rows} = await db.query(sql, values)
      return rows
    } catch (e) {
      throw e
    }
  }
}

export default new VoteService()
