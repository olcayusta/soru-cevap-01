import { Application, Request, Response, Router } from 'express'
import searchService from '../../services/searchService'

const router: Router = Router()

export default (app: Application) => {
  app.use('/search', router);

  router.post('/question', async (req: Request, res: Response) => {
    try {
      const {searchTerm} = req.body
      const questions = await searchService.searchQuestion(searchTerm)
      res.json(questions)
    } catch (e) {
      res.json(e)
    }
  })

  router.post('/tag', async (req: Request, res: Response) => {
    try {
      const {searchTerm} = req.body
      const tags = await searchService.searchTag(searchTerm)
      res.json(tags)
    } catch (e) {
      res.json(e)
    }
  })
}
