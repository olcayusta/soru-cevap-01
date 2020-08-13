import {Application, Request, Response, Router} from 'express'
import roomService from '../../services/roomService';

const router: Router = Router()

export default (app: Application) => {
  app.use('/chat', router)

  // get all chat rooms
  router.get('/rooms', async (req: Request, res: Response) => {
    try {
      const rooms = await roomService.getAllRooms()
      res.json(rooms)
    } catch (e) {
      res.json(e)
    }
  })

  router.get('/rooms/:roomId', async (req: Request, res: Response) => {
    try {
      const {roomId} = req.params
      const {rows, rowCount} = await roomService.getRoomById(+roomId)
      if (rowCount > 0) {
        res.json(rows[0])
      } else {
        res.status(404).send({
          err: 'message error!'
        })
      }
    } catch (e) {
      res.json(e)
    }
  })
}
