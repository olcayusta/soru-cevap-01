import { Application, Request, Response, Router } from 'express'
import { upload } from '../../helpers/upload'
import { uploadAvatar } from '../../lib/images'
import uploadService from "../../services/uploadService"

const router: Router = Router();

export default (app: Application) => {
  app.use('/upload', router)

  router.post('/', uploadAvatar.single('avatar'), async (req: Request, res: Response) => {
    try {
      const {publicUrl} = await uploadService.save(req.file)
      res.send({
        publicUrl
      })
    } catch (e) {
      throw e
    }
  });

  router.post('/image', upload.single('image'), async (req: Request, res: Response) => {
    try {
      const file = await uploadService.saveImage(req.file)
      res.send(req.file)
    } catch (e) {
      throw e
    }

    /*        chatServer.clients.forEach(client => {
               // client.send()
            });*/
  });

}
