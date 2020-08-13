import {Application, Request, Response, Router} from 'express'
import {isValid} from '../../middlewares/validate'

import {registerSchema} from '../../schemas/register'
import userService from '../../services/userService'

const router: Router = Router()

export default (app: Application) => {
  app.use('/users', router)

  // GET - Tum kullanicilari getir
  router.get('/', async (req: Request, res: Response) => {
    try {
      console.log('GET ALL USERS.')
      const users = await userService.getAllUsers()
      console.log(users)
      res.json(users)
    } catch (e) {
      res.json(e)
    }
  })

  router.get('/:userId', async (req: Request, res: Response) => {
    try {
      const {userId} = req.params
      const user = await userService.getUser(+userId)
      res.json(user)
    } catch (e) {
      res.json(e)
    }
  })

  // GET - Kullanicinin sorularini getir
  router.get('/:userId/questions', async (req: Request, res: Response) => {
    try {
      const {userId} = req.params
      const questions = await userService.getUserQuestions(+userId)
      res.json(questions)
    } catch (e) {
      res.json(e)
    }
  })

  // GET - Kullanicinin cevaplarini getir
  router.get('/:userId/answers', async (req: Request, res: Response) => {
    try {
      const {userId} = req.params
      const answers = await userService.getUserAnswers(+userId)
      res.json(answers)
    } catch (e) {
      res.json(e)
    }
  })

  // POST - Yeni bir kullanici olustur
  // isValid(registerSchema),
  router.post('/', async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body
      const user = await userService.saveUser(email, password)
      res.send(user)
    } catch (e) {
      res.json(e)
    }
  })
}
