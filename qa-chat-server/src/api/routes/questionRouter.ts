import {Application, Request, Response, Router} from 'express'
import isAuth from '../../middlewares/isAuth'

import questionService from '../../services/questionService'
import notificationService from '../../services/notificationService'

const router: Router = Router()

export default (app: Application) => {
  app.use('/questions', router)

  // Get Recent Questions
  router.get('/', async (req: Request, res: Response) => {
    try {
      const questions = await questionService.getAllQuestions()
      console.log(questions)
      await notificationService.sendNotify('Kate Upton', 27)
      res.json(questions)
    } catch (e) {
      res.json(e)
    }
  })

  // Get Question By Id
  router.get('/:questionId', async (req: Request, res: Response) => {
    try {
      const {questionId} = req.params
      const question = await questionService.getQuestionById(+questionId)
      // await NotificationService.sendNotify2('Jennifer Aniston', 50);
      res.json(question)
    } catch (e) {
      res.json(e)
    }
  })

  // GET Answered Questions
  router.get('/answered', async (req: Request, res: Response) => {
    try {
      const answeredQuestions = await questionService.answered()
      res.json(answeredQuestions)
    } catch (e) {
      res.json(e)
    }
  })

  // GET Unanswered Questions
  router.get('/unanswered', async (req: Request, res: Response) => {
    const unansweredQuestions = await questionService.unanswered()
    res.json(unansweredQuestions)
  })

  // GET No Answered Questions
  router.get('/noanswers', async (req: Request, res: Response) => {
    try {
      const noanswers = await questionService.noanswers()
      res.json(noanswers)
    } catch (e) {
      res.json(e)
    }
  })

  // create new quesiton
  router.post('/', isAuth, async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const {title, text, tagIds} = req.body
      const authorId = req.userId
      const question = await questionService.saveQuestion(title, text, tagIds, authorId)
      res.json(question)
    } catch (e) {
      res.json(e)
    }
  })

  router.get('/tagged/:tagId', async (req: Request, res: Response) => {
    try {
      const {tagId} = req.params
      const taggedQuestions = await questionService.getTaggedQuestions(+tagId)
      res.json(taggedQuestions)
    } catch (e) {
      res.json(e)
    }
  })

  router.get('/load/:offset', async (req: Request, res: Response) => {
    try {
      const {offset} = req.params
      const questions = await questionService.loadMore(+offset)
      res.json(questions)
    } catch (e) {
      res.json(e)
    }
  })
}
