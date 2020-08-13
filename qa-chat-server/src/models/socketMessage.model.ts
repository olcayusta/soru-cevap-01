import { Message } from './message.model'

export interface SocketMessage {
  event: string
  payload: Message
}
