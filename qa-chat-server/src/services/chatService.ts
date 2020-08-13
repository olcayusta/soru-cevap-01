import http from 'http'
import WebSocket from 'ws'
import db from '../config/db'
import { Message } from '../models/message.model'

class ChatService {
  async connect(ws: WebSocket, req: http.IncomingMessage, client: any) {
  }

  async saveMessage(markedText: string, roomId: number, authorId: number, type: number, content: any): Promise<Message> {
    try {
      const sql = `WITH cte_chat_message AS (
                        INSERT INTO chat_message (text, "roomId", "authorId", type, content) VALUES ($1, $2, $3, $4, $5) RETURNING *
                    )
                    SELECT ccm.id,
                           text,
                           "roomId",
                           "createdTime",
                           content,
                           jsonb_build_object('id', u.id, 'displayName', "displayName", 'avatarUrl', "avatarUrl") AS "user"
                    FROM cte_chat_message ccm,
                         "user" u
                    WHERE u.id = $3`
      const {rows} = await db.query(sql, [markedText, roomId, authorId, 1, content])
      return rows[0]
    } catch (e) {
      throw e
    }
  }
}

export default new ChatService()
