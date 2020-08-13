import dotenv from 'dotenv'

dotenv.config()

export default {
  /**
   * Environment
   */
  NODE_ENV: 'DEVELOPMENT',

  /**
   * PORT
   */
  PORT: 9001,

  /**
   * JWT SECRET KEY
   */
  JWT_SECRET: 'algida',

  AVATAR_FIELD: 'avatar',

  AVATAR_BASE_URL: '/uploads/avatar',

  AVATAR_STORAGE: 'uploads/avatar'
}
