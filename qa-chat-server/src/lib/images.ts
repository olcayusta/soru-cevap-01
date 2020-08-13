import Multer from 'multer'

export const uploadAvatar = Multer({
    storage: Multer.memoryStorage(),
  fileFilter(req: Express.Request, file: Express.Multer.File, callback: Multer.FileFilterCallback): void {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new Error('Only image files are allowed!'))
    }
    callback(null, true)
  }
})
