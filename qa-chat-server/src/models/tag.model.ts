import { Question } from './question.model'

export interface Tag {
  id: number
  title: string
  text: string
  description: string
  questionCount: number
  questions: Question[]
}
