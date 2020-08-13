import multer from 'multer'
import path from 'path'
import {nanoid} from 'nanoid'

// Configure upload path
const UPLOAD_PATH = path.resolve(__dirname, '..', process.env.AVATAR_STORAGE!)

// Create a multer storage engine
const storage = multer.diskStorage({
    destination: UPLOAD_PATH,
    filename(req: Express.Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void): void {
        const photoId = nanoid(12)
        const fileName = photoId + path.extname(file.originalname)
        cb(null, fileName)
    }
})

const imageFilter = function (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void {
    if (isImage(file.originalname)) {
        cb(null, true)
    }
    return cb(new Error('Only image files are allowed!'))
}

const isImage = (originalName: string) => {
    return originalName.match(/\.(jpg|jpeg|png|gif|webp)$/)
}

export const upload = multer({
    storage: storage,
    fileFilter: imageFilter
})
