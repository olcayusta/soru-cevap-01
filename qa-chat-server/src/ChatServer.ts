import http from 'http';
import WebSocket from 'ws';
import { SocketMessage } from './models/socketMessage.model';
import { chatServer } from './ws';
import chatService from "./services/chatService";

class ChatServer {
  async onConnection(ws: WebSocket, req: http.IncomingMessage, client: any) {
    // @ts-ignore
    ws.userId = client.userId;

    ws.on('message', async (data: string) => {
      const {event, payload} = JSON.parse(data) as SocketMessage;
      ws.emit(event, payload);
    });

    ws.on('chat message', async (data) => {
      const message = await chatService.saveMessage(data.text, data.roomId, data.authorId, 1, data.content);

      // Send message to all clients
      chatServer.clients.forEach(client => {
        // @ts-ignore
        if (client.roomId === message.roomId) {
          client.send(JSON.stringify({
            event: 'chat message',
            payload: message
          }))
        }
      })
    });

    ws.on('join room', async ({roomId, roomTitle}) => {
      // @ts-ignore
      ws.roomTitle = roomTitle;

      // @ts-ignore
      ws.roomId = roomId;
    })
  }
}

export default new ChatServer()
