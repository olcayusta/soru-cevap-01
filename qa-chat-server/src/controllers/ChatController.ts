import * as http from 'http'
import WebSocket from 'ws'
import {Message} from '../models/message.model'
import marked from 'marked'
import {imageRenderer} from '../helpers/marked/imageRenderer'
import ChatService from '../services/chatService'

class ChatController {

  constructor() {
  }

  public async connect(ws: WebSocket, req: http.IncomingMessage, client: any) {
    ChatService.connect(ws, req, client)
  }

  // On connection
  public async index(ws: WebSocket, req: http.IncomingMessage, client: any) {
    console.log('🍺 CHAT Controller Initialized... 🍺')

    ws.on('chat message', async (data) => {
      const markedText = marked.inlineLexer(data.text, [], {
        renderer: imageRenderer()
      })

      if (ws.readyState === WebSocket.OPEN) {
        try {
          const message = await ChatService.saveMessage(markedText, data.roomId, data.authorId, 1, data.content)

          // Mesaji gonderen istemciye geri cevap ver.
          ws.send(JSON.stringify({
            event: 'chat',
            payload: message
          }))
        } catch (e) {
          throw e
        }
      }
    })

    ws.on('message', async (data: any) => {
      const {event, payload} = JSON.parse(data) as Message
      ws.emit(event, payload)
    })
  }
}

export default new ChatController()
