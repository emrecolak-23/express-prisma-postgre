// Import Dependencies
import express from 'express'
import cors from 'cors'
import 'express-async-errors'

// Import Routes
import { listUsers, showUser, updateUser, createUser, deleteUser } from './routes/users'
import { login, authenticate, checkAuth } from './routes/auth'
import { createCourse, listCourses, showCourse, updateCourse, deleteCourse } from './routes/courses'

// Import Errors
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

// Import Middleware
import currentUser from './middlewares/current-user'

// Initialize express 
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(currentUser)

// Users Routes
app.use(listUsers)
app.use(showUser)
app.use(updateUser)
app.use(createUser)
app.use(deleteUser)

// Auth Routes
app.use(login)
app.use(authenticate)
app.use(checkAuth)

// Course Routes
app.use(createCourse)
app.use(listCourses)
app.use(showCourse)
app.use(updateCourse)
app.use(deleteCourse)


app.all('*', (req, res, next) => {
    next(new NotFoundError())
})

app.use(errorHandler)

export { app }