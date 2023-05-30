import express, { Request, Response } from 'express'
import prisma from '../../client'
import requireAuth from '../../middlewares/require-auth'
const router = express.Router()


router.get('/courses', requireAuth, async (req: Request, res: Response) => {
    const courses = await prisma.course.findMany({
        include: {
            tests: true
        }
    })

    res.status(200).json(courses)
})


export { router as listCourses }