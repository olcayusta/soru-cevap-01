import express, { Application } from 'express'
import cors from 'cors'
import { join } from 'path'
import helmet from 'helmet'
import webpush from 'web-push'
import { Sequelize, Model, DataTypes } from 'sequelize'

const PUBLIC_VAPID = 'BJe-5LyfEsvyxXMy1p7TLw_jFOXZC4uyslO1vHBkfYSVdlS5zBkEOJQrpORvAddG979zl8FJmLkZTOVnWr0II1s'
const PRIVATE_VAPID = 'XHrHY1_OaJxJbasuQ567D7YMHp_1p1NEHTZM3WZqdf4'

// Set Vapid Details
webpush.setVapidDetails('mailto:olcay@iyidev.com', PUBLIC_VAPID, PRIVATE_VAPID)

// Dotenv
import dotenv from 'dotenv'
dotenv.config()

// Routes
import accountRouter from "./api/routes/accountRouter";
import answerRouter from "./api/routes/answerRouter";
import userRouter from "./api/routes/userRouter";
import authRouter from "./api/routes/authRouter";
import questionRouter from "./api/routes/questionRouter";
import tagRouter from "./api/routes/tagRouter";
import chatRouter from "./api/routes/chatRouter";
import notificationRouter from "./api/routes/notificationRouter";
import searchRouter from "./api/routes/searchRouter";
import uploadRouter from "./api/routes/uploadRouter";

// App
const app: Application = express()

// Sequelize
const sequelize = new Sequelize('postgres://postgres:123456@localhost:5432/soundcloud')

class Playlist extends Model {
  public id!: number
  public name!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Playlist.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  tableName: 'playlist',
  timestamps: false
})

app.get('/playlists', async (req: any, res: any) => {
  const playlists = await Playlist.findAll();
  res.json(playlists[0]);
})

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())

// Static
app.use('/static', express.static(join(__dirname, 'public')))
app.use('/static/uploads', express.static(join(__dirname, 'uploads')))

// Routes
questionRouter(app)
answerRouter(app)
tagRouter(app)
userRouter(app)
authRouter(app)
chatRouter(app)
notificationRouter(app)
accountRouter(app)
searchRouter(app)
uploadRouter(app)

export default app
