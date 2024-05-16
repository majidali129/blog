import express from 'express'
import morgan from 'morgan'

export const app = express();
import postRouter from './routes/post.routes.js'


app.use(express.json({limit: '60kb'}))
app.use(morgan('dev'))


app.use('/api/v1/posts', postRouter)
