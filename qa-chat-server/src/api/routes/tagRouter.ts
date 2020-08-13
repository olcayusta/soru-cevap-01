import { Application, Request, Response, Router } from 'express'
import tagService from "../../services/tagService";

const router: Router = Router();

export default (app: Application) => {
  app.use('/tags', router);

  router.get('/', async (req: Request, res: Response) => {
    try {
      const tags = await tagService.index();
      res.json(tags)
    } catch (e) {
      throw e
    }
  });

  router.post('/', async (req: Request, res: Response) => {
    try {
      const tag = await tagService.save();
      res.json(tag)
    } catch (e) {
      throw e
    }
  })
}
