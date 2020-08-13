import marked from 'marked';
import db from '../config/db';
import {Answer} from '../models/answer.model';
import {notificationServer} from '../ws';
import NotificationService from './notificationService';

class AnswerService {
  async getAnswersByQuestionId(questionId: number): Promise<Answer[]> {
    try {
      const sql = `SELECT *
                   FROM answer
                   WHERE "questionId" = $1`;
      const {rows} = await db.query(sql, [questionId]);
      return rows
    } catch (e) {
      throw e
    }
  }

  async saveAnswer(text: string, questionId: number, authorId: number) {
    try {
      /*     const sql = `WITH i1 AS (INSERT INTO answer (text, "authorId", "questionId") VALUES ($1, $2, $3) RETURNING *)
                             INSERT INTO notification ("authorId", "receiverId", text, type) VALUES ($2, (select "authorId" from question where id = $3), 'my text', 'answer')
                             RETURNING *
                             `;*/
      const sql = `WITH cte1 AS (
                      INSERT INTO answer (text, "authorId", "questionId")
                          VALUES ($1, $2, $3)
                          RETURNING *
                  ),
                       cte2 AS (
                           INSERT INTO notification ("authorId", "receiverId", text, type)
                               VALUES ($2,
                                       (SELECT "authorId" FROM question WHERE id = $3),
                                       'my text', 'answer')
                               RETURNING *
                       )
                  SELECT cte1.*, cte2."receiverId"
                  FROM cte1, cte2`;
      const values = [marked(text), authorId, questionId];
      const {rows} = await db.query(sql, values);

      notificationServer.clients.forEach((value: any) => {
        value.send(JSON.stringify({
          event: 'test',
          celebName: 'Jennifer Aniston'
        }))
      });

      await NotificationService.sendNotificationToUser(rows[0].receiverId, rows[0].questionId);

      // save notification

      /*  const authorId = req.userId;
        const notificationSql = `insert into notification ("authorId", "receiverId", text, type) VALUES ($1, $2, $3, $4)`;
        const { rows } = await db.query(sql, [authorId, 2, text, ])*/

      return rows[0]
    } catch (e) {
      throw e
    }
  }
}

export default new AnswerService()
