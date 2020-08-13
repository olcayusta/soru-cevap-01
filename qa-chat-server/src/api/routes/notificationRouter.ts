import {Application, Request, Response, Router} from 'express'
import isAuth from '../../middlewares/isAuth'
import NotificationService from '../../services/notificationService'

const router: Router = Router()

export default (app: Application) => {
  app.use('/notifications', router)

  router.get('/', isAuth, async (req: Request, res: Response) => {
    try {
      const authorId = req.userId
      const notifications = await NotificationService.index(authorId)
      res.json(notifications)
    } catch (e) {
      res.json(e)
    }
  });

  router.get('/unseen', isAuth, async (req: Request, res: Response) => {
    try {
      const authorId = req.userId
      const unseenCount = await NotificationService.unseen(authorId)
      res.json(unseenCount)
    } catch (e) {
      res.json(e)
    }
  })
}
