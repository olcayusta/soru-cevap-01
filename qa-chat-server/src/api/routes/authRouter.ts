import {Application, Request, Response, Router} from 'express'
import authService from "../../services/authService"

const router: Router = Router()

export default (app: Application) => {
  app.use('/auth', router)

  // Eposta dogrulama
  router.post('/email', async (req: Request, res: Response) => {
    try {
      const {email} = req.body
      const user = await authService.emailValidate(email)
      res.json(user)
    } catch (e) {
      res.json(e)
    }
  })

  // Eposta ve sifre dogrulama
  router.post('/password', async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body
      const user = await authService.passwordValidate(email, password)
      const token = await authService.signJWT(user.id)
      res.json({token, user})
    } catch (e) {
      throw e
    }
  })
}
