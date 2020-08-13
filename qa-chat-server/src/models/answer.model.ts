import { Question } from './question.model'
import { User } from './user.model'

export interface Answer {
  id: number
  text: string
  questionId: number
  createdTime: Date
  user: User
  upvoteCount: number
  downvoteCount: number
  comments: Comment[]
  question: Question
}
