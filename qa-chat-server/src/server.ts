import app from './app'
import WebSocket from 'ws'
import { parse } from 'url'
import { chatServer, notificationServer } from './ws'
import { JWT, JWK } from 'jose'
import { readFileSync } from 'fs'

const server = app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}...`)
})

server.on('upgrade', async (req, socket, head: any) => {
  const pathname = parse(req.url).pathname

/*  let client: any;

  try {
    const token: string = req.headers['sec-websocket-protocol'] as string;
    const decoded = await JWT.verify(
      token,
      JWK.asKey(readFileSync('public.key')),
      {
        issuer: 'http://localhost'
      }
    );
    client = {
      // @ts-ignore
      foo: decoded.foo,
      // @ts-ignore
      userId: +decoded.sub
    }
  } catch (e) {
    socket.destroy();
    return;
  }*/

  let client = {
    userId: 1
  }

  if (pathname === '/notification') {
    notificationServer.handleUpgrade(req, socket, head, async (ws: WebSocket) => {
      notificationServer.emit('connection', ws, req, client)
    })
  } else if (pathname === '/chat') {
    chatServer.handleUpgrade(req, socket, head, async (ws: WebSocket) => {
      chatServer.emit('connection', ws, req, client)
    })
  } else {
    socket.destroy()
  }
})
