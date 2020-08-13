import marked from 'marked'
import db from '../config/db'
import {Question} from '../models/question.model'

class QuestionService {
  async getAllQuestions(): Promise<Question[]> {
    try {
      const sql = `SELECT q.*,
                          jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                             u."avatarUrl")
                            AS "user",
                          (
                            SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                            FROM tag t
                                   LEFT JOIN question_tag qt ON qt."tagId" = t.id
                            WHERE qt."questionId" = q.id
                          ) AS "tags"
                   FROM question q
                          LEFT JOIN "user" u ON u.id = q."userId"
                   ORDER BY q.id DESC
                   LIMIT 6`
      const {rows} = await db.query(sql)
      return rows
    } catch (e) {
      throw e
    }
  }

  async getQuestionById(questionId: number): Promise<Question> {
    try {
      const sql = `SELECT q.*,
                          jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                             u."avatarUrl")
                            AS "user",
                          (
                            SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                            FROM tag t
                                   LEFT JOIN question_tag qt ON qt."tagId" = t.id
                            WHERE qt."questionId" = q.id
                          ) AS "tags",
                          (
                            SELECT jsonb_agg(
                                     jsonb_build_object('id', id, 'text', text, 'creationTime',
                                                        "creationTime",
                                                        'user',
                                                        (SELECT jsonb_build_object('id', u.id, 'displayName',
                                                                                   u."displayName", 'avatarUrl',
                                                                                   u."avatarUrl")
                                                         FROM "user" u
                                                         WHERE u.id = qc."userId"))
                                     )
                            FROM question_comment qc
                            WHERE qc."questionId" = q.id
                          ) AS "comments",
                          (
                            SELECT jsonb_agg(
                                     jsonb_build_object('id', id, 'text', text, 'creationTime',
                                                        a."creationTime", 'user',
                                                        (SELECT jsonb_build_object('id', u.id, 'displayName',
                                                                                   u."displayName", 'avatarUrl',
                                                                                   u."avatarUrl")
                                                         FROM "user" u
                                                         WHERE u.id = a."userId"))
                                     )
                            FROM question_answer a
                            WHERE a."questionId" = q.id
                          ) AS "answers",
                          (
                            SELECT COUNT(qv.id)::INT
                            FROM question_vote qv
                            WHERE qv."questionId" = q.id
                              AND qv.vote = true
                          ) AS "upvoteCount",
                          (
                            SELECT COUNT(qv.id)::INT
                            FROM question_vote qv
                            WHERE qv."questionId" = q.id
                              AND qv.vote = false
                          ) AS "downvoteCount"
                   FROM question q
                          LEFT JOIN "user" u ON u.id = q."userId"
                   WHERE q.id = $1`
      const {rows, rowCount} = await db.query(sql, [questionId])
      this.updateViewCount(questionId)
      return rows[0]
    } catch (e) {
      throw e
    }
  }

  async updateViewCount(questionId: number) {
    const viewSql = `UPDATE question
                     SET "viewCount" = "viewCount" + 1
                     WHERE id = $1`;
    await db.query(viewSql, [questionId])
  }

  async answered(): Promise<Question[]> {
    try {
      const sql = `SELECT q.*,
                          jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                             u."avatarUrl")
                            AS "user",
                          (
                            SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                            FROM tag t
                                   LEFT JOIN question_tag qt ON qt."tagId" = t.id
                            WHERE qt."questionId" = q.id
                          ) AS "tags"
                   FROM question q
                          LEFT JOIN "user" u ON u.id = q."userId"
                   WHERE q."acceptedAnswerId" IS NOT NULL
                   ORDER BY q.id DESC`
      const {rows} = await db.query(sql)
      return rows
    } catch (e) {
      throw e
    }
  }

