import http from 'http';
import WebSocket from 'ws';
import { SocketMessage } from './models/socketMessage.model';

class NotificationServer {
  async onConnection(ws: WebSocket, req: http.IncomingMessage, client: any) {
    // @ts-ignore
    ws.userId = client.userId;

    ws.on('message', async (data: any) => {
      const {event, payload} = JSON.parse(data) as SocketMessage;
      ws.emit(event, payload);
    });
  }
}

export default new NotificationServer()
