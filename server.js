import express from 'express';
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import { connectToDB } from './database/connectToDB.js';
import { serverRoutes } from './src/modules/index.routes.js';

dotenv.config()
const app = express();
const port = process.env.PORT

connectToDB()
serverRoutes(app)

app.use(express.json())
app.use(express.static('uploads'))
app.use(morgan('dev'))

app.listen(port, () => {
  console.log(`Server Connection established ✅\n
  link ==> http://localhost:${port}/\n`)
})