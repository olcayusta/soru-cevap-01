import {Application, Request, Response, Router} from 'express'
import isAuth from '../../middlewares/isAuth'

import NotificationService from '../../services/notificationService'
import answerService from "../../services/answerService"

const router: Router = Router()

export default (app: Application) => {
  app.use('/answers', router)

  /**
   *
   */
  router.get('/:questionId', async (req: Request, res: Response) => {
    try {
      const {questionId} = req.params
      const answers = await answerService.getAnswersByQuestionId(+questionId)
      res.json(answers)
    } catch (e) {
      res.json(e)
    }
  })

  // create new answer
  router.post('/', isAuth, async (req: Request, res: Response) => {
    try {
      const {text, questionId} = req.body
      const authorId = req.userId
      const answer = await answerService.saveAnswer(text, questionId, authorId)
      // await NotificationService.sendNotificationToUser(answer.)
      res.json(answer)
    } catch (e) {
      res.json(e)
    }
  })
}