  async unanswered(): Promise<Question[]> {
    try {
      const sql = `SELECT q.*,
                          jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                             u."avatarUrl")
                            AS "user",
                          (
                            SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                            FROM tag t
                                   LEFT JOIN question_tag qt ON qt."tagId" = t.id
                            WHERE qt."questionId" = q.id
                          ) AS "tags"
                   FROM question q
                          LEFT JOIN "user" u ON u.id = q."userId"
                   WHERE q."acceptedAnswerId" IS NULL
                   ORDER BY q.id DESC
                   LIMIT 600`;
      const {rows} = await db.query(sql);
      return rows
    } catch (e) {
      throw e
    }
  }

  async noanswers(): Promise<Question[]> {
    try {
      const sql = `SELECT q.id,
                          q.title,
                          q."creationTime",
                          jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                             u."avatarUrl")
                            AS "user",
                          (
                            SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                            FROM tag t
                                   LEFT JOIN question_tag qt ON qt."tagId" = t.id
                            WHERE qt."questionId" = q.id
                          ) AS "tags"
                   FROM question q
                          LEFT JOIN "user" u ON u.id = q."userId",
                        LATERAL (
                          SELECT COUNT(a.id) "answerCount" FROM answer a WHERE a."questionId" = q.id
                          ) a
                   WHERE q."acceptedAnswerId" IS NULL
                     AND a."answerCount" = 0
                   ORDER BY q.id DESC`;
      const {rows} = await db.query(sql);
      return rows
    } catch (e) {
      throw e
    }
  }

  async saveQuestion(title: string, text: string, tagIds: number[], userId: number): Promise<Question> {
    try {
      const markedText = marked(text);
      const values: number[] = tagIds;

      let tagValues = values.map(value => {
        return `(${value}, (SELECT id FROM result))`
      });

      const sql = `WITH result AS (
                    INSERT INTO question (title, text, "userId") VALUES ($1, $4, $3)
                        RETURNING id
                ),
                     result2 AS (
                         INSERT INTO question_revision (title, text, "userId", "questionId")
                             VALUES ($1, $2, $3, (SELECT id FROM result))
                     )
                INSERT
                INTO question_tag ("tagId", "questionId")
                VALUES ${tagValues.toString()}`;
      const {rows} = await db.query(sql, [title, text, userId, markedText]);
      return rows[0]
    } catch (e) {
      throw e
    }
  }

  async getTaggedQuestions(tagId: number): Promise<Question[]> {
    try {
      const sql = `SELECT t.id,
                          t.title,
                          (
                            SELECT jsonb_agg(jsonb_build_object(
                              'id', q.id,
                              'title', q.title,
                              'creationTime', q."creationTime",
                              'user',
                              (SELECT jsonb_build_object('id', id, 'displayName', "displayName",
                                                         'avatarUrl',
                                                         "avatarUrl")
                               FROM "user" u
                               WHERE id = q."userId"),
                              'tags', (
                                SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                                FROM tag t
                                       LEFT JOIN question_tag qt ON qt."tagId" = t.id
                                WHERE qt."questionId" = q.id
                              )
                              ))
                            FROM question q
                                   LEFT JOIN question_tag qt ON qt."tagId" = $1
                            WHERE q.id = qt."questionId"
                          ) AS "questions"
                   FROM tag t
                   WHERE id = $1`;
      const {rows} = await db.query(sql, [tagId]);
      return rows[0]
    } catch (e) {
      throw e
    }
  }

  async loadMore(offset: number): Promise<Question[]> {
    try {
      const sql = `SELECT q.*,
                          jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                             u."avatarUrl")
                            AS "user",
                          (
                            SELECT jsonb_agg(jsonb_build_object('id', t.id, 'title', t.title))
                            FROM tag t
                                   LEFT JOIN question_tag qt ON qt."tagId" = t.id
                            WHERE qt."questionId" = q.id
                          ) AS "tags"
                   FROM question q
                          LEFT JOIN "user" u ON u.id = q."userId"
                   ORDER BY q.id DESC
                   LIMIT 6
                   OFFSET
                   $1`;
      const {rows} = await db.query(sql, [offset]);
      return rows
    } catch (e) {
      throw e
    }
  }
}

export default new QuestionService()
