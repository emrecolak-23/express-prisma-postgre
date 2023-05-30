import express, { Request, Response } from 'express'
import prisma from '../../client'
import requireAuth from '../../middlewares/require-auth'
import { NotFoundError } from '../../errors/not-found-error'
const router = express.Router()


router.get('/courses/:courseId', requireAuth, async (req: Request, res: Response) => {
    const { courseId } = req.params

    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        },
        include: {
            tests: true
        }
    })

    if (!course) {
        throw new NotFoundError()
    }

    res.status(200).json(course)

})

export { router as showCourse }