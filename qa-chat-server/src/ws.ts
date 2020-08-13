import { Server } from 'ws'
import ChatServer from './ChatServer'
import NotificationServer from './NotificationServer'

export const chatServer = new Server({noServer: true})
chatServer.on('connection', ChatServer.onConnection)

export const notificationServer = new Server({noServer: true})
notificationServer.on('connection', NotificationServer.onConnection)
