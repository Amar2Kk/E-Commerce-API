import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import { connectToDB } from './database/connectToDB.js';
import { serverRoutes } from './src/modules/index.routes.js';

dotenv.config()
const app = express();
const port = process.env.PORT

connectToDB()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))

serverRoutes(app)


app.listen(port, () => {
  console.log(`Server Connection established ✅\n
  link ==> http://localhost:${port}/\n`)
})