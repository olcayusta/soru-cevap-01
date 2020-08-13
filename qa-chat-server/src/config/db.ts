import { Pool } from 'pg'

const db = new Pool({
  user: 'postgres',
  password: '123456',
  database: 'soru_cevap'
})

/*const db = new Pool({
    host: '35.198.99.217',
    user: 'postgres',
    password: 'CnADGmP7w82yHePa',
    database: 'cms'
});*/

export default db
