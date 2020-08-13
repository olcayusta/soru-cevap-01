import db from '../config/db'
import { notificationServer } from '../ws'

class NotificationService {
  async index(authorId: number) {
    try {
      const sql = `select *,
                          (select jsonb_build_object('id', id, 'displayName', "displayName", 'avatarUrl',
                                                     "avatarUrl")
                           from "user" u
                           where u.id = n."userId") as "user"
                   from notification n
                   where "receiverId" = $1`
      const {rows} = await db.query(sql, [authorId])
      return rows
    } catch (e) {
      throw e
    }
  }

  async unseen(authorId: number) {
    try {
      const sql = `select count(*) as "unseenCount"
                   from notification n
                   where "receiverId" = $1`
      const {rows} = await db.query(sql, [authorId])
      return rows[0]
    } catch (e) {
      throw e
    }
  }

  async sendNotificationToUser(userId: number, questionId: number) {
    console.log(userId)
    notificationServer.clients.forEach(client => {
      // @ts-ignore
      if (client.userId === userId) {
        client.send(JSON.stringify({
          event: 'answered question',
          payload: {
            questionId,
            foo: 'bar'
          }
        }))
      }
    })
  }

  async sendNotify(celebName: string, age: number) {
    notificationServer.clients.forEach(value => {
      value.send(JSON.stringify({
        event: 'celeb',
        celebName,
        age
      }))
    })
  }

  async sendNotify2(celebName: string, age: number) {
    notificationServer.clients.forEach(value => {
      value.send(JSON.stringify({
        event: 'news',
        celebName,
        age
      }))
    })
  }
}

export default new NotificationService();
