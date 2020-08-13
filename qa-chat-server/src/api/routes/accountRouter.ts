import {Application, Request, Response, Router} from 'express'

import {uploadAvatar} from '../../lib/images'
import isAuth from '../../middlewares/isAuth'
import accountService from '../../services/accountService'

const router: Router = Router()

export default (app: Application) => {
  app.use('/account', router)

  /**
   * Hesap Listele
   */
  router.get('/', isAuth, async (req: Request, res: Response) => {
    try {
      const authorId = req.userId
      const user = await accountService.index(authorId)
      res.json(user)
    } catch (e) {
      throw (e)
    }
  })

  /**
   * Kullanicinin favori sorularini listele
   */
  router.get('/favorites', isAuth, async (req: Request, res: Response) => {
    try {
      const authorId = req.userId
      const questions = await accountService.getFavoriteQuestions(+authorId)
      res.send(questions)
    } catch (e) {
      throw e
    }
  })

  /**
   * Kullanicinin profil fotografini guncelle
   */
  router.put('/photo', isAuth, uploadAvatar.single('avatar'), async (req: Request, res: Response) => {
    try {
      const userId = req.userId
      const {rows} = await accountService.updateProfilePhoto(req.file, userId)
      res.send(rows[0])
    } catch (e) {
      throw e
    }
  })

  /**
   * Kullanicinin hakkimda bilgisini guncelle
   */
  router.put('/about', isAuth, async (req: Request, res: Response) => {
    try {
      const {about} = req.body
      const userId = req.userId
      const {rows} = await accountService.updateAbout(about, userId)
      res.send(rows[0])
    } catch (e) {
      throw e
    }
  })
}
