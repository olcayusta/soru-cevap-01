import {Answer} from './answer.model'
import {Tag} from './tag.model'
import {User} from './user.model'

export interface Question {
  readonly id: number
  title: string
  text: string
  createdTime: Date
  readonly authorId: number
  readonly user: User
  readonly tags: Tag[]
  readonly comments: Comment[]
  acceptedAnswer: Answer
  upvoteCount: number
  downvoteCount: number
  viewCount: number
  answers: Answer[]
}
