import {Application, Request, Response, Router} from 'express'
import voteService from '../../services/voteService'

const router: Router = Router()

export default (app: Application) => {
  app.use('/votes', router)

  router.post('upvote', async (req: Request, res: Response) => {
    try {
      const {questionId} = req.body
      const authorId = req.userId
      const vote = await voteService.upvote(questionId, authorId)
      res.json(vote)
    } catch (e) {
      res.json(e)
    }
  });

  router.post('downvote', async (req: Request, res: Response) => {
    try {
      const {questionId} = req.body
      const authorId = req.userId
      const vote = await voteService.downvote(questionId, authorId)
      res.json(vote)
    } catch (e) {
      res.json(e)
    }
  })
}
