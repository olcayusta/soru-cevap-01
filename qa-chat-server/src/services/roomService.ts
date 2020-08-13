import db from '../config/db'

class RoomService {
  async getRoomById(roomId: number) {
    try {
      const sql = `SELECT r.id,
                          r.title,
                          jsonb_agg(mesajlar ORDER BY mesajlar.id ASC) AS "messages"
                   FROM chat_room r
                          LEFT JOIN LATERAL (
                     SELECT id,
                            text,
                            m."createdTime",
                            m."authorId",
                            m.type,
                            (SELECT jsonb_build_object('id', u.id, 'displayName', u."displayName", 'avatarUrl',
                                                       u."avatarUrl")
                             FROM "user" u
                             WHERE u.id = m."authorId") AS "user"
                     FROM chat_message m
                     WHERE "roomId" = r.id
                     ORDER BY id DESC
                     LIMIT 20
                     ) AS "mesajlar" ON TRUE
                   WHERE r.id = $1
                   GROUP BY r.id`;
      const {rows, rowCount} = await db.query(sql, [roomId])
      return {rows, rowCount}
    } catch (e) {
      throw e
    }
  }

  async getAllRooms() {
    try {
      const sql = `SELECT r.id,
                          r.title,
                          jsonb_build_object(
                            'id', m.id, 'text', m.text, 'createdTime', m."createdTime", 'type', m.type,
                            'user', (SELECT row_to_json(u) FROM "user" u WHERE u.id = m."authorId" LIMIT 1)
                            ) AS "message"
                   FROM chat_room r
                          LEFT JOIN LATERAL (
                     SELECT * FROM chat_message m WHERE m."roomId" = r.id ORDER BY m."createdTime" DESC LIMIT 1
                     ) AS m ON TRUE
                   ORDER BY m."createdTime" DESC NULLS LAST`
      const {rows} = await db.query(sql)
      return rows
    } catch (e) {
      throw e
    }
  }
}

export default new RoomService()
