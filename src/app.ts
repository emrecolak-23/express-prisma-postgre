// Import Dependencies
import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import { listUsers, showUser, updateUser } from './routes/users'


// Initialize express 
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())


// Routes
app.use(listUsers)
app.use(showUser)
app.use(updateUser)


export { app }