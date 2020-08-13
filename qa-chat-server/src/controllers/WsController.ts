import {Router} from 'express';
import * as http from 'http';
import cli from 'sucrase/dist/cli';
import WebSocket from 'ws'
import nanoid from 'nanoid';

// Redis
import redis from 'redis';
import {Message} from '../models/message.model';
import NotificationService from '../services/notificationService';
import {notificationServer} from '../ws';

const publisher = redis.createClient(6379);
const subscriber = redis.createClient(6379);

subscriber.subscribe('notification');

subscriber.on('message', (channel, message) => {
  console.log(channel, message);
});

class WsController {

  constructor() {
  }

  public async chatIndex(ws: WebSocket, req: http.IncomingMessage, client: any) {
  }

  public async notificationIndex(ws: WebSocket, req: any, client: any) {
    // @ts-ignore
    ws.userId = client.userId;

    // console.log('Notification WebSocket!');
    // const clients = notificationServer.clients;


    // console.log('Bildirim gonderildi!');


    // console.log([...clients.values()][0].userId);

    /*    publisher.publish('notification', JSON.stringify({
          userId: client.userId,
          celebName: 'Anne Hathaway'
        }));*/

    // console.log('Toplam Soket Sayisi: ', clients.size);

    const payload = {
      celebName: 'Kate UPTON'
    };

    // publisher.publish('notification', JSON.stringify(payload));

    ws.on('event 1', (data) => {
      console.log('Data geldi!');
      console.log(data);
    });

    ws.on('message', async (data: any) => {
      console.log('Mesaj geldi!');
      const {event, payload} = JSON.parse(data) as Message;
      ws.emit(event, payload);
    })
  }

}

export default new WsController()
