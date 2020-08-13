import {User} from './user.model'

export interface Message {
  id: number
  creationTime: string
  content: string
  text: string
  renderedText: string
  type: number
  roomId: number
  authorId: number
  user: User
  event: string
  payload: any
}
