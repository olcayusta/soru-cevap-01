import fs from 'fs'
import {nanoid} from 'nanoid'
import {extname, resolve} from 'path'
import sharp from 'sharp'
import db from '../config/db'

class UploadService {
  async save(file: Express.Multer.File) {
    try {
      const {buffer, originalname} = file

      const randomId = nanoid(12)
      await sharp(buffer)
        .resize(128)
        .jpeg({
          quality: 70
        })
        .toFile(resolve('src/uploads' + '/resized', `${randomId}${extname(originalname)}`))
      const publicUrl = `localhost:3000/static/uploads/${randomId}${extname(originalname)}`

      return {
        publicUrl
      }
    } catch (e) {
      throw e
    }
  }

  async saveImage(file: Express.Multer.File) {
    try {
      const {filename: image} = file
      await sharp(file.path)
        .resize(480, 720)
        .jpeg({
          quality: 70
        })
        // .toFile(path.resolve(req.file.destination, 'resimler', image));
        .toFile(resolve('src/uploads', '/public', image))
      fs.unlinkSync(file.path)

      const imgUrl = `<img src="//localhost:3000/static/${image}">`

      try {
        const sql = `WITH result AS (
          INSERT INTO chat_message (text, "roomId", "authorId", type, content) VALUES ($1, $2, $3, $4, $5) RETURNING *
        )
                     SELECT (SELECT id FROM result),
                            (SELECT text FROM result),
                            (SELECT "roomId" FROM result),
                            (SELECT "createdTime" FROM result),
                            (SELECT content FROM result),
                            (SELECT jsonb_build_object('id', id, 'displayName', "displayName", 'avatarUrl', "avatarUrl")
                             FROM "user" u
                             WHERE u.id = $3) AS "user"`
        const {rows} = await db.query(sql, [imgUrl, 1, 4, 2, {}])
        return file
      } catch (e) {
        console.dir(e)
      }

      /*        chatServer.clients.forEach(client => {
                 // client.send()
              });*/


    } catch (e) {
      throw e
    }
  }
}

export default new UploadService()
