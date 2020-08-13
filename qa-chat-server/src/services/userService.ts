import crypto from 'crypto'
import db from '../config/db'
import { Answer } from '../models/answer.model'
import { Question } from '../models/question.model'
import { User } from '../models/user.model'

class UserService {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const sql = `SELECT *
                   FROM "user"`
      const {rows} = await db.query(sql)
      console.log(rows)
      return rows
    } catch (e) {
      throw e
    }
  }

  /**
   * Get user questions by user id
   * @param userId
   */
  async getUserQuestions(userId: number): Promise<Question[]> {
    try {
      const sql = `SELECT q.id,
                          q.title,
                          q."creationTime",
                          (
                            SELECT row_to_json(u)
                            FROM "user" u
                            WHERE id = q."userId"
                          ) AS "user"
                   FROM question q
                   WHERE "userId" = $1`
      const {rows} = await db.query(sql, [userId])
      return rows
    } catch (e) {
      throw e
    }
  }

  /**
   * Get user answers by user id
   * @param userId
   */
  async getUserAnswers(userId: number): Promise<Answer[]> {
    try {
      const sql = `SELECT a.id,
                          a."createdTime",
                          (
                            SELECT jsonb_build_object('id', q.id, 'title', q.title)
                            FROM question q
                            WHERE q.id = a."questionId"
                          ) AS "question"
                   FROM answer a
                   WHERE "authorId" = $1`
      const {rows} = await db.query(sql, [userId])
      return rows
    } catch (e) {
      throw e
    }
  }

  async getUser(userId: number): Promise<User> {
    try {
      const sql = `SELECT *
                   FROM "user"
                   WHERE id = $1`
      const {rows} = await db.query(sql, [userId])
      return rows[0]
    } catch (e) {
      throw e
    }
  }

  /**
   * Create new user
   * @param email
   * @param password
   */
  async saveUser(email: string, password: string): Promise<User> {
    try {
      const salt = crypto.randomBytes(16).toString('hex')
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
      const sql = `INSERT INTO "user" (email, "passwordSalt", "passwordHash")
                   VALUES ($1, $2, $3)
                   RETURNING id`
      const {rows} = await db.query(sql, [email, salt, hash])
      return rows[0]
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export default new UserService()
