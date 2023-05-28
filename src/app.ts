// Import Dependencies
import express from 'express'
import cors from 'cors'
import 'express-async-errors'


// Import Routes
import { listUsers, showUser, updateUser, createUser, deleteUser } from './routes/users'

// Import Errors
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'


// Initialize express 
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())


// Routes
app.use(listUsers)
app.use(showUser)
app.use(updateUser)
app.use(createUser)
app.use(deleteUser)


app.all('*', (req, res, next) => {
    next(new NotFoundError())
})

app.use(errorHandler)

export { app }