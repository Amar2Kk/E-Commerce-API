import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import { connectToDB } from './database/connectToDB.js';
import { serverRoutes } from './src/modules/index.routes.js';

dotenv.config()
const app = express();

connectToDB()

app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(express.static('uploads'))
app.use(morgan('dev'))

serverRoutes(app)

module.exports = app
